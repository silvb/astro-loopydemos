const AnimatedHandle = styled.g`
  transition: transform 0.1s ease-in;
  transform: translateX(${(props) => ({ 1: 0, 2: 24, 3: 48 })[props.$state]}%);
`

export const ThreewaySwitch = ({
  size = 64,
  state = 1,
  orientation = "horizontal",
  colors = { enclosure: "#312e2f" },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
  >
    <g
      fill="none"
      transform={`rotate(${orientation === "vertical" ? -90 : 0} 32 32)`}
    >
      <rect
        width={64}
        height={32}
        fill={colors?.enclosure || "black"}
        x="0"
        y="16"
        rx="2"
        ry="2"
      />
      <rect
        width={56}
        height={20}
        fill="black"
        x="4"
        y="22"
        rx="2"
        ry="2"
        strokeWidth={1}
        stroke="#3c3c40"
      />
      <AnimatedHandle $state={state} fill="none">
        <rect
          x="0"
          y="16"
          fill="#44484f"
          width={32}
          height="32"
          rx="4"
          ry="4"
          strokeWidth={1}
          stroke="#8c8b9d"
        />
        <line
          x1={8}
          x2={8}
          y1={20}
          y2={44}
          strokeWidth={6}
          stroke="#000"
          strokeLinecap="round"
        />
        <line
          x1={16}
          x2={16}
          y1={20}
          y2={44}
          strokeWidth={6}
          stroke="#000"
          strokeLinecap="round"
        />
        <line
          x1={24}
          x2={24}
          y1={20}
          y2={44}
          strokeWidth={6}
          stroke="#000"
          strokeLinecap="round"
        />
      </AnimatedHandle>
    </g>
  </svg>
)
