export type CarpetStyle = 'traditional' | 'contemporary' | 'modern'
export type CarpetQuality = 'hand-knotted' | 'hand-tufted' | 'machine-woven'
export type CarpetShape = 'rectangular' | 'round' | 'runner' | 'custom'

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  style: CarpetStyle
}

export interface Carpet {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  image: string
  images: string[]
  collectionId: string
  style: CarpetStyle
  quality: CarpetQuality
  shape: CarpetShape
  colors: string[]
  materials: string[]
  featured: boolean
  newArrival: boolean
  projectType: string
  basePrice: number
}

export type OrderStatus = 'pending_payment' | 'confirmed' | 'cancelled'

export interface OrderItem {
  carpetId: string
  carpetName: string
  carpetSlug: string
  carpetImage: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  items: OrderItem[]
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  notes: string
  totalAmount: number
  advanceAmount: number
  advancePaid: boolean
  paymentId?: string
  status: OrderStatus
  createdAt: string
}

export interface Project {
  id: string
  title: string
  location: string
  description: string
  image: string
  carpetId: string
}
