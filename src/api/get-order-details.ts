import { api } from '~/lib/axios'

export interface GetOrderDetailsBody {
  orderId: string
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string | null
  totalInCents: number
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

  customer: {
    name: string
    email: string
    phone: string | null
  }

  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsBody) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
