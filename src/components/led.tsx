import { demoState } from "@components/demo-widget/demo-state-store"
import type { Led as LedType } from "@types"
import { cva } from "class-variance-authority"
import { type Component, Switch, Match, Show, mergeProps } from "solid-js"

const MOOD_COLORS = {
  on: "greenyellow",
  off: "#f73333",
}

const DEFAULT_COLORS = {
  on: "#f73333",
  off: "#545454aa",
}

interface LedProps extends LedType {
  pedalSlug: string
}

const containerClass = cva("", {
  variants: {
    isBlinking: { true: "blinking-led", false: "" },
    isMood: { true: "mood-blink", false: "" },
  },
})

export const Led: Component<LedProps> = (props) => {
  const { pedalsOn, getSetting, secondaryCircuitsOn } = demoState

  const isMood = props.type === "mood"

  const mergedProps = mergeProps(
    {
      colors: isMood ? MOOD_COLORS : { ...DEFAULT_COLORS, ...props.colors },
      type: "round",
    },
    props
  )

  const mergedDynamicColors = () => {
    if (!props.dependency) return mergedProps.colors
    const dependencyColors = props.dependency?.values?.find(
      ({ sourceValue }) =>
        sourceValue === getSetting(props.dependency?.source, props.pedalSlug)
    )?.colors

    return { ...mergedProps.colors, ...dependencyColors }
  }

  const setting = () => getSetting(props.id, props.pedalSlug, props.dependency)

  const isOn = () =>
    props.id === "on_led" || props.isOnIndicator
      ? pedalsOn().includes(props.pedalSlug) && setting() !== false
      : Boolean(setting()) ||
        (props.secondaryCircuitId &&
          secondaryCircuitsOn().includes(props.secondaryCircuitId)) ||
        (props.isBlinking && !props.offOverride)

  const blinkTime = () => (setting() || props.defaultTime) ?? 0

  const uniqueOnLedId =
    props.id === "on_led" ? `${props.id}-${props.pedalSlug}` : props.id

  return (
    <div
      class={containerClass({
        isBlinking: Boolean(props.isBlinking && isOn()),
        isMood: isMood,
      })}
      style={{
        "--blinkTime": `${blinkTime() ?? 0}ms`,
        "--blinkOffset": `${props.blinkOffset ?? 0}ms`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size}
        height={props.size}
        viewBox="0 0 48 48"
        id={uniqueOnLedId}
        class="z-10"
      >
        <Show
          when={isMood}
          fallback={
            <>
              <defs>
                <radialGradient id={`${uniqueOnLedId}-on-gradient`}>
                  <stop offset="5%" stop-color="white" />
                  <stop offset="90%" stop-color={mergedDynamicColors().on} />
                </radialGradient>
                <radialGradient id={`${uniqueOnLedId}-off-gradient`}>
                  <stop offset="5%" stop-color="white" />
                  <stop
                    offset="90%"
                    stop-color={mergedDynamicColors().off || "#e1e1e1"}
                  />
                </radialGradient>
              </defs>
              <g fill="none">
                <Show
                  when={isOn()}
                  fallback={
                    <Switch>
                      <Match when={mergedProps.type === "round"}>
                        <circle
                          cx="24"
                          cy="24"
                          r="8"
                          fill={mergedDynamicColors().off}
                        />
                      </Match>
                      <Match when={mergedProps.type === "square"}>
                        <rect
                          x="14"
                          y="14"
                          width="20"
                          height="20"
                          fill-opacity="1"
                          rx={4}
                          ry={4}
                          fill={`url('#${uniqueOnLedId}-off-gradient')`}
                        />
                      </Match>
                    </Switch>
                  }
                >
                  <Switch>
                    <Match when={mergedProps.type === "round"}>
                      <circle
                        cx="24"
                        cy="24"
                        r="24"
                        fill={mergedDynamicColors().on}
                        fill-opacity=".4"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="16"
                        fill={mergedDynamicColors().on}
                        fill-opacity=".2"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="8"
                        fill={`url('#${uniqueOnLedId}-on-gradient')`}
                        fill-opacity=".8"
                      />
                    </Match>
                    <Match when={mergedProps.type === "square"}>
                      <circle
                        cx="24"
                        cy="24"
                        r="24"
                        fill={mergedDynamicColors().on}
                        fill-opacity=".4"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="16"
                        fill={mergedDynamicColors().on}
                        fill-opacity=".2"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="20"
                        height="20"
                        fill-opacity="1"
                        rx={4}
                        ry={4}
                        fill={`url('#${uniqueOnLedId}-on-gradient')`}
                      />
                    </Match>
                  </Switch>
                </Show>
              </g>
            </>
          }
        >
          <defs>
            <radialGradient id={`${uniqueOnLedId}-mood-on-gradient`}>
              <stop offset="5%" stop-color="white" />
              <stop
                offset="90%"
                stop-color={
                  isOn() ? mergedDynamicColors().on : mergedDynamicColors().off
                }
              />
            </radialGradient>
          </defs>
          <g fill="none">
            <g fill="none">
              <circle
                cx="24"
                cy="24"
                r="16"
                fill={
                  isOn() ? mergedDynamicColors().on : mergedDynamicColors().off
                }
                fill-opacity=".2"
              />
              <circle
                cx="24"
                cy="24"
                r="24"
                fill={
                  isOn() ? mergedDynamicColors().on : mergedDynamicColors().off
                }
                fill-opacity=".4"
              />
              <circle
                cx="24"
                cy="24"
                r="8"
                fill={`url('#${uniqueOnLedId}-mood-on-gradient')`}
                fill-opacity=".8"
              />
            </g>
          </g>
        </Show>
      </svg>
    </div>
  )
}