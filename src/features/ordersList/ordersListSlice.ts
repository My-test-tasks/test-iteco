import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../store/createAppSlice"

type ListType = "list" | "grid"

export interface OrdersListSliceState {
  type: ListType
}

const initialState: OrdersListSliceState = {
  type: "list",
}

export const ordersListSlice = createAppSlice({
  name: "ordersList",
  initialState,

  reducers: create => ({
    setType: create.reducer((state, action: PayloadAction<ListType>) => {
      state.type = action.payload
    }),
  }),

  selectors: {
    selectType: ordersList => ordersList.type,
  },
})

export const { setType } = ordersListSlice.actions

export const { selectType } = ordersListSlice.selectors
