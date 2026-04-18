"use client";

import { useEffect, useRef, useState } from "react";

interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface FlowLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyWorkflowProps {
  nodes: FlowNode[];
  links: FlowLink[];
  width?: number;
  height?: number;
  className?: string;
  title?: string;
}

export function SankeyWorkflow({
  nodes,
  links,
  width = 1000,
  height = 200,
  className,
  title,
}: SankeyWorkflowProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; progress: number; linkIndex: number }>>([]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Particle animation
  useEffect(() => {
    if (!visible) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let frameId: number;
    let particleId = 0;

    function animate() {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({ ...p, progress: p.progress + 0.005 }))
          .filter((p) => p.progress <= 1);

        // Spawn new particles
        if (Math.random() < 0.03) {
          const linkIndex = Math.floor(Math.random() * links.length);
          updated.push({
            id: particleId++,
            progress: 0,
            linkIndex,
          });
        }

        return updated;
      });
      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [visible, links.length]);

  function getNodeById(id: string) {
    return nodes.find((n) => n.id === id);
  }

  function getLinkPath(link: FlowLink): string {
    const source = getNodeById(link.source);
    const target = getNodeById(link.target);
    if (!source || !target) return "";

    const sx = source.x + source.width;
    const sy = source.y + source.height / 2;
    const tx = target.x;
    const ty = target.y + target.height / 2;
    const mx = (sx + tx) / 2;

    return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
  }

  function getPointOnPath(path: string, progress: number): { x: number; y: number } {
    if (typeof document === "undefined") return { x: 0, y: 0 };
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", path);
    const len = svgPath.getTotalLength();
    const point = svgPath.getPointAtLength(len * progress);
    return { x: point.x, y: point.y };
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={title ?? "Diagramme de flux"}
    >
      <defs>
        <linearGradient id="link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A24B" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#E8D08B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C8A24B" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1f27" />
          <stop offset="100%" stopColor="#2a2f37" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="particle-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C8A24B" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Links */}
      {links.map((link, i) => {
        const path = getLinkPath(link);
        const isHighlighted =
          hoveredNode === link.source || hoveredNode === link.target;
        return (
          <g key={`link-${i}`}>
            {/* Wide glow layer */}
            <path
              d={path}
              fill="none"
              stroke="#C8A24B"
              strokeWidth={link.value * 2.5}
              opacity={isHighlighted ? 0.12 : 0.04}
              filter="url(#glow)"
              style={{
                transition: "opacity 0.4s ease",
              }}
            />
            {/* Mid glow */}
            <path
              d={path}
              fill="none"
              stroke="url(#link-gradient)"
              strokeWidth={link.value * 1.3}
              opacity={visible ? (isHighlighted ? 0.35 : 0.12) : 0}
              style={{
                transition: "opacity 0.4s ease",
              }}
            />
            {/* Main path */}
            <path
              d={path}
              fill="none"
              stroke="#C8A24B"
              strokeWidth={link.value * 0.6}
              opacity={visible ? (isHighlighted ? 0.7 : 0.3) : 0}
              strokeDasharray={visible ? "none" : "1000"}
              strokeDashoffset={visible ? "0" : "1000"}
              style={{
                transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease",
                transitionDelay: `${i * 150}ms`,
              }}
            />
          </g>
        );
      })}

      {/* Particles flowing along paths */}
      {particles.map((particle) => {
        const link = links[particle.linkIndex];
        if (!link) return null;
        const path = getLinkPath(link);
        const point = getPointOnPath(path, particle.progress);
        return (
          <g key={particle.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#C8A24B"
              opacity={Math.sin(particle.progress * Math.PI) * 0.3}
              filter="url(#glow)"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={2.5}
              fill="#E8D08B"
              opacity={Math.sin(particle.progress * Math.PI) * 0.9}
              filter="url(#particle-glow)"
            />
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredNode === node.id;
        return (
          <g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Node bg */}
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              rx={8}
              fill={isHovered ? "#C8A24B" : "url(#node-gradient)"}
              opacity={visible ? 1 : 0}
              filter="url(#soft-shadow)"
              style={{
                transition: "fill 0.3s ease, opacity 0.6s ease",
                transitionDelay: visible ? `${i * 150}ms` : "0ms",
              }}
            />
            {/* Node border */}
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              rx={8}
              fill="none"
              stroke="#C8A24B"
              strokeWidth={isHovered ? 1.5 : 0.8}
              opacity={visible ? (isHovered ? 1 : 0.4) : 0}
              style={{
                transition: "all 0.3s ease, opacity 0.6s ease",
                transitionDelay: visible ? `${i * 150}ms` : "0ms",
              }}
            />
            {/* Label */}
            <text
              x={node.x + node.width / 2}
              y={node.y + node.height / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isHovered ? "#0A0E12" : "#F4EFE6"}
              fontSize={10}
              fontFamily="monospace"
              opacity={visible ? 1 : 0}
              style={{
                transition: "fill 0.3s ease, opacity 0.6s ease",
                transitionDelay: visible ? `${i * 150 + 100}ms` : "0ms",
              }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
