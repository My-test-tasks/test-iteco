import { api } from "../../api/fake"

export const fetchOrders = async () => {
  const data = await api.getOrders()

  return data
}
