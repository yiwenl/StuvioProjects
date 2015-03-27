// App.js

(function() {
	var GL = bongiovi.GL;

	SuApp = function(mCanvas) {
		this._canvas = mCanvas;
		GL.init(this._canvas, null, null, {preserveDrawingBuffer:true});
		this._init();
	}

	var p = SuApp.prototype;

	p._init = function() {
		bongiovi.SimpleImageLoader.load([
			"assets/images/bg.jpg",
			"assets/images/bgInvert.jpg",
			"assets/images/ConstellationCircleInvert.png",
			"assets/images/ConstellationCircleInvertAdd.png",
			"assets/images/ConstellationCircle.png",
			"assets/images/milkyWayCopy.png",
			"assets/images/starLine.png"
			], this, this._init3D);
	};

	p._init3D = function(imgs) {
		SuModel.images = imgs;
		SuModel.currentState = {};
		this._scene = new SceneSu();
		GL.setSize(this._canvas.width, this._canvas.height);

		bongiovi.Scheduler.addEF(this, this._loop);
	};


	p.refresh = function(mSettings) {
		if(this._scene) {
			// this._scene.setConstellationIndex(mSettings.constellationIndex.value-1 );
			this._scene.refresh(mSettings);
		}
	};


	p.isDone = function() {
		return this._scene == undefined ? false : this._scene.isDone();
	};


	p._loop = function() {
		this._scene.loop();
	};


	p.resize = function() {
		GL.setSize(this._canvas.width, this._canvas.height);
	};
})();