import { OrderList } from "../features/ordersList"
import styled from "styled-components"

const AppWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const App = () => {
  return (
    <AppWrapper>
      <OrderList />
    </AppWrapper>
  )
}
