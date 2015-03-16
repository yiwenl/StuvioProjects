//ViewMilkyWayCopy.js

(function() {
	var GL = bongiovi.GL;

	ViewMilkyWayCopy = function(isEcliptic) {
		this._isEcliptic = isEcliptic || false;
		this._alpha = 1;
		this.targetAlpha = 1;
		this.easing = .1;

		var mQuat = isEcliptic ? [-0.015888573601841927, 0.2025793343782425, 0.9791369438171387, 0] : [-0.4161895215511322, 0.3992542028427124, 0.7155793905258179, 0.3941173553466797];
		
		this._rotation = new bongiovi.SceneRotation();
		this._rotation.tempRotation.set(mQuat);
		this._rotation._rotation.set(mQuat);
		this._rotation.update();
		this._rotation.lock();

		this.matrix = mat4.create();

		bongiovi.View.call(this, "assets/shaders/milkyway.vert", bongiovi.ShaderLibs.getShader("alphaFrag"));
	}

	var p = ViewMilkyWayCopy.prototype = new bongiovi.View();

	p._init = function() {
		var radius = -480;
		var size = 70;
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7];

		positions.push([-size, -size*.5+size*.3, radius]);
		positions.push([ size, -size*.5+size*.3, radius]);
		positions.push([ size,  size*.5+size*.3, radius]);
		positions.push([-size,  size*.5+size*.3, radius]);

		positions.push([ size, -size*.5+size*.3, -radius]);
		positions.push([-size, -size*.5+size*.3, -radius]);
		positions.push([-size,  size*.5+size*.3, -radius]);
		positions.push([ size,  size*.5+size*.3, -radius]);

		if(this._isEcliptic) {
			coords.push([0, 0]);
			coords.push([1, 0]);
			coords.push([1, .5]);
			coords.push([0, .5]);
			coords.push([0, 0]);
			coords.push([1, 0]);
			coords.push([1, .5]);
			coords.push([0, .5]);
		} else {
			coords.push([0, .5]);
			coords.push([1, .5]);
			coords.push([1, 1]);
			coords.push([0, 1]);	
			coords.push([0, .5]);
			coords.push([1, .5]);
			coords.push([1, 1]);
			coords.push([0, 1]);	
		}
		
		this.mesh = new bongiovi.Mesh(positions.length, indices.length, GL.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};


	p.render = function(mTexture) {
		this._alpha += (this.targetAlpha - this._alpha) * this.easing;
		
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("opacity", "uniform1f", this._alpha);
		this.shader.uniform("rotation", "uniformMatrix4fv", this._rotation.matrix);
		mTexture.bind(0);
		GL.draw(this.mesh);
	};
})();