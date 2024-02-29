
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1080,
		height:1920,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		physics:{
			default:"arcade",
			"arcade":{
				gravity:false,
				debug:false,
			}
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Level2Scene",Level2Scene)
	game.scene.add("MainGamePanelScene",MainGamePanelScene);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}