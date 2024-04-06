import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
  from: Yup.string(),
  to: Yup.string(),
  number: Yup.string().matches(/А\d{7}$/gm, "Формат номера: А1234567"),
  date: Yup.string().nullable().default(null),
})
