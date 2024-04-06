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
  margin: 0;
  border-radius: 16px;

  &&& > div {
    padding: 22px 32px 22px;
  }
`

const Divider = styled(AntDivider)`
  & {
    margin: 12px;
    margin-inline: 0;
    background-color: #e7e7e7;
  }

  &.last {
    margin-bottom: 8px;
  }
`

const Text: FC<TextProps> = styled(AntText)`
  &&& {
    color: ${props => props.type === "secondary" && "#818281"};
    color: ${props => props.type === "danger" && "#017B59"};
  }
`

const TextPrice: FC<TextProps> = styled(Text)`
  &&& {
    font-size: 24px;
    font-weight: 500;
    line-height: 24px;
  }
`

const TextFuel: FC<TextProps> = styled(Text)`
  &&& {
    font-size: 14px;
    font-weight: 400;
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
      <Flex vertical>
        <Flex justify="space-between">
          <Flex vertical gap={6}>
            <Space direction="vertical" size={0}>
              <Text strong>{order.from.city}</Text>
              <Text type="secondary">{order.from.region}</Text>
            </Space>
            <Space direction="vertical" size={0}>
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
          <Space direction="vertical" size={6}>
            <Text strong>{order.cargo}</Text>
            <Text type="secondary">{`${order.weight} т. / ${order.size.min}-${order.size.max} м3`}</Text>
          </Space>

          <Space direction="vertical" size={6} align="end">
            <Text strong>{formatedDate(order.date)}</Text>
            <Text type="secondary">{order.type}</Text>
          </Space>
        </Flex>

        <Divider type="horizontal" className="last" />

        <Flex justify="space-between">
          <Flex vertical gap={4}>
            <TextPrice strong>{formatedPrice(order.price.full)}</TextPrice>
            <Tooltip title="Дополнительно, на ГСМ">
              <QuestionIcon />
              <TextFuel type="secondary">{` ГСМ: ${formatedPrice(order.price.fuel)}`}</TextFuel>
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
