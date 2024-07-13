const StyledMomentaryAnimation = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 10px solid var(--secondaryHighlight);
  box-sizing: border-box;
  z-index: 1;
  top: 0;
  left: 0;
  transform: scale(2);
  animation: 600ms ease-out infinite momentaryAnimation;
  display: ${({ $show }) => ($show ? "block" : "none")};
  pointer-events: none;

  @keyframes momentaryAnimation {
    0% {
      transform: scale(1);
      border-width: 8px;
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(2);
      border-width: 0px;
      opacity: 0;
    }
  }
`

export const StompSwitch = ({
  onClick = () => {},
  id = "",
  size = 64,
  isDisabled = false,
  isDark = false,
  isMomentary = false,
  isOn,
  ...rest
}) => {
  const [isDown, setIsDown] = useState(false)

  useEffect(() => {
    if (isMomentary) {
      setIsDown(isOn)
    }
  }, [isOn, isMomentary])

  return (
    <button
      type="button"
      onClick={() => {
        if (!isDisabled) onClick()
      }}
      id={id}
      style={{
        margin: 0,
        cursor: isDisabled ? "not-allowed" : "pointer",
        position: "relative",
      }}
      onMouseDown={() => {
        if (!isDisabled && !isMomentary) setIsDown(true)
      }}
      onTouchStart={() => {
        if (!isDisabled && !isMomentary) setIsDown(true)
      }}
      onMouseUp={() => {
        if (!isDisabled && !isMomentary) setIsDown(false)
      }}
      onTouchEnd={() => {
        if (!isDisabled && !isMomentary) setIsDown(false)
      }}
      {...rest}
    >
      {isMomentary && <StyledMomentaryAnimation $size={size} $show={isOn} />}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 52 52"
        opacity={isDisabled ? 0 : 1}
        style={{
          userSelect: "none",
          pointerEvents: "none",
          WebkitUserSelect: "none",
        }}
      >
        <defs>
          <radialGradient id="gradient1">
            <stop offset="0%" stopColor={isDark ? "#666" : "aliceblue"} />
            <stop offset="70%" stopColor={isDark ? "#666" : "aliceblue"} />
            <stop offset="95%" stopColor={isDark ? "#222" : "lightslategray"} />
          </radialGradient>
          <radialGradient id="gradient2">
            <stop offset="0%" stopColor={isDark ? "#666" : "aliceblue"} />
            <stop offset="80%" stopColor={isDark ? "#666" : "aliceblue"} />
            <stop offset="100%" stopColor={isDark ? "#222" : "#a3bbd2"} />
          </radialGradient>
        </defs>
        <g fill="none">
          <circle cx="26" cy="26" r="26" fill="url(#gradient1)" />
          <polygon
            fill="url(#gradient1)"
            stroke={isDark ? "#555" : "slategray"}
            points="32 8 52.785 20 52.785 44 32 56 11.215 44 11.215 20"
            transform="rotate(90 32 32) translate(-6, 6)"
          />
          <circle
            cx="26"
            cy={`${isDown ? 27 : 26}`}
            r={`${isDown ? 15 : 16}`}
            fill={isDark ? "black" : "slategray"}
          />
          <circle
            cx="26"
            cy={`${isDown ? 26 : 24}`}
            r={`${isDown ? 15 : 16}`}
            fill="url(#gradient2)"
          />
        </g>
      </svg>
    </button>
  )
}
