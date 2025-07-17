import type { Knob as KnobData } from "@types"
import {
  type Component,
  type JSX,
  Suspense,
  createResource,
  splitProps,
} from "solid-js"
import { KnobStateContainer } from "./knob-state-container"

interface KnobProps extends KnobData {
  pedalSlug: string
}

const knobComponentImports = {
  arrow: () => import("./arrow-knob").then(m => m.ArrowKnob),
  bakelit: () => import("./bakelit-knob").then(m => m.BakelitKnob),
  brutalist: () => import("./brutalist-knob").then(m => m.BrutalistKnob),
  cba: () => import("./cba-knob").then(m => m.CbaKnob),
  chicken: () => import("./chicken-head-knob").then(m => m.ChickenHeadKnob),
  davies: () => import("./davies-knob").then(m => m.DaviesKnob),
  emptyhead: () => import("./empty-head").then(m => m.EmptyHeadKnob),
  emptyheadlarge: () =>
    import("./empty-head-large").then(m => m.EmptyHeadLargeKnob),
  fairfield: () => import("./fairfield-knob").then(m => m.FairfieldKnob),
  fanclub: () => import("./fanclub-knob").then(m => m.FanclubKnob),
  flb: () => import("./flb-knob").then(m => m.FlbKnob),
  gojira: () => import("./gojira-knob").then(m => m.GojiraKnob),
  jhs: () => import("./jhs-knob").then(m => m.JhsKnob),
  joystick: () => import("./joystick").then(m => m.Joystick),
  knurled: () => import("./knurled-knob").then(m => m.KnurledKnob),
  lichtlaerm: () =>
    import("./lichtlaerm-audio-knob").then(m => m.LichtlaermAudioKnob),
  muff: () => import("./muff-knob").then(m => m.MuffKnob),
  obne: () => import("./obne-knob").then(m => m.ObneKnob),
  offset: () => import("./offset-knob").then(m => m.OffsetKnob),
  orange: () => import("./orange-knob").then(m => m.OrangeKnob),
  roundchicken: () =>
    import("./round-chicken-head-knob").then(m => m.RoundChickenHeadKnob),
  simple: () => import("./simple-knob").then(m => m.SimpleKnob),
  simpledot: () => import("./simple-dot-knob").then(m => m.SimpleDotKnob),
  walrus: () => import("./walrus-audio-knob").then(m => m.WalrusAudioKnob),
} as const

type KnobComponentType = keyof typeof knobComponentImports

// Create individual render functions for each knob type to avoid union type issues
const renderArrowKnob = (
  Component: Component<{ size: number }>,
  size: number,
) => <Component size={size} />

const renderJoystickKnob = (
  Component: Component<{ id: string; size: number }>,
  id: string,
  size: number,
) => <Component id={id} size={size} />

const renderColoredKnob = (
  Component: Component<Pick<KnobData, "colors" | "size">>,
  props: Pick<KnobData, "colors" | "size">,
) => <Component {...props} />

const DynamicKnobComponent: Component<{
  type: KnobComponentType
  sizeAndColorProps: Pick<KnobData, "colors" | "size">
  id: string
  size: number
}> = props => {
  const [knobElement] = createResource(
    () => props.type,
    async (type: KnobComponentType): Promise<JSX.Element> => {
      const KnobComponent = await knobComponentImports[type]()

      // Use specific render functions to avoid union type issues
      switch (type) {
        case "arrow":
        case "offset":
        case "muff":
        case "fanclub":
          return renderArrowKnob(
            KnobComponent as Component<{ size: number }>,
            props.size,
          )
        case "joystick":
          return renderJoystickKnob(
            KnobComponent as Component<{ id: string; size: number }>,
            props.id,
            props.size,
          )
        default:
          return renderColoredKnob(
            KnobComponent as Component<Pick<KnobData, "colors" | "size">>,
            props.sizeAndColorProps,
          )
      }
    },
  )

  return (
    <Suspense
      fallback={
        <div
          class="animate-pulse rounded-full bg-gray-300"
          style={{ width: "40px", height: "40px" }}
        />
      }
    >
      {knobElement()}
    </Suspense>
  )
}

export const Knob: Component<KnobProps> = props => {
  const [stateContainerProps, sizeAndColorProps, _] = splitProps(
    props,
    ["id", "isRotary", "rotaryAngles", "size", "pedalSlug", "highlightColor"],
    ["colors", "size"],
  )

  return (
    <KnobStateContainer {...stateContainerProps}>
      <DynamicKnobComponent
        type={props.type as KnobComponentType}
        sizeAndColorProps={sizeAndColorProps}
        id={props.id!}
        size={props.size!}
      />
    </KnobStateContainer>
  )
}
