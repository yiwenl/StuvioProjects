precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;
uniform float invert;
varying float vBaseAlpha;
varying float vJointOffset;

void main(void) {
    vec2 uv = gl_PointCoord * .5;
    uv.y += .5;
    uv.x += vJointOffset;
    gl_FragColor = texture2D(texture, uv);
    gl_FragColor.a *= vBaseAlpha;

    if(invert > 0.0) {
    	gl_FragColor.rgb = vec3(.0);
    }
}