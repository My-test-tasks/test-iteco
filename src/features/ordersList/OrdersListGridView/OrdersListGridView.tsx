import { forwardRef } from "react"
import type { GridComponents } from "react-virtuoso"

export const OrdersListGridView: GridComponents["List"] = forwardRef(
  ({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  ),
)
