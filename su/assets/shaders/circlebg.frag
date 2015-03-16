precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D texture;

const float radius = .34;
const float innerRadius = .28;
const float PI = 3.141592653;

void main(void) {
    gl_FragColor = texture2D(texture, vTextureCoord);
    vec2 uv = vTextureCoord;
    uv.x -= .004;
    uv.y += .02;
    

    float dist = distance(uv, vec2(.5));
    if( dist < radius) {
    	gl_FragColor.rgb = vec3(0.1, 0.1, 0.1);

    	if(dist > innerRadius) {
    		float offset = sin((dist - innerRadius) / (radius - innerRadius) * PI * .5);
    		gl_FragColor = vec4(.0, .0, .0, offset);
		} else {
			gl_FragColor = vec4(0.0);
		}
    	
    }
}