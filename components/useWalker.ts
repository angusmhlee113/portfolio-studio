"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

type Phase =
  | "walking"
  | "to-chair"
  | "sitting"
  | "sleeping"
  | "daydreaming"
  | "waking"
  | "returning";

/** Keep the current pose between effects so theme changes can reverse mid-transition. */
export function useWalker(
  svgRef: RefObject<SVGSVGElement | null>,
  paused: boolean,
  waving: boolean,
  night: boolean,
  daydream: boolean,
) {
  const [phase, setPhase] = useState<Phase>("walking");
  const motion = useRef({
    elapsed: 0,
    x: 0,
    y: 0,
    sit: 0,
    phase: "walking" as Phase,
  });
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const get = (id: string) => svg.querySelector<SVGElement>(`#${id}`)!;
    const avatar = get("avatar"),
      facing = get("walker-facing"),
      body = get("walker-body");
    const leftLeg = get("leg-left"),
      rightLeg = get("leg-right");
    const leftArm = get("arm-left"),
      rightArm = get("arm-right");
    const shadow = get("walker-shadow"),
      seatedLegs = get("seated-legs");
    const head = get("walker-head"),
      eyes = get("awake-eyes"),
      closedEyes = get("sleep-eyes");
    const m = motion.current;
    const resting = night || daydream;
    const chair = { x: 38, y: -8 };
    const changePhase = (value: Phase) => {
      if (m.phase !== value) {
        m.phase = value;
        setPhase(value);
      }
    };
    function patrol() {
      const local = m.elapsed % 10.6;
      const returning = local >= 5.3;
      const progress = Math.min((local % 5.3) / 4.8, 1);
      return {
        x: -65 * (returning ? 1 - progress : progress),
        y: 36 * (returning ? 1 - progress : progress),
        progress,
        returning,
        turning: local % 5.3 > 4.8,
      };
    }
    function pose(stride: number, direction: number) {
      const sit = m.sit;
      const lift = Math.abs(stride) * 2.4 * (1 - sit);
      avatar.setAttribute("transform", `translate(${m.x} ${m.y})`);
      facing.setAttribute(
        "transform",
        `translate(373 0) scale(${direction} 1) translate(-373 0)`,
      );
      body.setAttribute("transform", `translate(0 ${14 * sit - lift})`);
      leftLeg.setAttribute("transform", `rotate(${stride * 14} 356 352)`);
      rightLeg.setAttribute("transform", `rotate(${-stride * 14} 384 352)`);
      leftLeg.style.opacity = rightLeg.style.opacity = String(1 - sit);
      seatedLegs.style.opacity = String(sit);
      leftArm.setAttribute(
        "transform",
        `rotate(${-stride * 11 - sit * 18} 340 300)`,
      );
      rightArm.setAttribute(
        "transform",
        `rotate(${stride * 11 + sit * 15} 393 300)`,
      );
      head.setAttribute(
        "transform",
        `rotate(${sit * (daydream ? -6 : 12)} 367 284)`,
      );
      eyes.style.opacity = String(1 - (night ? sit : 0));
      closedEyes.style.opacity = String(night ? sit : 0);
      shadow.setAttribute("rx", String(38 - lift));
    }
    if (paused) {
      // Reduced motion changes directly to the correct resting pose.
      const p = patrol();
      m.x = resting ? chair.x : p.x;
      m.y = resting ? chair.y : p.y;
      m.sit = resting ? 1 : 0;
      changePhase(
        resting ? (daydream ? "daydreaming" : "sleeping") : "walking",
      );
      pose(0, 1);
      return;
    }
    let frame = 0,
      previous: number | null = null;
    function animate(now: number) {
      const dt =
        previous === null ? 0 : Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!document.hidden) {
        let stride = 0,
          direction = 1;
        if (resting) {
          const distance = Math.hypot(chair.x - m.x, chair.y - m.y);
          if (distance > 0.1) {
            changePhase("to-chair");
            const step = Math.min(1, (dt * 32) / distance);
            m.x += (chair.x - m.x) * step;
            m.y += (chair.y - m.y) * step;
            m.elapsed += dt;
            stride = Math.sin(m.elapsed * Math.PI * 2.5);
          } else {
            m.x = chair.x;
            m.y = chair.y;
            m.sit = Math.min(1, m.sit + dt / 0.8);
            changePhase(
              m.sit < 1 ? "sitting" : daydream ? "daydreaming" : "sleeping",
            );
          }
        } else if (m.sit > 0) {
          changePhase("waking");
          m.sit = Math.max(0, m.sit - dt / 0.8);
        } else if (m.phase !== "walking") {
          const p = patrol();
          const distance = Math.hypot(p.x - m.x, p.y - m.y);
          if (distance > 0.1) {
            changePhase("returning");
            const step = Math.min(1, (dt * 32) / distance);
            direction = p.x < m.x ? -1 : 1;
            m.x += (p.x - m.x) * step;
            m.y += (p.y - m.y) * step;
            stride = Math.sin((now / 1000) * Math.PI * 2.5);
          } else {
            changePhase("walking");
          }
        } else if (!waving) {
          m.elapsed += dt;
          const p = patrol();
          m.x = p.x;
          m.y = p.y;
          stride = p.turning ? 0 : Math.sin(p.progress * Math.PI * 12);
          const turn = ((m.elapsed % 5.3) - 4.8) / 0.5;
          const sign = p.returning ? 1 : -1;
          direction = p.turning
            ? sign *
              (turn < 0.5 ? 1 : -1) *
              (1 - 0.18 * Math.sin(turn * Math.PI))
            : sign;
        }
        pose(
          waving && !resting ? 0 : stride,
          waving && !resting ? 1 : direction,
        );
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [svgRef, paused, waving, night, daydream]);
  return phase;
}
