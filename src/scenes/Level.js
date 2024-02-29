
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		console.log("Level")
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// backgroundContainer
		const backgroundContainer = this.add.container(0, 0);

		// backgroundImage
		const backgroundImage = this.add.image(540, 960, "backgroundImage");
		backgroundImage.scaleX = 0.8;
		backgroundImage.scaleY = 2.5;
		backgroundContainer.add(backgroundImage);

		// playButton2
		const playButton2 = this.add.image(520, 1519, "playButton2");
		playButton2.scaleX = 4;
		playButton2.scaleY = 4;
		backgroundContainer.add(playButton2);

		// gameName2
		const gameName2 = this.add.text(395, 905, "", {});
		gameName2.tintFill = true;
		gameName2.tintTopRight = 7482155;
		gameName2.tintBottomLeft = 14722469;
		gameName2.tintBottomRight = 12875125;
		gameName2.text = "Bricks\n";
		gameName2.setStyle({ "color": "#f6bc30ff", "fontSize": "106px", "stroke": "#b651e7ff", "strokeThickness":5});
		backgroundContainer.add(gameName2);

		// gameName1
		const gameName1 = this.add.text(245, 721, "", {});
		gameName1.tintTopLeft = 6623505;
		gameName1.tintTopRight = 4676837;
		gameName1.text = "Break the";
		gameName1.setStyle({ "color": "#f7ab4eff", "fontSize": "106px", "stroke": "#4cc0efff", "strokeThickness":5});
		backgroundContainer.add(gameName1);

		this.backgroundContainer = backgroundContainer;
		this.playButton2 = playButton2;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	backgroundContainer;
	/** @type {Phaser.GameObjects.Image} */
	playButton2;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.playButton2.setInteractive().on("pointerdown",()=>{
			this.scene.start("MainGamePanelScene")
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
