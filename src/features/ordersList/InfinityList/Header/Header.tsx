import { Flex, Button } from "antd"
import { AppstoreOutlined, MenuOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { selectType, setType } from "../../ordersListSlice"

export const Header = () => {
  const dispatch = useAppDispatch()
  const type = useAppSelector(selectType)

  const setTypeToList = () => {
    dispatch(setType("list"))
  }

  const setTypeToGrid = () => {
    dispatch(setType("grid"))
  }

  return (
    <Flex gap="small" justify="flex-end">
      <Button
        type={type === "list" ? "primary" : "default"}
        icon={<MenuOutlined />}
        size="large"
        onClick={setTypeToList}
      />
      <Button
        type={type === "grid" ? "primary" : "default"}
        icon={<AppstoreOutlined />}
        size="large"
        onClick={setTypeToGrid}
      />
    </Flex>
  )
}
