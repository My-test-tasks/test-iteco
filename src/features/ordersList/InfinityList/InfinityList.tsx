import { OrderCard } from "../OrderCard"
import { Spiner as Footer } from "./Spiner"
import { Virtuoso, VirtuosoGrid } from "react-virtuoso"
import { useQuery } from "@tanstack/react-query"
import { fetchOrders } from "../ordersAPI"
import { useAppSelector } from "../../../store/hooks"
import { selectType } from "../ordersListSlice"
import { OrderListItem } from "../OrderListItem"
import { Header } from "./Header"
import { GridView as List } from "./GridView"

import type { Components, GridComponents } from "react-virtuoso"
import type { Order } from "../../../api/fake"
import {
  selectDate,
  selectFrom,
  selectNumber,
  selectTo,
} from "../../FilterPanel/filtersSlice"
import { useMemo } from "react"
import { formatedDateWithoutTime } from "../../../utils/date"

export const InfinityList = () => {
  const type = useAppSelector(selectType)
  const from = useAppSelector(selectFrom)
  const to = useAppSelector(selectTo)
  const number = useAppSelector(selectNumber)
  const date = useAppSelector(selectDate)

  const { data, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  })

  const filteredData = useMemo(() => {
    let result = data?.orders

    if (from) {
      result = result?.filter(
        order => order.from.city.toLowerCase() === from.toLowerCase(),
      )
    }
    if (to) {
      result = result?.filter(
        order => order.to.city.toLowerCase() === to.toLowerCase(),
      )
    }
    if (number) {
      result = result?.filter(order => order.number === number)
    }
    if (date) {
      result = result?.filter(
        order => formatedDateWithoutTime(order.date) === date,
      )
    }

    return result
  }, [data?.orders, from, to, number, date])

  const components: Components<Order> & GridComponents = {
    Header,
  }

  if (isFetching) {
    components.Footer = Footer
  }

  if (type === "grid") {
    return (
      <VirtuosoGrid
        style={{ height: "100%" }}
        data={filteredData}
        useWindowScroll
        itemContent={(idx, order) => <OrderCard key={idx} order={order} />}
        components={{ ...components, List }}
      />
    )
  }

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={filteredData}
      data={data?.orders}
      useWindowScroll
      itemContent={(idx, order) => <OrderListItem key={idx} order={order} />}
      components={components}
    />
  )
}
