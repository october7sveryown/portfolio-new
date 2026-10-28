// Toronto skyline drawn as loose pen strokes. Each shape is a single subpath
// so the draw-on animation (stroke-dashoffset over pathLength=1) traces it cleanly.
const STROKES = [
  // Ground line
  "M0 290 H1440",

  // West end low-rise
  "M10 290 V245 H45 V290",
  "M50 290 V225 H80 V290",
  "M85 290 V255 H120 V290",
  "M125 290 V215 L150 205 V290",
  "M155 290 V240 H200 V290",
  "M205 290 V200 H235 V290",
  "M240 290 V230 H280 V290",
  "M285 290 V250 H310 V290",

  // Rogers Centre
  "M318 290 V281 H472 V290",
  "M320 281 Q395 205 470 281",
  "M345 266 Q395 228 445 266",
  "M395 243 V281",
  "M360 258 L372 281",
  "M430 258 L418 281",

  // CN Tower
  "M527 290 L536 140",
  "M553 290 L544 140",
  "M540 290 V140",
  "M518 124 H562 V132 H518 Z",
  "M520 132 L524 140 H556 L560 132",
  "M524 124 L530 116 H550 L556 124",
  "M537 116 V78",
  "M543 116 V78",
  "M534 78 H546 V70 H534 Z",
  "M538 70 L539.5 12",
  "M542 70 L540.5 12",
  "M540 12 V2",

  // Financial District
  "M590 290 V195 H625 V290",
  "M630 290 V150 H668 V290",
  "M630 180 H668",
  "M630 210 H668",
  "M630 240 H668",
  "M649 150 V290",
  "M680 115 V108 H706 V115",
  "M674 290 V115 H712 V290",
  "M683 115 V290",
  "M693 115 V290",
  "M703 115 V290",
  "M718 290 V170 H748 V290",
  "M754 290 V145 L764 132 H788 L798 145 V290",
  "M776 132 V290",
  "M804 290 V180 H830 V290",
  "M836 290 V112 H864 V290",
  "M840 112 V100 H860 V112",
  "M850 100 V78",
  "M870 290 V165 L905 150 V290",
  "M915 140 V132 H938 V140",
  "M911 290 V140 H942 V290",
  "M948 290 V188 L960 182 L972 188 L984 182 V290",
  "M990 290 V205 H1022 V290",
  "M1028 290 V225 H1058 V290",

  // Pen hatching for shade
  "M594 286 L621 259",
  "M594 270 L621 243",
  "M594 254 L621 227",
  "M722 286 L744 264",
  "M722 270 L744 248",
  "M722 254 L744 232",
  "M994 286 L1018 262",
  "M994 270 L1018 246",

  // East side condos and a construction crane
  "M1064 290 V215 H1095 V290",
  "M1100 290 V240 H1135 V290",
  "M1140 290 V190 H1175 V290",
  "M1157 290 V135",
  "M1120 160 H1240",
  "M1157 135 L1240 160",
  "M1157 135 L1120 160",
  "M1122 160 V168 H1134 V160",
  "M1222 160 V196",
  "M1180 290 V230 H1215 V290",
  "M1220 290 V250 H1260 V290",
  "M1265 290 V205 H1292 V290",
  "M1297 290 V245 H1340 V290",
  "M1345 290 V225 H1375 V290",
  "M1380 290 V255 H1430 V290",

  // Lake Ontario
  "M40 302 h45",
  "M150 307 h70",
  "M300 301 h40",
  "M533 300 h14",
  "M535 307 h10",
  "M620 303 h55",
  "M760 309 h80",
  "M930 302 h40",
  "M1080 307 h65",
  "M1250 301 h50",
  "M1360 308 h40",
];

const STAGGER_MS = 18;

function Strokes({ filter }: { filter: string }) {
  return (
    <g filter={`url(#${filter})`}>
      {STROKES.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          className="skyline-stroke"
          style={{ animationDelay: `${i * STAGGER_MS}ms` }}
        />
      ))}
    </g>
  );
}

export function TorontoSkyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[220px] w-full select-none text-foreground opacity-[0.22] sm:h-[300px] sm:opacity-[0.13] dark:opacity-[0.28] sm:dark:opacity-[0.18]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
    >
      <defs>
        {/* Slight wobble so lines look hand-drawn, not ruled */}
        <filter id="skyline-pen-a">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={3} />
        </filter>
        <filter id="skyline-pen-b">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={11} />
          <feDisplacementMap in="SourceGraphic" scale={3.5} />
        </filter>
      </defs>
      <Strokes filter="skyline-pen-a" />
      {/* Faint second pass, like retracing a line with the pen */}
      <g transform="translate(1.2 0.8)" opacity={0.45} strokeWidth={0.9}>
        <Strokes filter="skyline-pen-b" />
      </g>
    </svg>
  );
}
