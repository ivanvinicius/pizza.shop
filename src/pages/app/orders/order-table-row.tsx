import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelOrder } from '~/api/cancel-order'
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

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,

    onSuccess(_, { orderId }) {
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

              return { ...order, status: 'canceled' }
            }

            return order
          }),
        })
      })

      if (changedStatusSucced) {
        toast.success('Pedido cancelado!')
      }
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
        <Button variant={'outline'} size={'xs'}>
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant={'ghost'}
          size={'xs'}
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
