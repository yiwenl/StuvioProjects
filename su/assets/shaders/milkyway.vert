precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 rotation;
uniform float cameraRadius;

varying vec2 vTextureCoord;
varying float vAlphaOffset;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * rotation * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

    vAlphaOffset = 1.0;
    if(gl_Position.z < cameraRadius || aTextureCoord.y != 0.0) vAlphaOffset = 0.0;
}