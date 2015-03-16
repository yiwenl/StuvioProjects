precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float currentIndex;
uniform float cameraRadius;

varying vec2 vTextureCoord;
varying float vAlphaOffset;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    if(currentIndex == aTextureCoord.x) vAlphaOffset = 1.0;
    else vAlphaOffset = .25;

    if(gl_Position.z < cameraRadius) {
    	vAlphaOffset = 0.0;
    }
}