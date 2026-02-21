varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    vec3 glow = uColorA * intensity;
    
    // Gradient based on normal/position
    vec3 color = mix(uColorA, uColorB, vNormal.y * 0.5 + 0.5);
    
    // Add bit of movement to color
    color.r += sin(uTime * 0.5) * 0.1;
    color.g += cos(uTime * 0.3) * 0.1;

    gl_FragColor = vec4(color + glow, 1.0);
}
