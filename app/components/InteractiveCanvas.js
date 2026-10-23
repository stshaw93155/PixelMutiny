'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Grid of nodes for wireframe cybernetic landscape
    const cols = 28;
    const rows = 14;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const spacingX = width / (cols - 1);
      const spacingY = height / (rows - 1);

      const points = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacingX;
          const baseY = r * spacingY;

          // Wave equation
          const distToMouse = Math.hypot(baseX - mouse.x, baseY - mouse.y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 220);

          const wave =
            Math.sin(c * 0.3 + time) * 12 +
            Math.cos(r * 0.4 + time * 1.2) * 8 +
            mouseInfluence * 35 * Math.sin(time * 3);

          points[r][c] = {
            x: baseX + Math.sin(time + r) * 3,
            y: baseY + wave,
            influence: mouseInfluence,
          };
        }
      }

      // Draw horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 + (r / rows) * 0.04})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw vertical lines with occasional glowing nodes
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Clean wave grid without random floating dots
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none w-full h-full ${className}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
