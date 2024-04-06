import {
  Button as AntButton,
  DatePicker,
  Flex,
  FloatButton,
  Input,
  Form as AntForm,
} from "antd"
import { Typography } from "antd"
import styled from "styled-components"
import { dateFormat, formatedDateWithoutTime } from "../../utils/date"
import { SwapOutlined } from "@ant-design/icons"
import { useFormik } from "formik"
import { validationSchema } from "./validationSchema"
import { initialValues } from "./initialValues"
import { useAppDispatch } from "../../store/hooks"
import {
  resetFilters,
  setFilterDate,
  setFilterFrom,
  setFilterNumber,
  setFilterTo,
} from "./filtersSlice"

const { Title: AntTitle } = Typography

const Form = styled(AntForm)`
  display: flex;
  gap: 32px;
  margin-top: 24px;
  padding: 32px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`

const Title = styled(AntTitle)`
  margin: 0;
`

const ResetButton = styled(AntButton)`
  &&& {
    width: 170px;
    height: 56px;
    align-self: flex-end;
    color: #818281;
    text-decoration: underline;
  }

  &&&&:hover {
    background: none;
  }

  &&& > span {
    text-decoration: underline;
  }
`

const SearchButton = styled(AntButton)`
  &&& {
    height: 56px;
    background-color: #ff9a19;
    text-transform: uppercase;
    font-weight: 700;
  }

  &&&&:hover {
    background-color: #ff9a19c2;
  }
`

const Path = styled(Flex)`
  position: relative;
  gap: 28px;
`

const SwapButton = styled(FloatButton)`
  position: absolute;
  top: 0;
  right: calc(50% - 20px);
`

export const FilterPanel = () => {
  const dispatch = useAppDispatch()

  const handlerSubmit = () => {
    if (formik.isValid) {
      const { from, to, number, date } = formik.values
      dispatch(setFilterFrom(from))
      dispatch(setFilterTo(to))
      dispatch(setFilterNumber(number))
      dispatch(setFilterDate(date ? formatedDateWithoutTime(date) : null))
    }
  }

  const handlerReset = () => {
    dispatch(resetFilters())
  }

  const handlerSwap = () => {
    const tmp = formik.values.from

    formik.setFieldValue("from", formik.values.to)
    formik.setFieldValue("to", tmp)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handlerSubmit,
    onReset: handlerReset,
  })

  return (
    <Form onFinish={handlerSubmit}>
      <Flex vertical gap={24}>
        <Title level={4}>Поиск грузов</Title>

        <Path>
          <Form.Item
            validateStatus={
              formik.touched.from && formik.errors.from ? "error" : "success"
            }
            help={formik.touched.from && formik.errors.from}
          >
            <Input
              size="large"
              placeholder="Откуда"
              style={{ width: 367 }}
              value={formik.values.from}
              onChange={e => {
                formik.setFieldTouched("from")
                formik.setFieldValue("from", e.target.value)
              }}
            />
          </Form.Item>

          <SwapButton
            icon={<SwapOutlined />}
            type="default"
            onClick={handlerSwap}
          />

          <Form.Item
            validateStatus={
              formik.touched.to && formik.errors.to ? "error" : "success"
            }
            help={formik.touched.to && formik.errors.to}
          >
            <Input
              size="large"
              placeholder="Куда"
              style={{ width: 367 }}
              value={formik.values.to}
              onChange={e => {
                formik.setFieldTouched("to")
                formik.setFieldValue("to", e.target.value)
              }}
            />
          </Form.Item>
        </Path>

        <ResetButton
          type="text"
          size="large"
          htmlType="reset"
          onClick={() => formik.resetForm()}
        >
          Сбросить фильтры
        </ResetButton>
      </Flex>

      <Flex vertical gap={24} style={{ width: 270 }}>
        <Form.Item
          validateStatus={
            formik.touched.number && formik.errors.number ? "error" : "success"
          }
          help={formik.touched.number && formik.errors.number}
        >
          <Input
            size="large"
            placeholder="№ заказа"
            value={formik.values.number}
            onChange={e => {
              formik.setFieldTouched("number")
              formik.setFieldValue("number", e.target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          validateStatus={
            formik.touched.date && formik.errors.date ? "error" : "success"
          }
          help={formik.touched.date && formik.errors.date}
        >
          <DatePicker
            placeholder="Дата погрузки"
            size="large"
            format={dateFormat}
            value={formik.values.date}
            onChange={date => {
              formik.setFieldTouched("date")
              formik.setFieldValue("date", date)
            }}
          />
        </Form.Item>

        <SearchButton
          type="primary"
          size="large"
          htmlType="submit"
          disabled={formik.dirty && !formik.isValid}
        >
          Поиск
        </SearchButton>
      </Flex>
    </Form>
  )
}
