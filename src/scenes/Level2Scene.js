
// You can write more code here

/* START OF COMPILED CODE */

class Level2Scene extends Phaser.Scene {

	constructor() {
		super("Level2Scene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gameContainer
		const gameContainer = this.add.container(0, 0);

		// fruit_ninja
		const fruit_ninja = this.add.image(540, 960, "fruit-ninja");
		fruit_ninja.scaleX = 4;
		fruit_ninja.scaleY = 12;
		gameContainer.add(fruit_ninja);

		// score_
		const score_ = this.add.text(358, 230, "", {});
		score_.text = "Score :0";
		score_.setStyle({ "fontSize": "100px" });
		gameContainer.add(score_);

		// container_gameOver
		const container_gameOver = this.add.container(0, 0);
		container_gameOver.visible = false;
		gameContainer.add(container_gameOver);

		// popup
		const popup = this.add.image(540, 960, "popup");
		popup.scaleX = 3.25;
		popup.scaleY = 4.5;
		container_gameOver.add(popup);

		// gameOver
		const gameOver = this.add.image(540, 960, "gameOver");
		gameOver.scaleX = 2;
		gameOver.scaleY = 2;
		container_gameOver.add(gameOver);

		// score
		const score = this.add.text(307, 1408, "", {});
		score.text = "Highscore is ";
		score.setStyle({ "fontFamily": "Impact", "fontSize": "60px", "fontStyle": "bold" });
		container_gameOver.add(score);

		// playAgain
		const playAgain = this.add.image(552, 1708, "playAgain");
		playAgain.scaleX = 1.5;
		playAgain.scaleY = 1.5;
		container_gameOver.add(playAgain);

		// text_1
		const text_1 = this.add.text(469, 144, "", {});
		text_1.text = "Level";
		text_1.setStyle({ "fontSize": "50px" });
		gameContainer.add(text_1);

		this.gameContainer = gameContainer;
		this.score_ = score_;
		this.container_gameOver = container_gameOver;
		this.score = score;
		this.playAgain = playAgain;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	gameContainer;
	/** @type {Phaser.GameObjects.Text} */
	score_;
	/** @type {Phaser.GameObjects.Container} */
	container_gameOver;
	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.GameObjects.Image} */
	playAgain;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.localstorage = window.localStorage;
		console.log(this.localstorage.getItem("totalScore"))
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
		});

		this.playAgain.setInteractive().on("pointerdown", () => {
			this.scene.start("Level")
		})

		this.userScore = 0;
		this.boxs1 = this.physics.add.group({
			key: "brick1",
			repeat: 9,
			setXY: {
				x: 100,
				y: 600,
				stepX: 100,
				stepY: 50
			},
			immovable: true
		});

		this.boxs2 = this.physics.add.group({
			key: "brick2",
			repeat: 9,
			setXY: {
				x: 100,
				y: 800,

				stepX: 100
			},
			immovable: true
		})

		this.boxs3 = this.physics.add.group({
			key: "brick3",
			repeat: 5,
			setXY: {
				x: 500,
				y: 600,

				stepY: 100
			},
			immovable: true
		})

		this.boxs4 = this.physics.add.group({
			key: "brick1",
			repeat: 8,
			setXY: {
				x: 100,
				y: 1000,
				stepX: 100,
				stepY: -50
			},
			immovable: true
		})

		this.physics.add.collider(this.paddle, this.ball, () => { this.setSpeedOfBall() });
		for (let i = 0; i < 4; i++) {
			const box = "boxs" + (i + 1);
			this.physics.add.collider(this[box], this.ball, this.ballHit, null, this);
		}

	}

	setSpeedOfBall() {
		this.ball.setVelocityX(Phaser.Math.Between(500, 1200))
		this.ball.setVelocityY(Phaser.Math.Between(-500, -900))
	}


	ballHit(brick, ball) {
		this.brick = ball;
		// this.ball = ball;
		this.brick.destroy(true)
		this.userScore += 10
		this.localstorage.setItem("totalScore",this.localstorage.getItem("totalScore")+this.userScore);
		this.score_.setText("Score :" + this.userScore);
		if (this.userScore == 350) {
			this.score.setText("Highscore is " + this.localstorage.getItem("totalScore"));
			this.container_gameOver.setVisible(true);
		}

	}
	update() {
		if (this.ball.y >= this.paddle.y + 100) {
			this.score.setText("Highscore is " + this.localstorage.getItem("totalScore"));
			this.container_gameOver.setVisible(true);
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
