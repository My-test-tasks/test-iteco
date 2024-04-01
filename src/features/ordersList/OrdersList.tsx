import { OrderCard } from "./OrderCard"
import { Spiner as Footer } from "./Spiner"
import { Button, Flex } from "antd"
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons"
import { Virtuoso } from "react-virtuoso"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchOrders } from "./ordersAPI"

export const OrdersList = () => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextOffset,
  })

  return (
    <Flex vertical style={{ height: "100vh" }}>
      <Flex gap="small" justify="flex-end" style={{ padding: 16 }}>
        <Button type="default" icon={<MenuOutlined />} size="large" />
        <Button type="default" icon={<AppstoreOutlined />} size="large" />
      </Flex>

      <Virtuoso
        style={{ height: "100%" }}
        data={data?.pages.map(page => page.orders).flat()}
        endReached={() => fetchNextPage()}
        useWindowScroll
        itemContent={(idx, order) => <OrderCard key={idx} order={order} />}
        components={{ Footer }}
      />
    </Flex>
  )
}
