import { API } from "../../api/config"
import { api } from "../../api/fake"

export const fetchOrders = async ({
  pageParam: offset,
}: {
  pageParam: number
}) => {
  const data = await api.getOrders(API.limit, offset)

  return data
}
