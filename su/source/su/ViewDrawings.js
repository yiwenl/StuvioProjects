// ViewDrawings.js

(function() {
	var GL = bongiovi.GL;

	ViewDrawings = function(mPosition, mScale, mRatio) {
		this._alpha = 1;
		this.targetAlpha = 1;
		this.easing = .1;
		this._position = mPosition || [];
		this._scale = mScale == undefined ? 1 : mScale;
		this._ratio = mRatio == undefined ? 1 : mRatio;
		bongiovi.View.call(this, bongiovi.ShaderLibs.getShader("generalVert"), bongiovi.ShaderLibs.getShader("alphaFrag"));
	}

	var p = ViewDrawings.prototype;

	p._init = function() {
		this.mesh = bongiovi.MeshUtils.createPlane(2, 2, 1);
	};


	p.tweenAlpha = function(mInitAlpha, mTargetAlpha) {
		// console.log('tweenalpha');
		this._alpha = mInitAlpha;
		this.targetAlpha = mTargetAlpha;
	};


	p.render = function(mTexture) {
		if(!this.mesh) return;
		this._alpha += (this.targetAlpha - this._alpha) * this.easing;

		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("opacity", "uniform1f", this._alpha);
		this.shader.uniform("position", "uniform3fv", this._position);
		this.shader.uniform("scale", "uniform3fv", [this._scale, GL.aspectRatio*this._scale*this._ratio, this._scale]);
		mTexture.bind(0);
		GL.draw(this.mesh);
	};
})();