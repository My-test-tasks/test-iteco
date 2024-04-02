import { OrderCard } from "../OrderCard"
import { Spiner as Footer } from "./Spiner"
import { Virtuoso, VirtuosoGrid } from "react-virtuoso"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchOrders } from "../ordersAPI"
import { useAppSelector } from "../../../store/hooks"
import { selectType } from "../ordersListSlice"
import { OrderListItem } from "../OrderListItem"
import { Header } from "./Header"
import { GridView as List } from "./GridView"

import type { Components, GridComponents } from "react-virtuoso"
import type { Order } from "../../../api/fake"

export const InfinityList = () => {
  const type = useAppSelector(selectType)

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextOffset,
  })

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
        data={data?.pages.map(page => page.orders).flat() ?? []}
        endReached={() => fetchNextPage()}
        useWindowScroll
        itemContent={(idx, order) => <OrderCard key={idx} order={order} />}
        components={{ ...components, List }}
      />
    )
  }

  return (
    <Virtuoso
      style={{ height: "100%" }}
      data={data?.pages.map(page => page.orders).flat() ?? []}
      endReached={() => fetchNextPage()}
      useWindowScroll
      itemContent={(idx, order) => <OrderListItem key={idx} order={order} />}
      components={components}
    />
  )
}