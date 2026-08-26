import type { Order } from '../types'

const ORDERS_KEY = 'heritage_loom_orders'

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

export function saveOrder(order: Order): void {
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HL-${ts}-${rand}`
}
