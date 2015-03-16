precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
	vec4 color = texture2D(texture, vTextureCoord);
	float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
	color.rgb = mix(color.rgb, vec3(gray), .5);
	gl_FragColor = color;
}