"use client";

export interface Point {
  x: number;
  y: number;
}

/** Minimal dependency-free SVG line chart. */
export default function LineChart({
  points,
  height = 140,
  color = "var(--accent)",
  unit = "",
}: {
  points: Point[];
  height?: number;
  color?: string;
  unit?: string;
}) {
  if (points.length === 0) {
    return (
      <div className="flex h-28 items-center justify-center text-xs text-ink-3">
        Not enough data yet — keep logging.
      </div>
    );
  }
  const W = 340;
  const H = height;
  const PAD = 12;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const px = (x: number) => PAD + ((x - minX) / spanX) * (W - PAD * 2);
  const py = (y: number) => H - PAD - ((y - minY) / spanY) * (H - PAD * 2);
  const path = points.map((p, i) => `${i ? "L" : "M"}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(" ");
  const last = points[points.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={px(p.x)} cy={py(p.y)} r={i === points.length - 1 ? 4 : 2.5} fill={color} />
        ))}
      </svg>
      <div className="flex justify-between text-[10px] text-ink-3">
        <span>
          min {Math.round(minY * 10) / 10}
          {unit}
        </span>
        <span className="font-bold" style={{ color }}>
          latest {Math.round(last.y * 10) / 10}
          {unit}
        </span>
        <span>
          max {Math.round(maxY * 10) / 10}
          {unit}
        </span>
      </div>
    </div>
  );
}
