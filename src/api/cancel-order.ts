import { api } from '~/lib/axios'

export interface CancelOrderBody {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderBody) {
  await api.patch(`/orders/${orderId}/cancel`)
}
