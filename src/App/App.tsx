import { useState } from "react"
import { api } from "../api/fake"
import styles from "./App.module.css"

export const App = () => {
  const [offset, setOffset] = useState<number | undefined>(0)

  const handleClick = () => {
    const limit = 100

    const data = api.getOrders(limit, offset)

    setOffset(data.nextOffset)
  }

  return (
    <div className={styles.app}>
      <button onClick={handleClick}>getOrders</button>
    </div>
  )
}
