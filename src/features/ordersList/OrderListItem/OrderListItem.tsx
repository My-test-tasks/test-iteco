import styled from "styled-components"
import {
  Flex,
  Card as AntCard,
  Space,
  Typography,
  Divider as AntDivider,
} from "antd"

import {} from "antd"
import { formatedDate } from "../../../utils/date"

import type { FC } from "react"
import type { Order } from "../../../api/fake"
import type { TextProps } from "antd/lib/typography/Text"

type Props = {
  order: Order
}

const { Text: AntText } = Typography

const Card = styled(AntCard)`
  margin: 8px 16px;
`

const Divider = styled(AntDivider)`
  height: auto;
  margin-block: 0;
  background-color: #e7e7e7;
`

const Text: FC<TextProps> = styled(AntText)`
  &&& {
    color: ${props => props.type === "secondary" && "#818281"};
    color: ${props => props.type === "danger" && "#017B59"};
  }
`

export const OrderListItem: FC<Props> = ({ order }) => {
  return (
    <Card bordered hoverable>
      {order._id}
      <Flex gap="middle">
        <Flex vertical gap="middle" style={{ minWidth: 320 }}>
          <Space direction="horizontal">
            <Text strong>{order.from.City}</Text>
            <Text type="secondary">{order.from.Region}</Text>
          </Space>
          <Space direction="horizontal">
            <Text strong>{order.to.City}</Text>
            <Text type="secondary">{order.to.Region}</Text>
          </Space>
          <Space direction="horizontal">
            <Text type="secondary">Расстояние:</Text>
            <Text strong>{`${order.distance.basic} км`}</Text>
            {order.distance.plus !== 0 && (
              <Text strong type="danger">
                {`+${order.distance.plus} пунктов`}{" "}
              </Text>
            )}
          </Space>
        </Flex>

        <Divider type="vertical" />

        <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
          <Flex vertical gap="middle">
            <Text strong>{order.cargo}</Text>
            <Text type="secondary">{`${order.weight} т. / ${order.size.min}-${order.size.max} м3`}</Text>
            <Space direction="horizontal">
              <Text type="secondary">Погрузка:</Text>
              <Text strong>{formatedDate(order.date)}</Text>
            </Space>
          </Flex>

          <Flex vertical gap="middle">
            <Text type="secondary">{`№${order.number}`}</Text>
            <Text type="secondary">{order.type}</Text>
          </Flex>
        </Flex>

        <Divider type="vertical" />

        <Flex
          vertical
          gap="middle"
          align="center"
          style={{ minWidth: 180, alignSelf: "center" }}
        >
          <Text strong>{`${order.price.full} ₽`}</Text>
          <Text type="secondary">{`ГСМ: ${order.price.fuel} ₽`}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}
