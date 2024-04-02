import { forwardRef } from "react"
import type { GridComponents } from "react-virtuoso"

export const GridView: GridComponents["List"] = forwardRef(
  ({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15,
        ...style,
      }}
    >
      {children}
    </div>
  ),
)
