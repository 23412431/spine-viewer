(function () {
    'use strict';

    class SgsSkinViewer {
        constructor() {
            this.width = 1800;
            this.height = 1300;
            this.height_offset = 100;
            this.num = 0;
            this.showinfo = 0;
            Laya.init(this.width, this.height, Laya["WebGL"]);
            Laya.stage.alignV = "middle";
            Laya.stage.alignH = "center";
            Laya.stage.scaleMode = "showall";
            Laya.stage.screenMode = "none";
            Laya.stage.bgColor = "#000000";
            this.setup();
        }
        setup() {
            this.path_list_init();
            this.State_Interactive_on();
            this.load_skin();
        }
        onKeyDown(e) {
            var keyCode = e["keyCode"];
            switch (e["keyCode"]) {
                case 39:
                    this.next1();
                    break;
                case 37:
                    this.previous1();
                    break;
            }
        }
        mouseWheel(e) {
            switch (e.delta) {
                case 3:
                    this.previous1();
                    this.num += 1;
                    break;
                case -3:
                    this.next1();
                    this.num += 1;
                    break;
            }
            var txt = new Laya.Text();
            txt.text = String(this.num);
            txt.color = "#ffffff";
            txt.pos(0, 0);
            Laya.stage.addChild(txt);
        }
        load_skin() {
            var path = this.path_list[this.path_list_index];
            var beijing_file = path.concat("beijing.sk");
            var daiji_file = path.concat("daiji.sk");
            var daiji_tx_file = path.concat("daiji_tx.sk");
            Laya.stage.destroyChildren();
            this.createInteractiveRect();
            this.beijing = new Laya.Skeleton();
            Laya.stage.addChild(this.beijing);
            this.beijing.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.beijing.load(beijing_file);
            this.daiji = new Laya.Skeleton();
            Laya.stage.addChild(this.daiji);
            this.daiji.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.daiji.load(daiji_file);
            if (this.showinfo == 1) {
                this.State_Info();
            }
        }
        State_Info() {
            var txt = new Laya.Text();
            txt.text = String(Laya.Browser.clientWidth);
            txt.color = "#ffffff";
            txt.pos(0, 0);
            Laya.stage.addChild(txt);
            var txt = new Laya.Text();
            txt.text = String(Laya.Browser.clientHeight);
            txt.color = "#ffffff";
            txt.pos(40, 0);
            Laya.stage.addChild(txt);
            var txt = new Laya.Text();
            txt.text = String(this.path_list_index);
            txt.color = "#ffffff";
            txt.pos(80, 0);
            Laya.stage.addChild(txt);
        }
        State_Interactive_on() {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        }
        State_Interactive_off() {
            Laya.stage.off(Laya.Event.KEY_DOWN, this, this.onKeyDown);
            Laya.stage.off(Laya.Event.MOUSE_WHEEL, this, this.mouseWheel);
        }
        createInteractiveRect() {
            var previous_rect1 = new Laya.Sprite();
            previous_rect1.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            previous_rect1.size(this.width / 3, this.height / 3);
            previous_rect1.x = 0;
            previous_rect1.y = 0;
            Laya.stage.addChild(previous_rect1);
            previous_rect1.on(Laya.Event.MOUSE_DOWN, this, this.previous1);
            var next_rect1 = new Laya.Sprite();
            next_rect1.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            next_rect1.size(this.width / 3, this.height / 3);
            next_rect1.x = this.width * 2 / 3;
            next_rect1.y = 0;
            Laya.stage.addChild(next_rect1);
            next_rect1.on(Laya.Event.MOUSE_DOWN, this, this.next1);
            var previous_rect2 = new Laya.Sprite();
            previous_rect2.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            previous_rect2.size(this.width / 3, this.height / 3);
            previous_rect2.x = 0;
            previous_rect2.y = this.height * 2 / 3;
            Laya.stage.addChild(previous_rect2);
            previous_rect2.on(Laya.Event.MOUSE_DOWN, this, this.previous2);
            var next_rect2 = new Laya.Sprite();
            next_rect2.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            next_rect2.size(this.width / 3, this.height / 3);
            next_rect2.x = this.width * 2 / 3;
            next_rect2.y = this.height * 2 / 3;
            Laya.stage.addChild(next_rect2);
            next_rect2.on(Laya.Event.MOUSE_DOWN, this, this.next2);
            var pause_rect = new Laya.Sprite();
            pause_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            pause_rect.size(this.width / 3, this.height / 3);
            pause_rect.x = this.width * 2 / 3;
            pause_rect.y = this.height * 1 / 3;
            Laya.stage.addChild(pause_rect);
            pause_rect.on(Laya.Event.MOUSE_DOWN, this, this.pause);
            var play_rect = new Laya.Sprite();
            play_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            play_rect.size(this.width / 3, this.height / 3);
            play_rect.x = 0;
            play_rect.y = this.height * 1 / 3;
            Laya.stage.addChild(play_rect);
            play_rect.on(Laya.Event.MOUSE_DOWN, this, this.play);
            var changeskin_rect = new Laya.Sprite();
            changeskin_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            changeskin_rect.size(this.width / 3, this.height / 3);
            changeskin_rect.x = this.width * 1 / 3;
            changeskin_rect.y = this.height * 1 / 3;
            Laya.stage.addChild(changeskin_rect);
            changeskin_rect.on(Laya.Event.MOUSE_DOWN, this, this.changeskin);
        }
        next1() {
            if (this.path_list_index == this.path_list.length - 1) {
                this.path_list_index = 0;
            }
            else {
                this.path_list_index += 1;
            }
            this.showinfo = 0;
            this.load_skin();
        }
        previous1() {
            if (this.path_list_index == 0) {
                this.path_list_index = this.path_list.length - 1;
            }
            else {
                this.path_list_index -= 1;
            }
            this.showinfo = 0;
            this.load_skin();
        }
        next2() {
            if (this.path_list_index == this.path_list.length - 1) {
                this.path_list_index = 0;
            }
            else {
                this.path_list_index += 1;
            }
            this.showinfo = 1;
            this.load_skin();
        }
        previous2() {
            if (this.path_list_index == 0) {
                this.path_list_index = this.path_list.length - 1;
            }
            else {
                this.path_list_index -= 1;
            }
            this.showinfo = 1;
            this.load_skin();
        }
        play() {
            this.beijing.play(0, false);
            this.daiji.play(0, false);
        }
        pause() {
            this.beijing.paused();
            this.daiji.paused();
        }
        changeskin() {
            this.beijing.play(1, true);
            this.daiji.play(1, true);
        }
        path_list_init() {
            this.path_list_index = 0;
            this.path_list = ["./res/",
            ];
        }
    }
    new SgsSkinViewer();

}());
