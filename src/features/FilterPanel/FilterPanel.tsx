import {
  Button as AntButton,
  DatePicker as AntDatePicker,
  Flex,
  FloatButton,
  Input as AntInput,
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
  gap: 24px;
  margin-top: 24px;
  padding: 32px;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
`

const FormItem = styled(AntForm.Item)`
  margin: 0;
`

const Title = styled(AntTitle)`
  &&& {
    margin: 0;
    letter-spacing: -1.2px;
  }
`

const Path = styled(Flex)`
  position: relative;
  gap: 18px;
`

const Input = styled(AntInput)`
  height: 48px;
`

const SwapButton = styled(FloatButton)`
  position: absolute;
  top: 4px;
  right: calc(50% - 20px);
`

const ResetButton = styled(AntButton)`
  &&& {
    width: 144px;
    height: 50px;
    padding: 0;
    align-self: flex-end;
    color: #818281;
    font-size: 16px;
    text-decoration: underline;
  }

  &&&&:hover {
    background: none;
  }

  &&& > span {
    text-decoration: underline;
  }
`

const DatePicker = styled(AntDatePicker)`
  width: 100%;
  height: 48px;
`

const SearchButton = styled(AntButton)`
  &&& {
    margin-top: 5px;
    height: 56px;
    background-color: #ff9a19;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: -1px;
  }

  &&&&:hover {
    background-color: #ff9a19c2;
  }

  &&&&:disabled {
    background-color: #f8f8f8;
  }

  &&&&:disabled:hover {
    background-color: #f8f8f8;
  }
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
      <Flex vertical gap={32} style={{ marginTop: 10 }}>
        <Title level={4}>Поиск грузов</Title>

        <Path>
          <FormItem
            validateStatus={
              formik.touched.from && formik.errors.from ? "error" : "success"
            }
            help={formik.touched.from && formik.errors.from}
          >
            <Input
              placeholder="Откуда"
              style={{ width: 367 }}
              allowClear
              value={formik.values.from}
              onChange={e => {
                formik.setFieldTouched("from")
                formik.setFieldValue("from", e.target.value)
              }}
            />
          </FormItem>

          <SwapButton
            icon={<SwapOutlined />}
            type="default"
            onClick={handlerSwap}
          />

          <FormItem
            validateStatus={
              formik.touched.to && formik.errors.to ? "error" : "success"
            }
            help={formik.touched.to && formik.errors.to}
          >
            <Input
              placeholder="Куда"
              style={{ width: 367 }}
              allowClear
              value={formik.values.to}
              onChange={e => {
                formik.setFieldTouched("to")
                formik.setFieldValue("to", e.target.value)
              }}
            />
          </FormItem>
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
        <FormItem
          validateStatus={
            formik.touched.number && formik.errors.number ? "error" : "success"
          }
          help={formik.touched.number && formik.errors.number}
        >
          <Input
            placeholder="№ заказа"
            value={formik.values.number}
            allowClear
            onChange={e => {
              formik.setFieldTouched("number")
              formik.setFieldValue("number", e.target.value)
            }}
          />
        </FormItem>

        <FormItem
          validateStatus={
            formik.touched.date && formik.errors.date ? "error" : "success"
          }
          help={formik.touched.date && formik.errors.date}
        >
          <DatePicker
            placeholder="Дата погрузки"
            format={dateFormat}
            value={formik.values.date}
            onChange={date => {
              formik.setFieldTouched("date")
              formik.setFieldValue("date", date)
            }}
          />
        </FormItem>

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
