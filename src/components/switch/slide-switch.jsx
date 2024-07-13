const AnimatedCircle = styled.circle`
  transition: transform 0.1s ease-in;
  transform: translateX(${(props) => (props.state === 1 ? 10 : 50)}%);
`

const StyledAbsoluteSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`

export const SlideSwitch = ({
  size = 64,
  state = 1,
  orientation = "horizontal",
}) => (
  <StyledAbsoluteSvg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 64 64"
  >
    <defs>
      <radialGradient id="shinyGradient">
        <stop offset="10%" stopColor="aliceblue" />
        <stop offset="80%" stopColor="darkslategray" />
        <stop offset="95%" stopColor="#333" />
      </radialGradient>
    </defs>
    <g
      fill="none"
      transform={`rotate(${orientation === "vertical" ? -90 : 0} 32 32)`}
    >
      <rect width={64} height={24} fill="black" x="0" y="20" rx="12" ry="12" />
      <AnimatedCircle
        state={state}
        cx="12"
        cy="32"
        r="12"
        fill="url('#shinyGradient')"
      />
    </g>
  </StyledAbsoluteSvg>
)
