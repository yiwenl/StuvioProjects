//ViewMilkyWays.js

(function() {
	var GL = bongiovi.GL;
	var random = function(min, max) {	return min + (max - min) * Math.random(); }

	ViewMilkyWays = function(isEcliptic) {
		this._isEcliptic = isEcliptic || false;
		var mQuat = isEcliptic ? [-0.015888573601841927, 0.2025793343782425, 0.9791369438171387, 0] : [-0.4161895215511322, 0.3992542028427124, 0.7155793905258179, 0.3941173553466797];
		this._lineColor = isEcliptic ? [.1176, .4745, 0.8902, 1] : [1.0, 0.8745, 0.6039, .15];
		this._rotation = new bongiovi.SceneRotation();
		this._rotation.tempRotation.set(mQuat);
		this._rotation._rotation.set(mQuat);
		this._rotation.update();
		this._rotation.lock();
		bongiovi.View.call(this, "assets/shaders/milkyway.vert", "assets/shaders/milkyway.frag");
	}

	var p = ViewMilkyWays.prototype = new bongiovi.View();

	p._init = function() {
		gl = GL.gl;
		
		var radius = 500;
		var numSeg = this._isEcliptic ? 1500 : 100;
		var numLines = 10;

		var positions = [];
		var coords = [];
		var indices = [];
		var index = 0;


		function getPos(i, num, r, waveLength, waveHeight, thetaOffset) {
			var theta = i/num * Math.PI * 2;
			var v = vec3.clone([r*Math.cos(theta), Math.sin(theta * waveLength + thetaOffset) * waveHeight, r*Math.sin(theta)]);
			vec3.normalize(v, v);
			vec3.scale(v, v, r);
			return v;
		}

		if(this._isEcliptic) {
			var lineGap = 5;
			for(var i=0;i<numSeg; i++) {
				positions.push(getPos(i, numSeg, radius, 1, 0, 0));
				positions.push(getPos(i+1, numSeg, radius, 1, 0, 0));
				coords.push([0, i%lineGap]);
				coords.push([0, i%lineGap]);
				indices.push(index);
				indices.push(index+1);

				index += 2;
			}
		} else {
			var offset = 0;
			var waveHeight = 60;

			for(var j=0; j<numLines; j++) {
				var waveLength = 2.0;
				waveHeight -= 5;
				var thetaOffset = offset;
				offset += j*.05;
				for(var i=0;i<numSeg; i++) {
					positions.push(getPos(i, numSeg, radius, waveLength, waveHeight, thetaOffset));
					positions.push(getPos(i+1, numSeg, radius, waveLength, waveHeight, thetaOffset));
					coords.push([i/numSeg, 0]);
					coords.push([(i+1)/numSeg, 0]);
					indices.push(index);
					indices.push(index+1);

					index += 2;
				}
			}	
		}

		this.mesh = new bongiovi.Mesh(positions.length, indices.length, GL.gl.LINES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};

	p.render = function() {
		// GL.gl.lineWidth(1);
		this.shader.bind();
		this.shader.uniform("rotation", "uniformMatrix4fv", this._rotation.matrix);
		this.shader.uniform("cameraRadius", "uniform1f", params.cameraRadius);
		this.shader.uniform("lineColor", "uniform4fv", this._lineColor);
		this.shader.uniform("isInvert", "uniform1f", params.isInvert);
		// texture.bind(0);
		GL.draw(this.mesh);
	};
})();