//ViewGlobeLines.js

(function() {
	var GL = bongiovi.GL;

	ViewGlobeLines = function() {
		bongiovi.View.call(this, "assets/shaders/globeLine.vert", "assets/shaders/globeLine.frag");
	}

	var p = ViewGlobeLines.prototype = new bongiovi.View();


	p._init = function() {
		var numSegments = 64;

		var positions = [];
		var coords = [];
		var indices = [];
		var index = 0;
		var i,j;
		var size = 510;
		var gap = 4;

		var getPosition = function(i, j) {	//	rx : -90 ~ 90 , ry : 0 ~ 360
			var rx = i/numSegments * Math.PI - Math.PI * .5;
			var ry = j/numSegments * Math.PI * 2;
			var r = size;
			var pos = [];
			pos[1] = Math.sin(rx) * r;
			var t = Math.cos(rx) * r;
			pos[0] = Math.cos(ry) * t;
			pos[2] = Math.sin(ry) * t;

			return pos;
		}

		for(j=0; j<numSegments; j+=gap) {
			for(i=0; i<numSegments; i++) {
				var p0 = getPosition(i, j);
				var p1 = getPosition(i+1, j);

				positions.push(p0);
				positions.push(p1);

				coords.push(p0);
				coords.push(p1);

				indices.push(index);
				indices.push(index+1);

				index += 2;
			}
		}


		for(j=0; j<numSegments; j++) {
			for(i=0; i<numSegments; i+=gap) {
				var p0 = getPosition(i, j);
				var p1 = getPosition(i, j+1);

				positions.push(p0);
				positions.push(p1);

				coords.push(p0);
				coords.push(p1);

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
		if(!this.mesh) return;

		this.shader.bind();
		var grey = 1;
		this.shader.uniform("color", "uniform3fv", [grey, grey, grey]);
		this.shader.uniform("opacity", "uniform1f", .05);
		this.shader.uniform("cameraRadius", "uniform1f", params.cameraRadius);
		GL.draw(this.mesh);
	};
})();