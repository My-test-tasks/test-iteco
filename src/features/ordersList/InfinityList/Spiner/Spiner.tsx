import { Alert as AntAlert, Spin } from "antd"
import styled from "styled-components"

const Alert = styled(AntAlert)`
  height: 75px;
  margin-top: 16px;
`

export const Spiner = () => {
  return (
    <Spin tip="Loading...">
      <Alert type="info" />
    </Spin>
  )
}
