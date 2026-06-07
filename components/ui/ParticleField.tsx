"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight Three.js dust/snow field for dark hero panels.
 * Particles drift upward, the camera parallaxes to the pointer.
 * Respects reduced-motion and disposes all GPU resources on unmount.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let w = parent.clientWidth || 1;
    let h = parent.clientHeight || 1;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 18;

    const COUNT = 300;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      speeds[i] = 0.004 + Math.random() * 0.012;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.14,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mx = 0;
    let my = 0;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    };
    parent.addEventListener("pointermove", onMove);

    let raf = 0;
    const tick = () => {
      const pos = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += speeds[i];
        pos[i * 3] += speeds[i] * 0.4;
        if (pos[i * 3 + 1] > 14) pos[i * 3 + 1] = -14;
        if (pos[i * 3] > 22) pos[i * 3] = -22;
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0006;
      camera.position.x += (mx * 3 - camera.position.x) * 0.04;
      camera.position.y += (-my * 2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = parent.clientWidth || 1;
      h = parent.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
