import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../store/createAppSlice"

export interface FiltersSliceState {
  from: string
  to: string
  number: string
  date: string | null
}

const initialState: FiltersSliceState = {
  from: "",
  to: "",
  number: "",
  date: null,
}

export const filtersSlice = createAppSlice({
  name: "filters",
  initialState,

  reducers: create => ({
    setFilterFrom: create.reducer((state, action: PayloadAction<string>) => {
      state.from = action.payload
    }),
    setFilterTo: create.reducer((state, action: PayloadAction<string>) => {
      state.to = action.payload
    }),
    setFilterNumber: create.reducer((state, action: PayloadAction<string>) => {
      state.number = action.payload
    }),
    setFilterDate: create.reducer(
      (state, action: PayloadAction<string | null>) => {
        state.date = action.payload
      },
    ),
    resetFilters: create.reducer(state => {
      state.from = ""
      state.to = ""
      state.number = ""
      state.date = null
    }),
  }),

  selectors: {
    selectFrom: filters => filters.from,
    selectTo: filters => filters.to,
    selectNumber: filters => filters.number,
    selectDate: filters => filters.date,
  },
})

export const {
  setFilterFrom,
  setFilterTo,
  setFilterNumber,
  setFilterDate,
  resetFilters,
} = filtersSlice.actions

export const { selectFrom, selectTo, selectNumber, selectDate } =
  filtersSlice.selectors
