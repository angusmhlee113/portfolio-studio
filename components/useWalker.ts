"use client";
import { useEffect, useRef, type RefObject } from "react";

/** Mutate only SVG transforms per frame; React owns interaction state. */
export function useWalker(
  svgRef: RefObject<SVGSVGElement | null>,
  paused: boolean,
  waving: boolean,
) {
  const elapsed = useRef(0);
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
      rightArm = get("arm-right"),
      shadow = get("walker-shadow");
    if (waving) {
      [facing, body, leftLeg, rightLeg, leftArm, rightArm].forEach((part) =>
        part.removeAttribute("transform"),
      );
      return;
    }
    if (paused) return;
    let frame = 0,
      previous: number | null = null;
    function animate(now: number) {
      const delta =
        previous === null ? 0 : Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!document.hidden) {
        elapsed.current += delta;
        const legDuration = 4.8,
          turnDuration = 0.5,
          half = legDuration + turnDuration;
        const phase = elapsed.current % (half * 2),
          returning = phase >= half,
          local = phase % half;
        const progress = Math.min(local / legDuration, 1),
          turning = local > legDuration;
        const distance = returning ? 1 - progress : progress;
        const stride = turning ? 0 : Math.sin(progress * Math.PI * 12);
        const lift = turning ? 0 : Math.abs(stride) * 2.4;
        const direction = returning ? 1 : -1;
        const turnProgress = (local - legDuration) / turnDuration;
        const scale = turning
          ? direction *
            (turnProgress < 0.5 ? 1 : -1) *
            (1 - 0.18 * Math.sin(turnProgress * Math.PI))
          : direction;
        avatar.setAttribute(
          "transform",
          `translate(${-65 * distance} ${36 * distance})`,
        );
        facing.setAttribute(
          "transform",
          `translate(373 0) scale(${scale} 1) translate(-373 0)`,
        );
        body.setAttribute("transform", `translate(0 ${-lift})`);
        leftLeg.setAttribute("transform", `rotate(${stride * 14} 356 352)`);
        rightLeg.setAttribute("transform", `rotate(${-stride * 14} 384 352)`);
        leftArm.setAttribute("transform", `rotate(${-stride * 11} 340 300)`);
        rightArm.setAttribute("transform", `rotate(${stride * 11} 393 300)`);
        shadow.setAttribute("rx", String(38 - lift));
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [svgRef, paused, waving]);
}
