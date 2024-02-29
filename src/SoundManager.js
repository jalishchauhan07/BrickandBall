class SoundManager{
    constructor(scene){
        this.oScene= scene;
        this.brickHitSound = this.oScene.sound.add("sounds_brick_hit");
		this.paddleHitSound = this.oScene.sound.add("sounds_paddle_hit");
		this.winSound = this.oScene.sound.add("sounds_win");
    }

    play(key,loop){
        key.play();
        key.loop=loop;
    }

    stop(key){
        key.stop();
    }
}