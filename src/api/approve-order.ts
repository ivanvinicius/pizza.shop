import { api } from '~/lib/axios'

export interface ApproveOrderBody {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderBody) {
  await api.patch(`/orders/${orderId}/approve`)
}
