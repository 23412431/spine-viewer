(function () {
    'use strict';

    class SgsSkinViewerSkel {
        constructor() {
            this.width = 1800;
            this.height = 1000;
            this.height_offset = 50;
            this.showinfo = 0;
            this.chuchang2_loaded = false;
            this.chuchang2_animationCount = 0;
            this.index = 0;
            this.loadCount = 0;
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
        load_skin() {
            this.chuchang2_loaded = false;
            this.chuchang2_animationCount = 0;
            this.loadCount = 0;
            if (this.chuchang2_skeleton) {
                this.chuchang2_skeleton.destroy();
                this.chuchang2_skeleton = null;
            }
            if (this.chuchang2_templet) {
                this.chuchang2_templet.destroy();
                this.chuchang2_templet = null;
            }
            if (this.beijing_skeleton) {
                this.beijing_skeleton.destroy();
                this.beijing_skeleton = null;
            }
            if (this.beijing_templet) {
                this.beijing_templet.destroy();
                this.beijing_templet = null;
            }
            if (this.daiji_skeleton) {
                this.daiji_skeleton.destroy();
                this.daiji_skeleton = null;
            }
            if (this.daiji_templet) {
                this.daiji_templet.destroy();
                this.daiji_templet = null;
            }
            this.path = this.path_list[this.path_list_index];
            Laya.stage.destroyChildren();
            this.createInteractiveRect();
            this.load_beijing();
            this.load_daiji();
            this.load_chuchang2();
            if (this.showinfo == 1) {
                this.State_Info();
            }
        }
        load_chuchang2() {
            var chuchang2_file = this.path.concat("chuchang2.skel");
            Laya.loader.load(chuchang2_file, Laya.Handler.create(this, function (success) {
                if (!success) {
                    this.chuchang2_loaded = false;
                    this.chuchang2_animationCount = 0;
                    return;
                }
                this.chuchang2_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
                this.chuchang2_templet.on(Laya.Event.ERROR, this, function () {
                    this.chuchang2_loaded = false;
                    this.chuchang2_animationCount = 0;
                });
                this.chuchang2_templet.on(Laya.Event.COMPLETE, this, this.onChuchang2Loaded);
                this.chuchang2_templet.loadAni(chuchang2_file);
            }), null, Laya.Loader.BUFFER);
        }
        onChuchang2Error() {
            this.chuchang2_loaded = false;
            this.chuchang2_animationCount = 0;
        }
        onChuchang2Loaded() {
            this.chuchang2_loaded = true;
            this.chuchang2_skeleton = this.chuchang2_templet.buildArmature();
            this.chuchang2_skeleton.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.chuchang2_skeleton.scale(1, 1);
            this.chuchang2_skeleton.visible = false;
            Laya.stage.addChild(this.chuchang2_skeleton);
            this.chuchang2_animationCount = this.chuchang2_skeleton.getAnimNum();
            this.chuchang2_skeleton.visible = false;
        }
        load_beijing() {
            var beijing_file = this.path.concat("beijing.skel");
            this.beijing_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
            this.beijing_templet.on(Laya.Event.COMPLETE, this, this.onBeijingLoaded);
            this.beijing_templet.loadAni(beijing_file);
        }
        load_daiji() {
            var daiji_file = this.path.concat("daiji.skel");
            this.daiji_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
            this.daiji_templet.on(Laya.Event.COMPLETE, this, this.onDaijiLoaded);
            this.daiji_templet.loadAni(daiji_file);
        }
        onBeijingLoaded() {
            this.beijing_skeleton = this.beijing_templet.buildArmature();
            Laya.stage.addChild(this.beijing_skeleton);
            this.beijing_skeleton.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.beijing_skeleton.scale(1, 1);
            this.beijing_skeleton.play(this.index, true, true);
        }
        onDaijiLoaded() {
            this.daiji_skeleton = this.daiji_templet.buildArmature();
            Laya.stage.addChild(this.daiji_skeleton);
            this.daiji_skeleton.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.daiji_skeleton.scale(1, 1);
            this.daiji_skeleton.play(this.index, true, true);
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
            var chuchang2_rect = new Laya.Sprite();
            chuchang2_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#0000000");
            chuchang2_rect.size(this.width, this.height);
            chuchang2_rect.x = 0;
            chuchang2_rect.y = 0;
            Laya.stage.addChild(chuchang2_rect);
            chuchang2_rect.on(Laya.Event.MOUSE_DOWN, this, this.playChuchang2);
        }
        playChuchang2() {
            if (this.chuchang2_loaded && this.chuchang2_skeleton && this.chuchang2_animationCount >= 2) {
                if (this.beijing_skeleton)
                    this.beijing_skeleton.visible = false;
                if (this.daiji_skeleton)
                    this.daiji_skeleton.visible = false;
                const randomAnimationIndex = Math.floor(Math.random() * 2);
                this.chuchang2_skeleton.visible = true;
                this.chuchang2_skeleton.play(randomAnimationIndex, false);
                this.chuchang2_skeleton.once(Laya.Event.STOPPED, this, this.onChuchang2Complete);
            }
        }
        onChuchang2Complete() {
            if (this.chuchang2_skeleton) {
                this.chuchang2_skeleton.visible = false;
            }
            if (this.beijing_skeleton)
                this.beijing_skeleton.visible = true;
            if (this.daiji_skeleton)
                this.daiji_skeleton.visible = true;
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
            if (this.beijing_skeleton)
                this.beijing_skeleton.play(this.index, true, true);
            if (this.daiji_skeleton)
                this.daiji_skeleton.play(this.index, true, true);
        }
        pause() {
            if (this.beijing_skeleton)
                this.beijing_skeleton.paused();
            if (this.daiji_skeleton)
                this.daiji_skeleton.paused();
        }
        changeskin() {
            if (this.beijing_skeleton && ++this.index >= this.beijing_skeleton.getAnimNum()) {
                this.index = 0;
            }
            this.play();
        }
        path_list_init() {
            this.path_list_index = 0;
            this.path_list = ["D:/下载/新建文件夹/",
            ];
        }
    }
    new SgsSkinViewerSkel();

}());
