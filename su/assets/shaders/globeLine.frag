precision mediump float;
varying vec2 vTextureCoord;
uniform vec3 color;
uniform float opacity;
uniform float isInvert;
varying float vAlphaOffset;

void main(void) {
    gl_FragColor = vec4(color, opacity);
    gl_FragColor *= vAlphaOffset;

    if(isInvert > 0.0) gl_FragColor = vec4(vec3(.01), .3);
}