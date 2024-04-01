import dayjs from "dayjs"
import ru from "dayjs/locale/ru"

export const formatedDate = (date: dayjs.ConfigType) => {
  dayjs.locale(ru)

  return dayjs(date).format("DD MMMM YYYY HH:mm")
}
