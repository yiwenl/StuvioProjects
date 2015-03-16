precision mediump float;
varying vec2 vTextureCoord;
uniform vec3 color;
uniform float opacity;

varying float vAlphaOffset;

void main(void) {
    gl_FragColor = vec4(color, opacity);
    gl_FragColor *= vAlphaOffset;
}