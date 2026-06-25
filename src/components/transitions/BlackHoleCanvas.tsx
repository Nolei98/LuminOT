"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

/* eslint-disable */
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uProgress;
uniform vec2 uCenter;
uniform vec3 uTint;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

float noise(vec2 p){
  vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

vec3 portalGlow(vec2 uv,vec2 ctr,float aspect,vec3 inn,vec3 ring,float spin){
  vec2 d=uv-ctr;d.x*=aspect;
  float r=length(d);float a=atan(d.y,d.x);float R=0.105;
  float sw=sin(a*4.0+spin-1.5/(r*7.0+0.2));
  vec3 col=inn*smoothstep(R,0.0,r)*(0.65+0.35*sw);
  col+=inn*smoothstep(R*0.45,0.0,r)*1.1;
  col+=ring*smoothstep(0.014,0.0,abs(r-R))*2.0;
  col+=ring*smoothstep(R+0.06,R,r)*0.30;
  col+=(inn*0.4+ring*0.6)*smoothstep(0.38,0.0,r)*0.30;
  return col;
}

vec3 scene(vec2 uv,float aspect){
  // Sky gradient — moody dark atmospheric
  vec3 skyH=vec3(0.035,0.062,0.105);
  vec3 skyL=vec3(0.090,0.135,0.175);
  vec3 hor=vec3(0.42,0.34,0.20);
  vec3 sky=mix(skyH,skyL,smoothstep(1.0,0.42,uv.y));
  sky=mix(sky,hor,smoothstep(0.62,0.40,uv.y)*0.52);
  float cn=noise(uv*vec2(aspect*2.8,2.8)+vec2(uTime*0.018,0.0));
  sky+=vec3(0.055,0.060,0.065)*cn*smoothstep(0.48,0.82,uv.y)*0.55;

  // Ground
  vec3 gnd=vec3(0.038,0.052,0.038);
  vec3 col=mix(sky,gnd,smoothstep(0.40,0.26,uv.y));

  // Ground mist
  col+=vec3(0.48,0.52,0.56)*smoothstep(0.40,0.27,uv.y)*0.22;

  // Film grain
  col+=(hash(floor(uv*vec2(aspect,1.0)*260.0))-0.5)*0.015;

  // Left portal — Passado: lunar/golden (CSS left:33%, top:48.5% -> WebGL ~0.33, ~0.56)
  col+=portalGlow(uv,vec2(0.33,0.56),aspect,
    vec3(1.00,0.93,0.64),   // warm cream-gold core
    vec3(0.87,0.63,0.26),   // golden patina ring
    uTime*0.50);

  // Right portal — Futuro: cosmic vortex (CSS left:67%)
  col+=portalGlow(uv,vec2(0.67,0.56),aspect,
    vec3(0.33,0.20,0.92),   // deep violet core
    vec3(0.24,0.70,0.98),   // electric blue ring
    uTime*1.60);

  return clamp(col,0.0,2.0);
}

void main(){
  float aspect=uRes.x/uRes.y;
  vec2 uv=gl_FragCoord.xy/uRes;
  float p=uProgress;

  // Polar coords relative to portal center
  vec2 diff=uv-uCenter;diff.x*=aspect;
  float r=length(diff);
  float ang=atan(diff.y,diff.x);

  // Swirl — accelerates near nucleus
  ang+=p*(3.5+2.0/(r+0.055));

  // Radial collapse
  float nr=max(r*(1.0-p*1.10),0.0);

  // Rebuild distorted UV
  vec2 nd=vec2(cos(ang),sin(ang))*nr;nd.x/=aspect;
  vec2 suv=clamp(uCenter+nd,0.001,0.999);

  // Chromatic aberration (R/B offset along radial direction)
  float ca=p*p*0.016;
  vec2 caDir=normalize(diff+0.0001);
  vec3 col;
  col.r=scene(clamp(suv+caDir*ca,0.001,0.999),aspect).r;
  col.g=scene(suv,aspect).g;
  col.b=scene(clamp(suv-caDir*ca,0.001,0.999),aspect).b;

  // Accretion disk tint
  col=mix(col,col*uTint*2.2,p*0.50);

  // Bright accretion ring at collapsing edge
  float ringR=0.025*max(1.0-p,0.0);
  float ring=exp(-abs(nr-ringR)*60.0)*smoothstep(0.25,0.65,p);
  col+=uTint*ring*2.2;

  // Event horizon — nucleus darkens
  float evh=smoothstep(0.09,0.0,nr)*smoothstep(0.18,0.58,p);
  col*=(1.0-evh*0.98);

  // Vignette the distortion field
  col*=mix(1.0,smoothstep(0.0,0.04,nr),p*0.65);

  // Color flash expanding from center
  float flash=smoothstep(0.78,1.0,p);
  vec2 fDelta=(uv-uCenter)*vec2(aspect,1.0);
  float flashMask=smoothstep(0.48*(1.0-flash*0.5),0.0,length(fDelta));
  col=mix(col,uTint*3.8,flash*flashMask*0.92);

  // Screen fill at very end
  col=mix(col,uTint*3.0,smoothstep(0.94,1.0,p));

  gl_FragColor=vec4(clamp(col,0.0,4.0),1.0);
}`;
/* eslint-enable */

interface Props {
  target: "past" | "future";
  onNavigate: () => void;
  onComplete: () => void;
}

export function BlackHoleCanvas({ target, onNavigate, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onNavigateRef = useRef(onNavigate);
  const onCompleteRef = useRef(onComplete);
  onNavigateRef.current = onNavigate;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) { onNavigateRef.current(); onCompleteRef.current(); return; }

    const gl = cv.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false,
    });
    if (!gl) { onNavigateRef.current(); onCompleteRef.current(); return; }

    const dpr = Math.min(typeof devicePixelRatio === "number" ? devicePixelRatio : 1, 2);

    function resize() {
      if (!cv || !gl) return;
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();

    function makeShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res:    gl.getUniformLocation(prog, "uRes"),
      time:   gl.getUniformLocation(prog, "uTime"),
      prog:   gl.getUniformLocation(prog, "uProgress"),
      center: gl.getUniformLocation(prog, "uCenter"),
      tint:   gl.getUniformLocation(prog, "uTint"),
    };

    // Portal center in WebGL UV (Y=0 bottom): CSS left:33%/67%, top:48.5% → ~0.56 WebGL Y
    const CENTER = target === "past" ? [0.33, 0.56] : [0.67, 0.56];
    const TINT   = target === "past" ? [1.00, 0.78, 0.42] : [0.50, 0.45, 1.00];

    const DURATION = 1.6; // seconds
    const t0 = performance.now();
    let navigated = false;
    let completed = false;

    // power2.in easing — t² curve, no GSAP ticker dependency
    function easeIn(t: number) { return t * t; }

    let raf: number;
    function frame(now: number) {
      const elapsed = (now - t0) / 1000;
      const raw = Math.min(elapsed / DURATION, 1);
      const progress = easeIn(raw);

      gl!.uniform2f(U.res, cv!.width, cv!.height);
      gl!.uniform1f(U.time, elapsed);
      gl!.uniform1f(U.prog, progress);
      gl!.uniform2f(U.center, CENTER[0], CENTER[1]);
      gl!.uniform3f(U.tint, TINT[0], TINT[1], TINT[2]);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      if (!navigated && progress >= 0.82) {
        navigated = true;
        onNavigateRef.current();
      }
      if (!completed && raw >= 1) {
        completed = true;
        onCompleteRef.current();
        return; // stop loop
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] block h-screen w-screen"
    />
  );
}
