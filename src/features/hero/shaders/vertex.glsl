varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    
    // Subtle wave distortion
    vec3 newPos = position;
    newPos.z += sin(position.y * 2.0 + uTime) * 0.1;
    newPos.x += cos(position.z * 1.5 + uTime) * 0.1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
