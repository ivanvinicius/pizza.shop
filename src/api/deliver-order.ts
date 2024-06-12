import { api } from '~/lib/axios'

export interface DeliverOrderBody {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderBody) {
  await api.patch(`/orders/${orderId}/deliver`)
}
