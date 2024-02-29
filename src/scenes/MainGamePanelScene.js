
// You can write more code here

/* START OF COMPILED CODE */

class MainGamePanelScene extends Phaser.Scene {

	constructor() {
		super("MainGamePanelScene");

		/* START-USER-CTR-CODE */
		// Write your code here.


		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// container_background
		const container_background = this.add.container(0, 0);

		// gameContainer
		const gameContainer = this.add.container(0, 0);
		container_background.add(gameContainer);

		// fruit_ninja
		const fruit_ninja = this.add.image(540, 960, "fruit-ninja");
		fruit_ninja.scaleX = 4;
		fruit_ninja.scaleY = 12;
		gameContainer.add(fruit_ninja);

		// popContainer
		const popContainer = this.add.container(0, 0);
		popContainer.visible = false;
		container_background.add(popContainer);

		// popup
		const popup = this.add.image(540, 960, "popup");
		popup.scaleX = 3.3;
		popup.scaleY = 5;
		popContainer.add(popup);

		// nextButton
		const nextButton = this.add.image(560, 1337, "nextButton");
		nextButton.scaleX = 2;
		nextButton.scaleY = 2;
		popContainer.add(nextButton);

		// message
		const message = this.add.text(165, 628, "", {});
		message.text = "You Complete level\n";
		message.setStyle({ "fontFamily": "Filament Black", "fontSize": "100px", "fontStyle": "bold" });
		popContainer.add(message);

		// score
		const score = this.add.text(310, 230, "", {});
		score.text = "Score :0";
		score.setStyle({ "fontSize": "100px" });
		container_background.add(score);

		// level
		const level = this.add.text(453, 153, "", {});
		level.text = "Level 1";
		level.setStyle({ "fontSize": "56px" });
		container_background.add(level);

		// gameOvercontainer
		const gameOvercontainer = this.add.container(0, 0);
		gameOvercontainer.visible = false;

		// gameOverPopUp
		const gameOverPopUp = this.add.image(549, 961, "popup");
		gameOverPopUp.scaleX = 3.8;
		gameOverPopUp.scaleY = 5;
		gameOvercontainer.add(gameOverPopUp);

		// playAgain
		const playAgain = this.add.image(560, 1249, "playAgain");
		playAgain.scaleX = 2;
		playAgain.scaleY = 2;
		gameOvercontainer.add(playAgain);

		// gameOver
		const gameOver = this.add.image(534, 556, "gameOver");
		gameOver.scaleX = 1.6;
		gameOver.scaleY = 1.6;
		gameOvercontainer.add(gameOver);

		// container_game
		const container_game = this.add.container(0, 0);

		this.container_background = container_background;
		this.gameContainer = gameContainer;
		this.popContainer = popContainer;
		this.popup = popup;
		this.nextButton = nextButton;
		this.message = message;
		this.score = score;
		this.gameOvercontainer = gameOvercontainer;
		this.gameOverPopUp = gameOverPopUp;
		this.playAgain = playAgain;
		this.container_game = container_game;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	container_background;
	/** @type {Phaser.GameObjects.Container} */
	gameContainer;
	/** @type {Phaser.GameObjects.Container} */
	popContainer;
	/** @type {Phaser.GameObjects.Image} */
	popup;
	/** @type {Phaser.GameObjects.Image} */
	nextButton;
	/** @type {Phaser.GameObjects.Text} */
	message;
	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.GameObjects.Container} */
	gameOvercontainer;
	/** @type {Phaser.GameObjects.Image} */
	gameOverPopUp;
	/** @type {Phaser.GameObjects.Image} */
	playAgain;
	/** @type {Phaser.GameObjects.Container} */
	container_game;

	/* START-USER-CODE */

	// Write your code here
	create() {
		console.log("Main Scene ")
		this.editorCreate();
		this.oSoundManager = new SoundManager(this);
		this.paddle = this.physics.add.image(540, 1460, "paddle").setSize(228, 64).setCollideWorldBounds(true);
		this.paddle.setImmovable(true)
		this.physics.add.existing(this.paddle);
		// ball
		this.ball = this.physics.add.image(540, 1370, "ball").setCircle(93, 40, 20).setCollideWorldBounds(true);
		this.ball.scaleX = 0.3;
		this.ball.scaleY = 0.3;
		this.ball.setVelocity(-100, 200);
		this.ball.setBounce(1, 1)
		this.input.keyboard.on("keydown", (obj) => {
			if (obj.code == "ArrowLeft") {
				this.paddle.x -= 100;
			}
			else if (obj.code == "ArrowRight") {
				this.paddle.x += 100;
			}
		});
		this.input.on("pointermove", (obj) => {
			this.paddle.x = obj.x;
		})

		this.playAgain.setInteractive().on("pointerdown",()=>{
			this.scene.start("MainGamePanelScene",true);
		})
		this.currentLevel = 1;
		this.userScore = 0;
		this.level1();

		this.smoke = this.add.particles("smoke");
		this.emitter = this.smoke.createEmitter({
			speed: 1,
			scale: { start: 0, end: 1 },
			blendMode: 2,
			lifespan: 20
		});

		this.emitter.startFollow(this.ball, 0, 10);
		this.emitter.setScale(0, 15);

		this.emitter.flow(1, 5);
		this.anim = this.tweens.add({
			targets: this.emitter,
			loop: -1
		});
		this.nextButton.setInteractive().on("pointerdown", () => {
			this.scene.start("Level2Scene");
		})
		this.physics.add.collider(this.paddle, this.ball, () => {
			// this.paddleHitSound.play()
			this.oSoundManager.play(this.oSoundManager.paddleHitSound)
			this.setSpeedOfBall();
		}
		);
	}

	setSpeedOfBall() {
		this.ball.setVelocityX(Phaser.Math.Between(500, 1200))
		this.ball.setVelocityY(Phaser.Math.Between(-500, -900))
	}

	update() {
		if (this.ball.y > this.paddle.y + 100) {
			this.ball.destroy(true)
			this.boxs1.destroy(true)
			this.boxs2.destroy(true)
			this.boxs3.destroy(true)
			this.boxs4.destroy(true)
			this.paddle.destroy(true)

			this.gameOvercontainer.setVisible(true);
		}
	}

	ballHit(brick, ball) {
		this.oSoundManager.play(this.oSoundManager.brickHitSound)
		this.brick = ball;
		// this.ball = ball;
		this.brick.destroy(true)
		this.userScore += 10
		this.localStorage.setItem("totalScore",this.userScore)
		console.log(this.localStorage.getItem("totalScore"))
		this.score.setText("Score :" + this.userScore);
		if (this.userScore == 400) {
			this.oSoundManager.play(this.oSoundManager.winSound);
			this.currentLevel++;
			this.ball.setVisible(false)
			this.popContainer.setVisible(true)
		}
	}

	level1() {
		this.setBlockForLevel1();
		for(let i=0;i<4;i++){
		const box="boxs"+(i+1)
		console.log(box,this[box])
		this.physics.add.collider(this[box], this.ball, this.ballHit, null, this);
		}

		// this.physics.add.collider(this.boxs2, this.ball, this.ballHit, null, this);
		// this.physics.add.collider(this.boxs3, this.ball, this.ballHit, null, this);
		// this.physics.add.collider(this.boxs4, this.ball, this.ballHit, null, this);

	}


	setBlockForLevel1() {

		this.boxs1 = this.physics.add({
			key: "brick1",
			repeat: 9,
			setXY: {
				x: 100,
				y: 600,
				stepX: 100,
			},
			immovable: true
		})

		this.container_game.add.existing(this.boxs1)

		this.boxs2 = this.physics.add.group({
			key: "brick2",
			repeat: 9,
			setXY: {
				x: 100,
				y: 700,
				stepX: 100,
			},
			immovable: true
		})



		this.boxs3 = this.physics.add.group({
			key: "brick3",
			repeat: 9,
			setXY: {
				x: 100,
				y: 800,
				stepX: 100,
			},
			immovable: true
		})



		this.boxs4 = this.physics.add.group({
			key: "brick1",
			repeat: 9,
			setXY: {
				x: 100,
				y: 900,
				stepX: 100,
			},
			immovable: true
		})

	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
