"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Moneda Healthcoin en 3D (WebGL puro con three.js).
 * El cuerpo es un cilindro dorado (canto); la cara es un disco plano
 * (CircleGeometry) que mapea /public/healthcoin-coin.png con orientación
 * predecible (sin espejado). Gira suave, flota y reacciona al mouse.
 */
const COIN_TEXTURE = "/healthcoin-coin.png";
const R = 2.4;
const THICK = 0.3;

export default function TokenCoin3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xfff0d8, 2.4);
    key.position.set(5, 6, 8);
    scene.add(key);
    const amber = new THREE.PointLight(0xf0902a, 26, 50);
    amber.position.set(-6, -2, 4);
    scene.add(amber);
    const rim = new THREE.PointLight(0xf5cd86, 16, 50);
    rim.position.set(4, -4, -6);
    scene.add(rim);

    // Textura (sin espejado; zoom leve para recortar margen transparente)
    const loader = new THREE.TextureLoader();
    const face = loader.load(COIN_TEXTURE);
    face.colorSpace = THREE.SRGBColorSpace;
    face.anisotropy = 8;
    face.center.set(0.5, 0.5);
    face.repeat.set(0.92, 0.92);

    const faceMat = new THREE.MeshStandardMaterial({
      map: face,
      metalness: 0.3,
      roughness: 0.45,
      transparent: true,
      alphaTest: 0.1,
    });
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xc89a52,
      metalness: 1,
      roughness: 0.4,
    });

    const inner = new THREE.Group();

    // Cuerpo / canto dorado
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, THICK, 96),
      edgeMat
    );
    body.rotation.x = Math.PI / 2; // tapas hacia ±Z
    inner.add(body);

    // Cara frontal (mira a la cámara, +Z) — lectura correcta
    const front = new THREE.Mesh(new THREE.CircleGeometry(R * 0.985, 96), faceMat);
    front.position.z = THICK / 2 + 0.01;
    inner.add(front);

    // Cara trasera (mira a -Z) — girada 180° para que se lea bien por detrás
    const back = new THREE.Mesh(new THREE.CircleGeometry(R * 0.985, 96), faceMat);
    back.position.z = -THICK / 2 - 0.01;
    back.rotation.y = Math.PI;
    inner.add(back);

    const group = new THREE.Group();
    group.add(inner);
    scene.add(group);

    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const yaw = Math.sin(t * 0.5) * 0.45 + target.x * 0.5;
      group.rotation.y += (yaw - group.rotation.y) * 0.05;
      inner.rotation.x += (target.y * 0.3 - inner.rotation.x) * 0.06;
      group.position.y = Math.sin(t * 1.2) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      renderer.dispose();
      faceMat.dispose();
      edgeMat.dispose();
      face.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
