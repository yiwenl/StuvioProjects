precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
	vec2 uv = vTextureCoord;
	uv.x += .5;
	if(uv.x > 1.0) uv.x -= 1.0;
    gl_FragColor = texture2D(texture, uv);
}