'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

export interface LifestreamProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Lifestream({ className = '', style = {} }: LifestreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    composer: EffectComposer;
    clock: THREE.Clock;
    mouse: THREE.Vector2;
    particleGeo: THREE.BufferGeometry;
    velocities: Float32Array;
    lines: THREE.Line[];
    PARTICLE_COUNT: number;
    SEGMENTS: number;
    WORLD: { xMin: number; xMax: number; yMin: number; yMax: number; zMin: number; zMax: number };
    X_START: number;
    X_END: number;
    X_SPAN: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x00100e, 0.03);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.5, 52);

    // Setup post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    const bokehPass = new BokehPass(scene, camera, {
      focus: 52,
      aperture: 0.0003,
      maxblur: 0.01
    });
    composer.addPass(bokehPass);
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(containerRef.current.clientWidth, containerRef.current.clientHeight),
      1.15,
      0.6,
      0.0
    );
    composer.addPass(bloomPass);

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };
    window.addEventListener('pointermove', handleMouseMove);

    // Teal color
    const teal = new THREE.Color('#27b0c5');
    const light = new THREE.AmbientLight(teal.clone().multiplyScalar(0.08));
    scene.add(light);

    // Particles setup
    const PARTICLE_COUNT = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const WORLD = { xMin: -32, xMax: 32, yMin: -18, yMax: 18, zMin: -14, zMax: 14 };

    function respawn(i: number) {
      positions[i * 3] = THREE.MathUtils.lerp(WORLD.xMax - 2, WORLD.xMax + 6, Math.random());
      positions[i * 3 + 1] = THREE.MathUtils.lerp(WORLD.yMin, WORLD.yMax, Math.random());
      positions[i * 3 + 2] = THREE.MathUtils.lerp(WORLD.zMin, WORLD.zMax, Math.random());
      velocities[i * 3] = -THREE.MathUtils.lerp(0.05, 0.28, Math.random());
      velocities[i * 3 + 1] = THREE.MathUtils.lerp(0.4, 1.2, Math.random());
      velocities[i * 3 + 2] = Math.random() * Math.PI * 2;
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) respawn(i);

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: teal,
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // Lines setup
    const LINES: THREE.Line[] = [];
    const LINE_COUNT = 14;
    const SEGMENTS = 280;
    const X_START = WORLD.xMin - 2;
    const X_END = WORLD.xMax + 2;
    const X_SPAN = X_END - X_START;

    for (let l = 0; l < LINE_COUNT; l++) {
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array((SEGMENTS + 1) * 3);
      const tOffset = Math.random() * Math.PI * 2;
      const amp = THREE.MathUtils.lerp(2.0, 5.5, Math.random());
      const freq = THREE.MathUtils.lerp(0.12, 0.28, Math.random());
      const zCurve = THREE.MathUtils.lerp(-6, 6, Math.random());
      const thickness = THREE.MathUtils.lerp(1.0, 4.0, Math.random());
      
      lineGeo.userData = {
        tOffset,
        amp,
        freq,
        zCurve,
        speed: THREE.MathUtils.lerp(0.15, 0.45, Math.random())
      };
      
      for (let s = 0; s <= SEGMENTS; s++) {
        const u = s / SEGMENTS;
        const x = X_START + u * X_SPAN;
        linePositions[s * 3] = x;
        linePositions[s * 3 + 1] = Math.sin(x * freq + tOffset) * amp;
        linePositions[s * 3 + 2] = Math.cos(x * (freq * 0.7) + tOffset) * 1.2 + zCurve;
      }
      
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      
      // Main line
      const lineMat = new THREE.LineBasicMaterial({
        color: teal,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: thickness
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      LINES.push(line);
      
      // Glow line
      const glowMat = new THREE.LineBasicMaterial({
        color: teal,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        linewidth: thickness * 1.5
      });
      const glow = new THREE.Line(lineGeo.clone(), glowMat);
      glow.scale.multiplyScalar(1.02);
      scene.add(glow);
      LINES.push(glow);
    }

    // Background spheres
    const bgGroup = new THREE.Group();
    const bgMat = new THREE.MeshBasicMaterial({
      color: teal,
      transparent: true,
      opacity: 0.35
    });
    
    for (let i = 0; i < 40; i++) {
      const r = THREE.MathUtils.lerp(1.5, 6.0, Math.random());
      const geo = new THREE.SphereGeometry(r, 20, 16);
      const mesh = new THREE.Mesh(geo, bgMat);
      mesh.position.set(
        THREE.MathUtils.lerp(-40, 40, Math.random()),
        THREE.MathUtils.lerp(-25, 25, Math.random()),
        THREE.MathUtils.lerp(-120, -60, Math.random())
      );
      bgGroup.add(mesh);
    }
    scene.add(bgGroup);

    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
      const t = clock.getElapsedTime();
      
      // Update camera based on mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 1 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      
      // Update particles
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const phase = velocities[idx + 2];
        const speed = velocities[idx + 1];
        
        pos[idx] += velocities[idx];
        pos[idx + 1] += Math.sin(t * speed + phase) * 0.06;
        pos[idx + 2] += Math.cos(t * (speed * 0.8) + phase) * 0.02;
        
        if (pos[idx] < WORLD.xMin - 4) {
          respawn(i);
        }
      }
      particleGeo.attributes.position.needsUpdate = true;
      
      // Update lines
      for (const line of LINES) {
        const p = line.geometry.attributes.position.array as Float32Array;
        const { tOffset, amp, freq, zCurve, speed } = line.geometry.userData;
        
        for (let s = 0; s <= SEGMENTS; s++) {
          const i = s * 3;
          const x = X_START + (s / SEGMENTS) * X_SPAN;
          p[i + 1] = Math.sin(x * freq + t * speed + tOffset) * amp;
          p[i + 2] = Math.cos(x * (freq * 0.7) + t * (speed * 0.85) + tOffset) * 1.2 + zCurve;
        }
        line.geometry.attributes.position.needsUpdate = true;
      }
      
      composer.render();
      requestAnimationFrame(animate);
    }

    // Handle resize
    function onResize() {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bloomPass.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // Store references for cleanup
    sceneRef.current = {
      renderer,
      scene,
      camera,
      composer,
      clock,
      mouse,
      particleGeo,
      velocities,
      lines: LINES,
      PARTICLE_COUNT,
      SEGMENTS,
      WORLD,
      X_START,
      X_END,
      X_SPAN
    };

    // Start animation
    animate();

    // Store container ref for cleanup
    const container = containerRef.current;

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('resize', onResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      
      LINES.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      
      bgGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', background: '#000', ...style }}
    />
  );
}