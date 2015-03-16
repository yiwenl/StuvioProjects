//ViewStars.js

(function() {
	var GL = bongiovi.GL;

	ViewStars = function() {
		bongiovi.View.call(this, "assets/shaders/star.vert", "assets/shaders/star.frag");	
	}

	var p = ViewStars.prototype = new bongiovi.View();

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [];
		var extra = [];

		for(var i=0; i<SuModel.stars.length; i++) {
			var data = SuModel.stars[i];
			var pos = Sutils.getStarPosition(data.ra, data.de, 500);

			positions.push(pos);
			coords.push([0, 0]);
			indices.push(i);
			extra.push([data.mag, data.isInConstellation?1:.45, data.isJoint?.5:0]);
		}

		this.mesh = new bongiovi.Mesh(positions.length, indices.length, GL.gl.POINTS);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
		this.mesh.bufferData(extra, "aExtra", 3);
	};


	p.render = function(texture) {
		if(!this.shader.isReady()) return;
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("cameraRadius", "uniform1f", params.cameraRadius);
		texture.bind(0);
		GL.draw(this.mesh);
	};
})();