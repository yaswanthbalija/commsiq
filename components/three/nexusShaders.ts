/** GLSL for the hero "Conversation Nexus" core. */

export const CORE_VERT = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vPos = position;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

/**
 * Obsidian shell with animated brand-energy veins beneath the surface and a
 * strong coloured fresnel rim. uFlash / uFlashColor drive the arrival pulse.
 */
export const CORE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uFlash;
  uniform vec3 uFlashColor;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vView;

  // cheap 3D value noise
  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    return n;
  }
  float fbm(vec3 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 pink = vec3(1.0, 0.176, 0.545);
    vec3 purple = vec3(0.608, 0.302, 1.0);
    vec3 blue = vec3(0.176, 0.659, 1.0);

    vec3 p = normalize(vPos);
    float n = fbm(p * 2.6 + vec3(0.0, uTime * 0.12, uTime * 0.07));
    // thin bright energy lines with a soft glow either side
    float d = abs(fract(n * 5.0 + uTime * 0.05) - 0.5) * 2.0;
    float veins = (1.0 - smoothstep(0.0, 0.08, d)) + 0.28 * (1.0 - smoothstep(0.0, 0.45, d));
    float flow = 0.5 + 0.5 * sin(p.y * 4.0 + uTime * 0.6 + n * 3.0);
    vec3 energy = mix(mix(pink, purple, flow), blue, smoothstep(0.3, 0.9, n));

    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    vec3 base = vec3(0.035, 0.035, 0.06);
    // subtle glossy highlight from a fixed upper-left "studio" light
    vec3 l = normalize(vec3(-0.6, 0.8, 0.9));
    float spec = pow(max(dot(reflect(-l, vNormal), vView), 0.0), 60.0);

    vec3 col = base;
    col += energy * veins * (0.55 + 0.45 * flow);
    col += energy * 0.10;
    col += energy * fres * 2.4;
    col += vec3(1.0) * spec * 0.35;
    col += uFlashColor * uFlash * (0.35 + fres * 1.2);
    gl_FragColor = vec4(col, 1.0);
  }
`;
