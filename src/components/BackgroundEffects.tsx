import React, { useEffect, useRef } from 'react';
import { Dice1, Spade, Diamond, Club, Heart, DollarSign } from 'lucide-react';

const ICONS = [Dice1, Spade, Diamond, Club, Heart, DollarSign];

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = 20;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      icon: typeof ICONS[number];
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.icon = ICONS[Math.floor(Math.random() * ICONS.length)];
        this.color = getRandomColor();
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        
        // Draw simple shapes instead of SVG icons
        if (this.icon === Spade || this.icon === Heart) {
          drawHeart(ctx, 0, 0, this.size);
        } else if (this.icon === Diamond) {
          drawDiamond(ctx, 0, 0, this.size);
        } else if (this.icon === Club) {
          drawClub(ctx, 0, 0, this.size);
        } else {
          drawDice(ctx, 0, 0, this.size);
        }
        
        ctx.restore();
      }
    }
    
    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.stroke();
    }
    
    function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.lineTo(x, y + size / 2);
      ctx.lineTo(x - size / 2, y);
      ctx.closePath();
      ctx.stroke();
    }
    
    function drawClub(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      const radius = size / 3;
      ctx.beginPath();
      ctx.arc(x - radius, y - radius, radius, 0, Math.PI * 2);
      ctx.arc(x + radius, y - radius, radius, 0, Math.PI * 2);
      ctx.arc(x, y + radius, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    function drawDice(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      ctx.beginPath();
      ctx.arc(x, y, size / 6, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    function getRandomColor() {
      const colors = ['#FFD700', '#B22222', '#FFFFFF', '#FFA500'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      requestAnimationFrame(animate);
    }
    
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    init();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};