import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2  u_mouse;
uniform vec2  u_res;
uniform vec2  u_img;
uniform float u_strength;
uniform float u_time;

vec2 coverUV(vec2 uv) {
  float ca = u_res.x / u_res.y;
  float ia = u_img.x / u_img.y;
  vec2 scale = ca > ia ? vec2(1.0, ia / ca) : vec2(ca / ia, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv     = v_uv;
  vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
  vec2 toMouse = (uv - u_mouse) * aspect;
  float dist   = length(toMouse);
  float radius = 0.24;
  float falloff = smoothstep(radius, 0.0, dist) * u_strength;

  vec2 swirlUV = uv;

  if (falloff > 0.001) {
    // 1. Vortex rotation
    float angle = falloff * 3.5;
    float s = sin(angle), c = cos(angle);
    vec2 centered = (uv - u_mouse) * aspect;
    vec2 rotated  = vec2(c * centered.x - s * centered.y,
                         s * centered.x + c * centered.y);
    swirlUV = u_mouse + rotated / aspect;

    // 2. Radial ripple
    vec2 dir = toMouse / (dist + 0.0001);
    float wave = sin(dist * 50.0 - u_time * 5.0) * 0.02 * falloff;
    swirlUV += (dir / aspect) * wave;

    // 3. Turbulence
    swirlUV.x += sin(swirlUV.y * 30.0 + u_time * 2.0) * 0.007 * falloff;
    swirlUV.y += cos(swirlUV.x * 30.0 + u_time * 2.0) * 0.007 * falloff;
  }

  // 4. Chromatic aberration only in distorted zone
  float ab = falloff * 0.014;
  float r = texture2D(u_tex, coverUV(swirlUV + vec2(ab,  0.0))).r;
  float g = texture2D(u_tex, coverUV(swirlUV)).g;
  float b = texture2D(u_tex, coverUV(swirlUV - vec2(ab,  0.0))).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}`;

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(s));
  }
  return s;
}

function HeroLiquidBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    // Program
    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uMouse    = gl.getUniformLocation(prog, 'u_mouse');
    const uRes      = gl.getUniformLocation(prog, 'u_res');
    const uImg      = gl.getUniformLocation(prog, 'u_img');
    const uStrength = gl.getUniformLocation(prog, 'u_strength');
    const uTime     = gl.getUniformLocation(prog, 'u_time');

    // Texture — dark placeholder, replaced when image loads
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([8, 14, 28, 255]));

    let imgW = 1, imgH = 1;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/hero/hero-bg.jpg';
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    // Resize
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // State
    let mx = 0.5, my = 0.5;
    let cx = 0.5, cy = 0.5;
    let targetStr = 0, curStr = 0;
    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = (time) => {
      cx     = lerp(cx,  mx,  0.08);
      cy     = lerp(cy,  my,  0.08);
      curStr = lerp(curStr, targetStr, 0.06);

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uMouse,    cx, cy);
      gl.uniform2f(uRes,      canvas.width, canvas.height);
      gl.uniform2f(uImg,      imgW, imgH);
      gl.uniform1f(uStrength, curStr);
      gl.uniform1f(uTime,     time * 0.001);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // Mouse tracking
    const section = canvas.closest('.hero');

    const onMove = (e) => {
      const rect    = section.getBoundingClientRect();
      const winEl   = document.getElementById('hero-window');
      const winRect = winEl?.getBoundingClientRect();

      mx = (e.clientX - rect.left)  / rect.width;
      my = 1.0 - (e.clientY - rect.top) / rect.height;

      const overWin = winRect &&
        e.clientX >= winRect.left && e.clientX <= winRect.right &&
        e.clientY >= winRect.top  && e.clientY <= winRect.bottom;

      targetStr = overWin ? 0 : 1;
    };
    const onLeave = () => { targetStr = 0; };

    section?.addEventListener('mousemove', onMove, { passive: true });
    section?.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section?.removeEventListener('mousemove', onMove);
      section?.removeEventListener('mouseleave', onLeave);
      gl.deleteProgram(prog);
      gl.deleteTexture(tex);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero__liquid-canvas"
      aria-hidden="true"
    />
  );
}

export default HeroLiquidBg;
