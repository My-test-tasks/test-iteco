import dayjs from "dayjs"
import ru from "dayjs/locale/ru"

export const dateFormat = "DD MMMM YYYY"
const timeFormat = "HH:mm"

export const formatedDate = (date: dayjs.ConfigType) => {
  dayjs.locale(ru)

  return dayjs(date).format(`${dateFormat} ${timeFormat}`)
}
