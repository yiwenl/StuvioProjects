precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler0;
varying float vAlphaOffset;

void main(void) {
    if(vAlphaOffset > .5) {
    	// gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    	gl_FragColor = vec4(0.9647, 0.3059, 0.3059, 1.0);
    } else {
    	gl_FragColor = vec4(1.0);
    	gl_FragColor.a *= .275 * vAlphaOffset;
    }
    
}