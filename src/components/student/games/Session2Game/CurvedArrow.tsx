export const CurvedArrow = () => (
  <div className="absolute -top-12 left-[30px] w-[120px]">
    <svg className="w-full h-12" viewBox="0 0 120 48">
      <path
        d="M10 48 C10 24, 110 24, 110 48"
        fill="none"
        stroke="rgb(249 115 22)"
        strokeWidth="2"
      />
      <text
        x="50"
        y="15"
        className="text-sm"
        textAnchor="middle"
        fill="currentColor"
      >
        + 2
      </text>
      <path
        d="M110 48 L105 42 L115 42 Z"
        fill="rgb(249 115 22)"
      />
    </svg>
  </div>
);