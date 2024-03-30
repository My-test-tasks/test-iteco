import { fakerRU as faker } from "@faker-js/faker"

type City = {
  City: string
  Region: string
}

type Distance = {
  basic: number
  plus: number
}

type Size = {
  min: number
  max: number
}

type Price = {
  full: number
  fuel: number
}

interface Order {
  _id: string
  number: string
  from: City
  to: City
  distance: Distance
  cargo: string
  weight: number
  size: Size
  date: string
  price: Price
}

interface Result {
  total: number
  limit: number
  nextOffset?: number
  orders: Order[]
}

function createRandomOrder(id?: number): Order {
  return {
    _id: String(id) ?? faker.string.uuid(),
    number: `А${faker.string.numeric(7)}`,
    from: {
      City: faker.location.city(),
      Region: faker.location.county(),
    },
    to: {
      City: faker.location.city(),
      Region: faker.location.county(),
    },
    distance: {
      basic: faker.number.int({ min: 10, max: 999 }),
      plus: faker.number.int(10),
    },
    cargo: faker.commerce.product(),
    weight: faker.number.float({ min: 0, max: 10, multipleOf: 0.1 }),
    size: {
      min: faker.number.int({ min: 1, max: 30 }),
      max: faker.number.int({ min: 1, max: 30 }),
    },
    date: faker.date.soon({ days: 60 }).toString(),
    price: {
      full: faker.number.float({ min: 1, max: 100, multipleOf: 0.05 }) * 1000,
      fuel: faker.number.float({ min: 1, max: 10, multipleOf: 0.25 }) * 1000,
    },
  }
}

const createOrders = (amount = 10000) => {
  const result = []

  const start = Date.now()

  for (let i = 0; i < amount; i++) {
    const order = createRandomOrder(i)
    result.push(order)
  }

  const stop = Date.now()
  console.log(`Created ${amount} orders for: ${stop - start} ms`)

  return result
}

export const api = {
  _orders: createOrders(),
  getOrders(limit = 100, offset = 0) {
    const total = this._orders.length
    const nextOffset = offset + limit < total ? offset + limit : null
    const sliceEnd = nextOffset ?? total

    const result: Result = {
      total,
      limit,
      orders: this._orders.slice(offset, sliceEnd),
    }

    if (nextOffset) {
      result.nextOffset = nextOffset
    }

    console.log(result)

    return result
  },
}
