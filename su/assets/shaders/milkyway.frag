precision mediump float;
varying vec2 vTextureCoord;
varying float vAlphaOffset;

uniform vec4 lineColor;
uniform float isInvert;

// const vec4 lineColor = vec4(1.0, 0.8745, 0.6039, .15);
const float PI = 3.141592653;

void main(void) {
	float a = sin(vTextureCoord.x * PI * 4.0 + vTextureCoord.x * 1.7894534531) + 1.0;
	a *= .5;
    gl_FragColor = lineColor;
    gl_FragColor.a *= (.3 + (a*.7)) * vAlphaOffset;

    if(isInvert > 0.0) gl_FragColor = vec4(vec3(.1), .5);
}