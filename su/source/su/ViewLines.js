//ViewLines.js

(function() {
	var GL = bongiovi.GL;
	var gl;

	ViewLines = function() {
		bongiovi.View.call(this, "assets/shaders/lines.vert", "assets/shaders/lines.frag");
	}

	var p = ViewLines.prototype = new bongiovi.View();


	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [];	
		var index = 0;

		for(var i=0; i<SuModel.constellations.length;i++) {
			var constellation = SuModel.constellations[i];
			var lines = constellation.lines;

			for(var j=0; j<lines.length; j++) {
				var line = lines[j];
				var s1 = Sutils.getStarById(line[0]);
				var s2 = Sutils.getStarById(line[1]);

				var pos1 = Sutils.getStarPosition(s1.ra, s1.de, 500);
				var pos2 = Sutils.getStarPosition(s2.ra, s2.de, 500);

				positions.push(pos1);
				positions.push(pos2);

				coords.push([i, 0]);
				coords.push([i, 0]);

				indices.push(index);
				indices.push(index+1);

				index += 2;
			}
		}

		this.mesh = new bongiovi.Mesh(positions.length, indices.length, GL.gl.LINES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};


	p.render = function() {
		if(!this.shader.isReady()) return;
		this.shader.bind();
		this.shader.uniform("currentIndex", "uniform1f", params.constellationIndex);
		this.shader.uniform("cameraRadius", "uniform1f", params.cameraRadius);
		GL.draw(this.mesh);
	};

})();