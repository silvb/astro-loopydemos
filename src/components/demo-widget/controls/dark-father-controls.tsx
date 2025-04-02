import type { Component } from "solid-js"
import { useDemoState } from "../demo-state-store"
import { AbsolutePosition } from "../pedal/absolute-position"

const NAME = "vvco-pedals-dark-father-preamp"

interface PushButtonProps {
  id: string
  color: string
  width: number
  height: number
}

const PushButton: Component<PushButtonProps> = props => {
  const { getSetting } = useDemoState()

  const isOn = () => Boolean(getSetting(NAME, props.id))

  return (
    <div
      class="h-[var(--height)] w-[var(--width)] bg-[var(--color)] transition-colors"
      classList={{
        "bg-gradient-radial from-[mintcream] to-70% to-[var(--color)]": isOn(),
        "bg-[var(--color)] brightness-50": !isOn(),
      }}
      style={{
        "--color": props.color,
        "--width": `${props.width}px`,
        "--height": `${props.height}px`,
      }}
    />
  )
}

const BigFader: Component<{ id: string }> = props => {
  const { getSetting } = useDemoState()
  return (
    <div class="flex h-[242px] w-[25px] content-center bg-[#0d0f0a]">
      <div class="mx-auto h-full w-[6px] rounded-sm border border-[gray]" />
      <div
        class="absolute bottom-[-18px] z-10 h-9 w-full transition-transform"
        style={{
          transform: `translateY(${(getSetting(NAME, props.id) as number) * -2.42}px)`,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={36}
          viewBox="0 0 25 36"
        >
          <title>Fader Handle</title>
          <g fill="none">
            <rect
              stroke="gray"
              x={1}
              y={1}
              fill="#111"
              width={23}
              height={34}
              rx={4}
              ry={4}
            />
            <line y1={6} y2={6} x1={2} x2={23} stroke="#333" stroke-width={2} />
            <line y1={9} y2={9} x1={2} x2={23} stroke="#333" stroke-width={2} />
            <line
              y1={12}
              y2={12}
              x1={2}
              x2={23}
              stroke="#333"
              stroke-width={2}
            />
            <line
              y1={18}
              y2={18}
              x1={3}
              x2={22}
              stroke="lightgray"
              stroke-width={2}
              stroke-linecap="round"
            />
            <line
              y1={24}
              y2={24}
              x1={2}
              x2={23}
              stroke="#333"
              stroke-width={2}
            />
            <line
              y1={27}
              y2={27}
              x1={2}
              x2={23}
              stroke="#333"
              stroke-width={2}
            />
            <line
              y1={30}
              y2={30}
              x1={2}
              x2={23}
              stroke="#333"
              stroke-width={2}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}

export const DarkFatherControls: Component = () => {
  const { getSetting, pedalsOn } = useDemoState()

  return (
    <>
      <AbsolutePosition id="force" left={184} top={113}>
        <PushButton id="force" color="#0063ee" width={29} height={30} />
      </AbsolutePosition>
      <AbsolutePosition id="eq" left={184} top={154}>
        <PushButton id="eq" color="#dd0001" width={29} height={30} />
      </AbsolutePosition>
      <AbsolutePosition id="pre" left={76} top={222}>
        <PushButton id="pre" color="#62abbe" width={29} height={41} />
      </AbsolutePosition>
      <AbsolutePosition id="light" left={116} top={222}>
        <PushButton id="light" color="#62abbe" width={29} height={41} />
      </AbsolutePosition>
      <AbsolutePosition id="dark" left={155} top={222}>
        <PushButton id="dark" color="#62abbe" width={29} height={41} />
      </AbsolutePosition>
      <AbsolutePosition id="lofi" left={194} top={222}>
        <PushButton id="lofi" color="#dd0001" width={29} height={41} />
      </AbsolutePosition>
      {/* Big Faders */}
      <AbsolutePosition id="master" left={45} top={85}>
        <BigFader id="master" />
      </AbsolutePosition>
      <AbsolutePosition id="saber" left={230} top={85}>
        <BigFader id="saber" />
      </AbsolutePosition>
      <AbsolutePosition id="eq-section" left={86} top={101}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={70}
          height={100}
          viewBox="0 0 70 100"
          id="eq-section-svg"
        >
          <title>EQ Section</title>
          <defs>
            <radialGradient id="dark-father-eq-section-on-gradient">
              <stop offset="5%" stop-color="mintcream" />
              <stop offset="90%" stop-color="#dd0001" />
            </radialGradient>
          </defs>
          <g fill="none">
            <rect
              x={8}
              y={12}
              width={53}
              height={6}
              stroke="gray"
              rx={2}
              ry={2}
              fill="#0d0f0a"
            />
            <rect
              x={8}
              y={46}
              width={53}
              height={6}
              stroke="gray"
              rx={2}
              ry={2}
              fill="#0d0f0a"
            />
            <rect
              x={8}
              y={79}
              width={53}
              height={6}
              stroke="gray"
              rx={2}
              ry={2}
              fill="#0d0f0a"
            />
            <g
              fill="none"
              class="transition-transform"
              style={{
                transform: `translateX(${(getSetting(NAME, "eq_i") as number) * 0.4}px)`,
              }}
            >
              <rect x={9} y={13} width={12} height={4} fill="#333" />
              <rect
                x={11}
                y={13}
                width={8}
                height={4}
                fill={
                  pedalsOn().includes(NAME)
                    ? `url("#dark-father-eq-section-on-gradient")`
                    : "#6F0001"
                }
              />
            </g>
            <g
              fill="none"
              class="transition-transform"
              style={{
                transform: `translateX(${(getSetting(NAME, "eq_ii") as number) * 0.4}px)`,
              }}
            >
              <rect x={9} y={47} width={12} height={4} fill="#333" />
              <rect
                x={11}
                y={47}
                width={8}
                height={4}
                fill={
                  pedalsOn().includes(NAME)
                    ? `url("#dark-father-eq-section-on-gradient")`
                    : "#6F0001"
                }
              />
            </g>
            <g
              fill="none"
              class="transition-transform"
              style={{
                transform: `translateX(${(getSetting(NAME, "eq_iii") as number) * 0.4}px)`,
              }}
            >
              <rect x={9} y={80} width={12} height={4} fill="#333" />
              <rect
                x={11}
                y={80}
                width={8}
                height={4}
                fill={
                  pedalsOn().includes(NAME)
                    ? `url("#dark-father-eq-section-on-gradient")`
                    : "#6F0001"
                }
              />
            </g>
          </g>
        </svg>
      </AbsolutePosition>
    </>
  )
}
