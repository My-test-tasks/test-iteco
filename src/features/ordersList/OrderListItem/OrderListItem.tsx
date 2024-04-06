import styled from "styled-components"
import {
  Flex,
  Card as AntCard,
  Space,
  Typography,
  Divider as AntDivider,
  Tooltip,
} from "antd"
import {} from "antd"
import { formatedDate } from "../../../utils/date"

import type { FC } from "react"
import type { Order } from "../../../api/fake"
import type { TextProps } from "antd/lib/typography/Text"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { formatedPrice } from "../../../utils/price"

type Props = {
  order: Order
}

const { Text: AntText } = Typography

const Card = styled(AntCard)`
  min-height: 139px;
  margin: 16px 0;
  border-radius: 16px;

  &&& > div {
    padding: 22px 32px 22px;
  }
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
    font-size: ${props => (props.strong ? "18px" : "16px")};
    font-weight: ${props => (props.strong ? "500" : "400")};
  }
`

const TextPrice: FC<TextProps> = styled(Text)`
  &&& {
    font-size: 20px;
    font-weight: 500;
  }
`

const TextFuel: FC<TextProps> = styled(Text)`
  &&& {
    font-size: 14px;
    font-weight: 400;
  }
`

const QuestionIcon = styled(QuestionCircleOutlined)`
  width: 14px;
  height: 14px;
`

export const OrderListItem: FC<Props> = ({ order }) => {
  return (
    <Card bordered hoverable>
      <Flex gap={8}>
        <Flex vertical gap={6} style={{ minWidth: 320 }}>
          <Space direction="horizontal">
            <Text strong>{order.from.city}</Text>
            <Text type="secondary">{order.from.region}</Text>
          </Space>
          <Space direction="horizontal">
            <Text strong>{order.to.city}</Text>
            <Text type="secondary">{order.to.region}</Text>
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

        <Flex justify="space-between" style={{ width: "100%" }}>
          <Flex vertical gap={8}>
            <Text strong>{order.cargo}</Text>
            <Text type="secondary">{`${order.weight} т. / ${order.size.min}-${order.size.max} м3`}</Text>
            <Space direction="horizontal">
              <Text type="secondary">Погрузка:</Text>
              <Text strong>{formatedDate(order.date)}</Text>
            </Space>
          </Flex>

          <Flex vertical gap={8}>
            <Text type="secondary">{`№${order.number}`}</Text>
            <Text type="secondary">{order.type}</Text>
          </Flex>
        </Flex>

        <Divider type="vertical" />

        <Flex
          vertical
          align="center"
          style={{ minWidth: 180, alignSelf: "center" }}
        >
          <TextPrice strong>{formatedPrice(order.price.full)}</TextPrice>
          <Tooltip title="Дополнительно, на ГСМ">
            <QuestionIcon />
            <TextFuel type="secondary">{` ГСМ: ${formatedPrice(order.price.fuel)}`}</TextFuel>
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  )
}
