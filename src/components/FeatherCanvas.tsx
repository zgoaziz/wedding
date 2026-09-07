"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FeatherParticle {
  sprite: THREE.Sprite;
  fallSpeed: number;
  swaySpeed: number;
  swayAmount: number;
  swayOffset: number;
  rotSpeed: number;
  baseX: number;
}

export default function FeatherCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Create a smooth golden petal / particle texture dynamically
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, "rgba(255, 230, 160, 0.95)");
      grad.addColorStop(0.35, "rgba(217, 181, 106, 0.65)");
      grad.addColorStop(0.7, "rgba(181, 138, 63, 0.25)");
      grad.addColorStop(1, "rgba(181, 138, 63, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    const featherTexture = new THREE.CanvasTexture(canvas);
    featherTexture.colorSpace = THREE.SRGBColorSpace;

    const particles: FeatherParticle[] = [];
    const count = window.innerWidth < 768 ? 20 : 36;

    for (let i = 0; i < count; i++) {
      const material = new THREE.SpriteMaterial({
        map: featherTexture,
        transparent: true,
        opacity: 0.25 + Math.random() * 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(material);
      const scale = 0.6 + Math.random() * 1.4;
      sprite.scale.set(scale, scale, 1);

      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 10;
      sprite.position.set(x, y, z);

      scene.add(sprite);

      particles.push({
        sprite,
        fallSpeed: 0.004 + Math.random() * 0.008,
        swaySpeed: 0.2 + Math.random() * 0.4,
        swayAmount: 0.5 + Math.random() * 1.2,
        swayOffset: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        baseX: x,
      });
    }

    let scrollFactor = 0;
    const handleScroll = () => {
      scrollFactor = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let frameId = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      particles.forEach((p) => {
        p.sprite.position.y -= p.fallSpeed;
        p.sprite.position.x = p.baseX + Math.sin(t * p.swaySpeed + p.swayOffset) * p.swayAmount;
        (p.sprite.material as THREE.SpriteMaterial).rotation += p.rotSpeed;

        if (p.sprite.position.y < -13) {
          p.sprite.position.y = 13;
          p.baseX = (Math.random() - 0.5) * 26;
        }
      });

      camera.position.y = -scrollFactor;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      particles.forEach((p) => {
        p.sprite.material.dispose();
      });
      featherTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full"
      aria-hidden="true"
    />
  );
}
