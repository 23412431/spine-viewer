(function () {
    'use strict';

    class SgsSkinViewerSkel {
        constructor() {
            this.width = 1800;
            this.height = 1000;
            this.height_offset = 50;
            this.showinfo = 0;
            this.chuchang2_loaded = false;
            this.index = 0;
            this.soundList = [];
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
            this.initSoundList();
        }
        initSoundList() {
            this.soundList = [
                "HeTaiHou_QiLuan_01.mp3",
                "HeTaiHou_QiLuan_02.mp3",
                "HeTaiHou_ZhenDu_01.mp3",
                "HeTaiHou_ZhenDu_02.mp3",
            ];
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
            this.path = this.path_list[this.path_list_index];
            Laya.stage.destroyChildren();
            this.createInteractiveRect();
            this.load_beijing();
            this.load_chuchang2();
            if (this.showinfo == 1) {
                this.State_Info();
            }
        }
        load_chuchang2() {
            var chuchang2_file = this.path.concat("chuchang2.skel");
            this.chuchang2_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
            this.chuchang2_templet.on(Laya.Event.COMPLETE, this, this.onChuchang2Loaded);
            this.chuchang2_templet.loadAni(chuchang2_file);
        }
        onChuchang2Loaded() {
            this.chuchang2_loaded = true;
            this.chuchang2_skeleton = this.chuchang2_templet.buildArmature();
            Laya.stage.addChild(this.chuchang2_skeleton);
            this.chuchang2_skeleton.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.chuchang2_skeleton.scale(1, 1);
            this.chuchang2_skeleton.visible = false;
        }
        load_beijing() {
            var beijing_file = this.path.concat("beijing.skel");
            this.beijing_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
            this.beijing_templet.loadAni(beijing_file);
            this.beijing_templet.on(Laya.Event.COMPLETE, this, this.load_daiji);
        }
        load_daiji() {
            var daiji_file = this.path.concat("daiji.skel");
            this.daiji_templet = new Laya.SpineTemplet(Laya.SpineVersion.v4_0);
            this.daiji_templet.loadAni(daiji_file);
            this.daiji_templet.on(Laya.Event.COMPLETE, this, this.playani);
        }
        playani() {
            this.beijing_skeleton = this.beijing_templet.buildArmature();
            Laya.stage.addChild(this.beijing_skeleton);
            this.beijing_skeleton.pos(this.width / 2, this.height / 2 - this.height_offset);
            this.beijing_skeleton.scale(1, 1);
            this.beijing_skeleton.play(this.index, true, true);
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
            var changeskin_rect = new Laya.Sprite();
            changeskin_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            changeskin_rect.size(this.width / 3, this.height);
            changeskin_rect.x = this.width * 1 / 3;
            changeskin_rect.y = 0;
            Laya.stage.addChild(changeskin_rect);
            changeskin_rect.on(Laya.Event.MOUSE_DOWN, this, this.changeskin);
            var chuchang2_rect = new Laya.Sprite();
            chuchang2_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            chuchang2_rect.size(this.width / 3, this.height);
            chuchang2_rect.x = 0;
            chuchang2_rect.y = 0;
            Laya.stage.addChild(chuchang2_rect);
            chuchang2_rect.on(Laya.Event.MOUSE_DOWN, this, this.playChuchang2);
            var music_rect = new Laya.Sprite();
            music_rect.graphics.drawRect(0, 0, this.width / 3, this.height / 3, "#000000");
            music_rect.size(this.width / 3, this.height);
            music_rect.x = this.width * 2 / 3;
            music_rect.y = 0;
            Laya.stage.addChild(music_rect);
            music_rect.on(Laya.Event.MOUSE_DOWN, this, this.playRandomMusic);
        }
        playRandomMusic() {
            if (this.soundList.length > 0) {
                if (this.currentSoundChannel) {
                    this.currentSoundChannel.stop();
                }
                const randomIndex = Math.floor(Math.random() * this.soundList.length);
                const soundFile = this.path + this.soundList[randomIndex];
                this.currentSoundChannel = Laya.SoundManager.playSound(soundFile, 1);
                console.log("播放音乐:", this.soundList[randomIndex]);
            }
        }
        playChuchang2() {
            if (this.chuchang2_loaded && this.chuchang2_skeleton) {
                if (this.beijing_skeleton)
                    this.beijing_skeleton.visible = false;
                if (this.daiji_skeleton)
                    this.daiji_skeleton.visible = false;
                const animCount = this.chuchang2_skeleton.getAnimNum();
                const randomIndex = Math.floor(Math.random() * animCount);
                this.chuchang2_skeleton.visible = true;
                this.chuchang2_skeleton.play(randomIndex, false);
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
        play() {
            this.beijing_skeleton.play(this.index, true, true);
            this.daiji_skeleton.play(this.index, true, true);
        }
        changeskin() {
            if (++this.index >= this.beijing_skeleton.getAnimNum()) {
                this.index = 0;
            }
            this.play();
        }
        path_list_init() {
            this.path_list_index = 0;
            this.path_list = ["./res/",
            ];
        }
    }
    new SgsSkinViewerSkel();

}());
