"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useWalker } from "./useWalker";

export default function Studio({
  paused,
  night,
  daydream,
}: {
  paused: boolean;
  night: boolean;
  daydream: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [waving, setWaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phase = useWalker(svgRef, paused, waving, night, daydream);
  useEffect(() => {
    if (night || daydream) {
      if (timer.current) clearTimeout(timer.current);
      setWaving(false);
    }
  }, [night, daydream]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (paused && svgRef.current) svgRef.current.style.transform = "";
  }, [paused]);
  function wave() {
    if (night || daydream || phase !== "walking") return;
    if (timer.current) clearTimeout(timer.current);
    setWaving(true);
    timer.current = setTimeout(() => setWaving(false), 3000);
  }
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.pointerType === "touch" || !svgRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    svgRef.current.style.transform = `perspective(900px) rotateY(${(event.clientX - rect.left - rect.width / 2) / 55}deg) rotateX(${-(event.clientY - rect.top - rect.height / 2) / 70}deg)`;
  }
  return (
    <div
      className="scene-shell"
      id="studio"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        if (svgRef.current) svgRef.current.style.transform = "";
      }}
    >
      <svg
        ref={svgRef}
        className="scene"
        viewBox="0 0 600 510"
        role="group"
        aria-labelledby="scene-title"
      >
        <title id="scene-title">
          An illustrated isometric studio with a walking avatar, desk, monitor
          and plants
        </title>
        <defs>
          <linearGradient id="floor" x2="1" y2="1">
            <stop stop-color="#e4e5d6" />
            <stop offset="1" stop-color="#babdaf" />
          </linearGradient>
          <linearGradient id="wall" x2="1" y2="1">
            <stop stop-color="#f4f2e5" />
            <stop offset="1" stop-color="#dcded1" />
          </linearGradient>
          <linearGradient id="shirt" x2="1" y2="1">
            <stop stop-color="#b5c78c" />
            <stop offset="1" stop-color="#758d5f" />
          </linearGradient>
          <linearGradient id="monitor" x2="1" y2="1">
            <stop stop-color="#344e47" />
            <stop offset="1" stop-color="#182c29" />
          </linearGradient>
          <clipPath id="window-view">
            <path d="M101 151 198 114V225L101 278Z" />
          </clipPath>
          <linearGradient id="window-sky" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={night ? "#19294e" : daydream ? "#bca4e5" : "#a9dce5"} />
            <stop offset="1" stopColor={night ? "#535b88" : daydream ? "#f8d4df" : "#edf3d7"} />
          </linearGradient>
        </defs>
        <ellipse cx="302" cy="442" rx="210" ry="36" fill="#737e6420" />
        <path d="M65 355 298 220 552 363 318 499Z" fill="#a9ad9c" />
        <path d="M65 343 298 208 552 351 318 487Z" fill="url(#floor)" />
        <path d="M65 343V125L298 36V208Z" fill="url(#wall)" />
        <path d="M298 36 552 180V351L298 208Z" fill="#d7dbcb" />
        <path
          d="M65 125 298 36 552 180"
          fill="none"
          stroke="#f9f8ee"
          strokeWidth="7"
        />
        {/* window */} <path d="M93 145 206 102V231L93 294Z" fill="#b0b9a6" />
        <g clipPath="url(#window-view)" role="img" aria-label={
          night ? "Moon and stars above quiet hills" : daydream ? "Pastel clouds and a rainbow in a dreamy sky" : "Sunshine and clouds above green hills"
        }>
          <path d="M101 151 198 114V225L101 278Z" fill="url(#window-sky)" />
          <g transform="matrix(1 -0.45 0 1 101 151)">
            {night ? (
              <>
                <path d="M71 16A16 16 0 1 0 85 40A16 16 0 0 1 71 16Z" fill="#fff0bf" />
                <g fill="#fff6da">
                  <circle cx="14" cy="20" r="1.6" />
                  <circle cx="40" cy="39" r="1.5" />
                  <circle cx="24" cy="62" r="1.3" />
                  <circle cx="83" cy="65" r="1.6" />
                  <path d="M46 9L48 14L53 16L48 18L46 23L44 18L39 16L44 14Z" />
                </g>
              </>
            ) : daydream ? (
              <>
                <path d="M11 79V64A36 36 0 0 1 83 64V79" fill="none" stroke="#f8b7ca" strokeWidth="7" />
                <path d="M18 79V64A29 29 0 0 1 76 64V79" fill="none" stroke="#ffe7b7" strokeWidth="7" />
                <path d="M25 79V64A22 22 0 0 1 69 64V79" fill="none" stroke="#d0e8d7" strokeWidth="7" />
                <path d="M6 76Q-1 64 11 61Q14 47 25 57Q38 55 39 68Q49 78 36 81H8Z M61 88Q52 75 65 72Q70 57 81 68Q95 65 96 79Q108 90 91 93H66Z" fill="#fff1f6" />
                <path d="M27 12L29 18L35 20L29 22L27 28L25 22L19 20L25 18Z M80 11L82 16L87 18L82 20L80 25L78 20L73 18L78 16Z" fill="#fff7dc" />
              </>
            ) : (
              <>
                <circle cx="72" cy="28" r="15" fill="#ffdc8b" />
                <path d="M-6 49Q-8 38 4 37Q8 24 20 34Q34 30 38 43Q49 51 36 55H1Z M57 71Q52 61 63 58Q68 47 78 56Q92 52 96 65Q104 73 91 76H64Z" fill="#fffdf0" opacity=".9" />
              </>
            )}
            <path d="M-5 109Q22 77 49 98Q72 77 103 90V140H-5Z" fill={night ? "#394b66" : daydream ? "#b7afd5" : "#9bb998"} />
            <path d="M-5 121Q26 101 51 113Q79 94 103 112V140H-5Z" fill={night ? "#283d50" : daydream ? "#999fc3" : "#73977c"} />
          </g>
        </g>
        <path
          d="M150 132V251M101 210 198 165"
          stroke="#faf9eb"
          strokeWidth="7"
        />
        <path d="M98 280 202 226 212 234 104 291Z" fill="#f8f7eb" />
        <path
          d="M106 312 205 258 320 322 218 379Z"
          fill={night ? "#bac9ee" : daydream ? "#e7c7f2" : "#fff9da"}
          opacity={night ? ".14" : ".32"}
        />
        {/* art and shelf */}{" "}
        <path d="M413 130 475 165V224L413 188Z" fill="#999e8f" />
        <path d="M419 140 469 168V214L419 185Z" fill="#f6eedb" />
        <path d="M429 179 441 157 459 194Z" fill="#a2ad72" />
        <path d="M325 163 386 198 399 191 339 157Z" fill="#b4a18a" />
        <path d="M325 163V170L386 205V198Z" fill="#928574" />
        <path d="M340 158V129L347 133V162Z" fill="#e9ac83" />
        <path d="M349 164V132L358 137V169Z" fill="#92a590" />
        <path d="M360 170V145L368 150V174Z" fill="#e7d9a5" />
        {/* rug */}{" "}
        <path d="M140 354 293 267 476 372 321 462Z" fill="#ebe9d9" />
        <path
          d="M157 355 293 279 460 372 321 449Z"
          fill="none"
          stroke="#c4c8b5"
          strokeWidth="2"
        />
        {/* desk legs */}{" "}
        <path
          d="M171 263V357L183 364V270ZM405 277V364L417 358V270Z"
          fill="#9b8061"
        />
        {/* The front leg sits directly beneath the tabletop's lowest corner. */}
        <path d="M306 342L313 346V434L306 430Z" fill="#9b8061" />
        <path d="M313 346L320 342V430L313 434Z" fill="#8f7659" />
        {/* desk surface */}{" "}
        <path d="M171 263 291 195 435 276 312 349 171 269Z" fill="#ad9575" />
        <path d="M171 257 291 189 435 270 312 341Z" fill="#d1b895" />
        <path d="M183 256 292 195 422 269 312 333Z" fill="#e1c9a7" />
        {/* screen stand */}{" "}
        <path d="M270 262 293 250 319 265 295 278Z" fill="#6a7567" />
        <path d="M289 249V223L299 228V263L289 257Z" fill="#7f8978" />
        <path
          d="M242 180 335 232V296L242 244Z"
          fill="#222f29"
          transform="translate(0,-37)"
        />
        <path d="M248 150 328 195V248L248 203Z" fill="url(#monitor)" />
        <g className="screen-glow" strokeLinecap="round" strokeWidth="3">
          <path d="M259 171 275 180M280 183 305 197" stroke="#d2ed99" />
          <path d="M259 181 290 198M266 194 317 223" stroke="#91ada2" />
          <path d="M266 204 291 218M296 222 311 230" stroke="#d2ed99" />
        </g>
        {/* keyboard */}{" "}
        <path d="M240 272 266 257 311 283 286 298Z" fill="#e8e8d8" />
        <path
          d="M248 272 268 263M258 278 278 269M268 284 288 275M278 290 298 281"
          stroke="#b4b9a9"
          strokeWidth="3"
        />
        <ellipse cx="329" cy="298" rx="9" ry="5" fill="#f1f0e5" />
        {/* coffee */}{" "}
        <ellipse cx="380" cy="266" rx="12" ry="6" fill="#b39c7d" />
        <path d="M371 249V263Q380 270 388 263V249" fill="#f6f0d9" />
        <ellipse cx="380" cy="249" rx="8.5" ry="4" fill="#786249" />
        <path
          d="M389 251Q401 252 390 260"
          fill="none"
          stroke="#f6f0d9"
          strokeWidth="4"
        />
        {/* An upholstered chair at the end of the avatar's evening walk. */}
        <g transform="translate(38 -8)" aria-label="Studio chair">
          <ellipse cx="370" cy="410" rx="41" ry="11" fill="#52604320" />
          <path
            d="M340 373V405M396 373V405"
            stroke="#6b7260"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M332 310Q332 292 350 292H389Q407 292 407 310V371H332Z"
            fill="#6d8069"
          />
          <path
            d="M340 310Q340 301 351 301H388Q398 301 398 310V361H340Z"
            fill="#91a181"
          />
          <path d="M332 363H407V376Q370 388 332 376Z" fill="#687e60" />
          <ellipse cx="370" cy="365" rx="38" ry="10" fill="#a2b18e" />
        </g>
        {/* Articulated walking avatar: route, facing, body, and limbs have independent transforms. */}
        <g
          className={`avatar ${waving && !night && !daydream ? "waving" : ""} ${phase === "sleeping" ? "sleeping" : ""}`}
          role="button"
          tabIndex={0}
          aria-label={
            daydream
              ? "Avatar daydreaming in the chair"
              : night
                ? "Avatar resting for the night"
                : waving
                  ? "Hello! Click to wave again"
                  : "Click me to say hello"
          }
          id="avatar"
          onClick={wave}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              wave();
            }
          }}
        >
          <ellipse
            id="walker-shadow"
            cx="373"
            cy="409"
            rx="38"
            ry="10"
            fill="#52604324"
          />
          <g id="walker-facing">
            <g id="walker-body">
              <g id="leg-left">
                <path
                  d="M346 348 345 390Q343 401 356 402L366 398 366 348Z"
                  fill="#444d43"
                />
                <path
                  d="M344 389Q342 394 338 399Q333 408 354 408L367 402 364 392Z"
                  fill="#f5f2df"
                />
              </g>
              <g id="leg-right">
                <path
                  d="M374 348 379 393Q385 406 397 400L399 393 394 348Z"
                  fill="#333e35"
                />
                <path
                  d="M380 390Q378 399 391 407Q408 411 410 403L396 390Z"
                  fill="#f5f2df"
                />
              </g>
              <g id="seated-legs" style={{ opacity: 0 }}>
                <path
                  d="M346 349L353 371L380 376L382 393"
                  fill="none"
                  stroke="#444d43"
                  strokeWidth="18"
                  strokeLinejoin="round"
                />
                <path
                  d="M379 350L387 368L406 373L409 391"
                  fill="none"
                  stroke="#333e35"
                  strokeWidth="18"
                  strokeLinejoin="round"
                />
                <path
                  d="M376 389Q389 386 398 397Q400 404 381 404L375 399Z"
                  fill="#f5f2df"
                />
                <path
                  d="M403 387Q415 385 426 396Q429 403 411 403L403 399Z"
                  fill="#f5f2df"
                />
              </g>

              <path
                d="M336 302Q340 285 364 282Q393 282 400 302L397 359Q373 377 338 357Z"
                fill="url(#shirt)"
              />
              <g id="arm-left">
                <path
                  d="M340 303Q322 309 318 331Q318 343 330 343L346 318Z"
                  fill="#9bad79"
                />
                <ellipse cx="326" cy="341" rx="10" ry="11" fill="#dcb28d" />
              </g>
              <g id="arm-right">
                <path
                  d="M390 296Q409 300 412 326L402 339Q393 330 388 310Z"
                  fill="#a0b782"
                />
                <ellipse cx="407" cy="340" rx="9" ry="11" fill="#e7bd98" />
              </g>
              <g className="arm">
                <path
                  d="M389 294Q402 290 412 273L423 282Q417 316 398 320Z"
                  fill="#a0b782"
                />
                <path
                  d="M413 280Q407 270 410 257Q412 253 415 258L417 266 419 248Q422 244 424 250L424 265 430 253Q434 250 434 255L431 272Q429 283 422 286Z"
                  fill="#e7bd98"
                />
              </g>
              <g id="walker-head">
                <path d="M357 276V291Q369 301 380 288V273" fill="#ce9f7a" />
                <ellipse cx="367" cy="254" rx="29" ry="34" fill="#e6ba92" />
                <ellipse cx="339" cy="258" rx="6" ry="9" fill="#dcad84" />
                <path
                  d="M340 253Q327 227 344 215Q360 201 382 217Q401 220 395 248L385 241 383 230Q370 241 349 233L347 252Z"
                  fill="#3c382e"
                />
                <path
                  d="M338 230Q332 216 345 213Q349 201 363 210Q386 203 393 221Z"
                  fill="#3c382e"
                />
                <g id="awake-eyes">
                  <ellipse cx="359" cy="255" rx="2.5" ry="3.5" fill="#3d382f" />
                  <ellipse cx="380" cy="255" rx="2.5" ry="3.5" fill="#3d382f" />
                </g>
                <g
                  id="sleep-eyes"
                  style={{ opacity: 0 }}
                  fill="none"
                  stroke="#3d382f"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M355 256Q359 260 363 256M376 256Q380 260 384 256" />
                </g>
                {/* Glasses follow the head through walking, turning, and waving. */}
                <g
                  fill="none"
                  stroke="#353d35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="349"
                    y="247"
                    width="18"
                    height="17"
                    rx="6"
                    fill="#eef5e3"
                    fillOpacity=".12"
                  />
                  <rect
                    x="372"
                    y="247"
                    width="18"
                    height="17"
                    rx="6"
                    fill="#eef5e3"
                    fillOpacity=".12"
                  />
                  <path d="M367 253Q369.5 251 372 253M349 251 341 248M390 251 394 248" />
                </g>
                <path
                  d="M364 270Q370 275 377 268"
                  fill="none"
                  stroke="#8a6047"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="352" cy="267" r="5" fill="#d9987c" opacity=".45" />
              </g>
            </g>
          </g>
          {/* Follow the walking position, outside the mirrored facing group. */}
          <g className="avatar-bubble" aria-hidden="true">
            <path d="M331 161H411Q421 161 421 171V185Q421 195 411 195H381L371 205L366 195H331Q321 195 321 185V171Q321 161 331 161Z" />
            {daydream ? (
              <g className="daydream-icon">
                <path d="M358 181C351 181 351 172 358 171C358 164 369 162 373 168C380 164 388 169 386 175C392 180 386 186 380 184H361" />
                <circle cx="358" cy="188" r="2.5" />
                <circle cx="353" cy="192" r="1.5" />
                <path d="M391 165V171M388 168H394" />
              </g>
            ) : (
              <text
                x="371"
                y="179"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {phase === "sleeping"
                  ? "Zzz…"
                  : night
                    ? "Good night"
                    : phase === "waking"
                      ? "Morning!"
                      : waving
                        ? "Hello!"
                        : "Click me"}
              </text>
            )}
          </g>
        </g>
        {/* floor plant */}{" "}
        <path d="M477 333 484 373Q499 384 513 371L519 333Z" fill="#c69376" />
        <ellipse cx="498" cy="333" rx="21" ry="10" fill="#d6a98d" />
        <path
          d="M497 333V277M498 314 475 288M499 304 519 281"
          stroke="#6a7e51"
          strokeWidth="4"
        />
        <path
          d="M497 294Q465 280 483 257Q503 264 497 294M499 314Q517 277 534 285Q536 309 499 314M488 308Q453 312 456 287Q479 281 488 308M497 278Q489 246 509 242Q521 262 497 278"
          fill="#809867"
        />
        {/* small notebook */}{" "}
        <path d="M134 355 156 343 184 359 162 373Z" fill="#a5b28b" />
        <path d="M134 351 156 339 184 355 162 369Z" fill="#b9c99c" />
        <path d="M142 347 170 363" stroke="#7d9466" strokeWidth="2" />
        <g className="spark" fill="#93a56c">
          <path d="m455 95 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" />
          <path d="m227 72 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />
        </g>
      </svg>
    </div>
  );
}
