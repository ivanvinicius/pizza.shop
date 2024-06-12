import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveOrder } from '~/api/approve-order'
import { cancelOrder } from '~/api/cancel-order'
import { deliverOrder } from '~/api/deliver-order'
import { dispatchOrder } from '~/api/dispath-order'
import { GetOrdersResponse } from '~/api/get-orders'
import { OrderStatus } from '~/components/order-status'
import { Button } from '~/components/ui/button'
import { Dialog, DialogTrigger } from '~/components/ui/dialog'
import { TableCell, TableRow } from '~/components/ui/table'

import { OrderDialogDetails } from './order-dialog-details'

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    let changedStatusSucced = false
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cached.forEach(([cachedKey, cachedData]) => {
      if (!cachedData) return

      queryClient.setQueryData<GetOrdersResponse>(cachedKey, {
        ...cachedData,

        orders: cachedData.orders.map((order) => {
          if (order.orderId === orderId) {
            changedStatusSucced = true

            return { ...order, status }
          }

          return order
        }),
      })
    })

    if (changedStatusSucced) {
      toast.success('Status alterado com sucesso!')
    }
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
      onError() {
        toast.error('Não foi possível cancelar o pedido.')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
      onError() {
        toast.error('Não foi possível cancelar o pedido.')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
      onError() {
        toast.error('Não foi possível cancelar o pedido.')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeleveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
      onError() {
        toast.error('Não foi possível cancelar o pedido.')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDialogDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {order.createdAt
          ? formatDistanceToNow(order.createdAt, {
              locale: ptBR,
              addSuffix: true,
            })
          : 'Sem data'}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant={'outline'}
            size={'xs'}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeleveringOrder}
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
