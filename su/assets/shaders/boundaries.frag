precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;

void main(void) {
	vec2 uv = vec2(1.0 - vTextureCoord.x, vTextureCoord.y);
    gl_FragColor = texture2D(uSampler0, uv);
}