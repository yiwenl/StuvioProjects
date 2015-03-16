precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aExtra;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float cameraRadius;

varying vec2 vTextureCoord;
varying float vBaseAlpha;
varying float vJointOffset;
varying float vIsInConstellation;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    float s = aExtra.x + 2.0;
    s = 6.0 - s;
    if(s < .0) s = 0.0;
    float base = 4.0 + aExtra.y*4.0;
    float pSize = pow(base, s*.3)+1.0;
    if(aExtra.z > 0.0) {
    	pSize = max(pSize, 8.0);
    } 

    gl_PointSize = pSize;


    vTextureCoord 	= aTextureCoord;
    vBaseAlpha 		= aExtra.y == 1.0 ? 1.0 : .25; 
    vJointOffset 	= aExtra.z;

    if(gl_Position.z < cameraRadius) vBaseAlpha = 0.0;
}