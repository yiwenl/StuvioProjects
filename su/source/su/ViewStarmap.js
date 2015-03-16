//ViewStarmap.js

(function() {
	var GL = bongiovi.GL;

	ViewStarmap = function() {
		bongiovi.View.call(this, null, "assets/shaders/starmap.frag");	
	}

	var p = ViewStarmap.prototype = new bongiovi.View();

	p._init = function() {
		this.mesh = bongiovi.MeshUtils.createSphere(510, 24);
	};


	p.render = function(texture) {
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		texture.bind(0);
		GL.draw(this.mesh);
	};
})();