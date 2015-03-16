precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
varying float vBaseAlpha;
varying float vJointOffset;

void main(void) {
    vec2 uv = gl_PointCoord * .5;
    uv.y += .5;
    uv.x += vJointOffset;
    gl_FragColor = texture2D(texture, uv);
    gl_FragColor.a *= vBaseAlpha;
}