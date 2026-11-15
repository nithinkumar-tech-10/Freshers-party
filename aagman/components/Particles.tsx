"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  count?: number;
  showCaps?: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  alphaChange: number;
  maxAlpha: number;
  minAlpha: number;
}

interface FloatingCap {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
}

export function Particles({ count = 38, showCaps = true }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseInfluence = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 1;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const particles: Particle[] = [];
    const colors = ["#D4AF37", "#F5E19A", "#FFF8E7", "#E6CA65", "#FFE58F"];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.15),
        alpha: Math.random() * 0.5 + 0.2,
        alphaChange: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        maxAlpha: Math.random() * 0.4 + 0.5,
        minAlpha: 0.1,
      });
    }

    const caps: FloatingCap[] = [];
    if (showCaps) {
      const capCount = Math.min(8, Math.max(3, Math.floor(width / 240)));
      for (let i = 0; i < capCount; i++) {
        caps.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 16 + 18,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.015,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(Math.random() * 0.35 + 0.15),
          opacity: Math.random() * 0.35 + 0.2,
        });
      }
    }

    const drawCap = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "#D4AF37";
      ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, -size * 0.45);
      ctx.lineTo(size * 0.75, 0);
      ctx.lineTo(0, size * 0.45);
      ctx.lineTo(-size * 0.75, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, size * 0.2, size * 0.35, 0, Math.PI, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size * 0.65, size * 0.4);
      ctx.strokeStyle = "#F5E19A";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(size * 0.65, size * 0.4, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#F5E19A";
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!prefersReducedMotion) {
          // Slight gentle reaction to cursor position
          if (mouseInfluence > 0) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              p.x -= (dx / dist) * 0.8;
              p.y -= (dy / dist) * 0.8;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
          p.alpha += p.alphaChange;

          if (p.alpha > p.maxAlpha || p.alpha < p.minAlpha) {
            p.alphaChange = -p.alphaChange;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = p.radius * 3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      for (const c of caps) {
        if (!prefersReducedMotion) {
          c.x += c.vx;
          c.y += c.vy;
          c.rotation += c.rotSpeed;

          if (c.y < -50) {
            c.y = height + 50;
            c.x = Math.random() * width;
          }
          if (c.x < -50) c.x = width + 50;
          if (c.x > width + 50) c.x = -50;
        }

        drawCap(c.x, c.y, c.size, c.rotation, c.opacity);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [count, showCaps]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
