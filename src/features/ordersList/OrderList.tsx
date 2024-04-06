import { ArrowUpOutlined } from "@ant-design/icons"
import { Flex, FloatButton } from "antd"
import { FilterPanel } from "../FilterPanel"
import { InfinityList } from "./InfinityList"

export const OrderList = () => {
  return (
    <Flex vertical gap={16} style={{ width: 1110, height: "100vh" }}>
      <FilterPanel />

      <InfinityList />

      <FloatButton.BackTop
        shape="square"
        type="primary"
        icon={<ArrowUpOutlined />}
      />
    </Flex>
  )
}
