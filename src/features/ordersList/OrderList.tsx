import { ArrowUpOutlined } from "@ant-design/icons"
import { Flex, FloatButton } from "antd"
import { InfinityList } from "./InfinityList"

export const OrderList = () => {
  return (
    <Flex vertical gap={12} style={{ width: 1110, height: "100vh" }}>
      <InfinityList />

      <FloatButton.BackTop
        shape="square"
        type="primary"
        icon={<ArrowUpOutlined />}
      />
    </Flex>
  )
}
