import type { CBASwitchSate } from "@types"
import { For, mergeProps, type Component } from "solid-js"

interface CBADipSwitchesProps {
  state: CBASwitchSate
  scale?: number
}

const dipRowClass =
  "flex h-full shrink-0 grow basis-auto items-center justify-between px-[3px] py-0"

const lineArray = (num: number) => Array.from(Array(num).keys())

const DIMENSIONS = {
  width: 131,
  height: 30,
}

export const CBADipSwitches: Component<CBADipSwitchesProps> = (props) => {
  console.log({ props })
  const finalProps = mergeProps(
    {
      state: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      scale: 1,
    },
    props
  )

  console.log({ finalProps })

  const dipInlineStyle = {
    "--width": 6 * finalProps.scale + "px",
    "--height": 12 * finalProps.scale + "px",
    "--nippleWidth": 5 * finalProps.scale + "px",
    "--nippleHeight": 6 * finalProps.scale + "px",
  }
  return (
    <div
      class="box-border flex bg-[#aa232f] px-0.5 py-0"
      style={{
        width: DIMENSIONS.width * finalProps.scale + "px",
        height: DIMENSIONS.height * finalProps.scale + "px",
      }}
    >
      <div class={dipRowClass}>
        <For each={lineArray(8)}>
          {(i) => (
            <div
              class={
                finalProps.state[i]
                  ? "cba-dip-switch flipped"
                  : "cba-dip-switch"
              }
              style={{
                ...dipInlineStyle,
              }}
            />
          )}
        </For>
      </div>
      <div class="h-full w-[1px] bg-black" />
      <div class={dipRowClass}>
        <For each={lineArray(8)}>
          {(i) => (
            <div
              class={
                finalProps.state[i + 8]
                  ? "cba-dip-switch flipped"
                  : "cba-dip-switch"
              }
              style={{
                ...dipInlineStyle,
              }}
            />
          )}
        </For>
      </div>
    </div>
  )
}
