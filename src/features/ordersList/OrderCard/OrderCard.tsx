import type { FC } from "react"
import type { Order } from "../../../api/fake"
import {
  Flex,
  Card as AntCard,
  Space,
  Typography,
  Button as AntButton,
  Divider as AntDivider,
  Tooltip,
} from "antd"
import styled from "styled-components"
import type { TextProps } from "antd/lib/typography/Text"
import type { ButtonProps } from "antd/lib/button"
import { formatedDate } from "../../../utils/date"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { formatedPrice } from "../../../utils/price"

type Props = {
  order: Order
}

const { Text: AntText } = Typography

const Card = styled(AntCard)`
  min-width: 547px;
  margin: 8px 0;
`

const Divider = styled(AntDivider)`
  margin-inline: 0;
  background-color: #e7e7e7;
`

const Text: FC<TextProps> = styled(AntText)`
  &&& {
    color: ${props => props.type === "secondary" && "#818281"};
    color: ${props => props.type === "danger" && "#017B59"};
  }
`

const Button: FC<ButtonProps> = styled(AntButton)`
  &&& {
    width: 178px;
    height: 50px;
    background-color: #ff9a19;
    text-transform: uppercase;
    font-weight: 700;
  }

  &&&&:hover {
    background-color: #ff9a19c2;
  }
`
const QuestionIcon = styled(QuestionCircleOutlined)`
  width: 14px;
  height: 14px;
`

export const OrderCard: FC<Props> = ({ order }) => {
  return (
    <Card bordered hoverable>
      <Flex vertical gap="middle">
        <Flex gap="middle" justify="space-between">
          <Flex vertical gap="small">
            <Space direction="vertical" size={4}>
              <Text strong>{order.from.city}</Text>
              <Text type="secondary">{order.from.region}</Text>
            </Space>
            <Space direction="vertical" size={4}>
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

          <Text type="secondary">{`№${order.number}`}</Text>
        </Flex>

        <Divider type="horizontal" />

        <Flex justify="space-between">
          <Space direction="vertical" size="middle">
            <Text strong>{order.cargo}</Text>
            <Text type="secondary">{`${order.weight} т. / ${order.size.min}-${order.size.max} м3`}</Text>
          </Space>

          <Space direction="vertical" size="middle" align="end">
            <Text strong>{formatedDate(order.date)}</Text>
            <Text type="secondary">{order.type}</Text>
          </Space>
        </Flex>

        <Divider type="horizontal" />

        <Flex align="center" justify="space-between">
          <Flex vertical gap="middle">
            <Text strong>{formatedPrice(order.price.full)}</Text>
            <Tooltip title="Дополнительно, на ГСМ">
              <QuestionIcon />
              <Text type="secondary">{` ГСМ: ${formatedPrice(order.price.fuel)}`}</Text>
            </Tooltip>
          </Flex>

          <Button type="primary" danger>
            Откликнуться
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}
