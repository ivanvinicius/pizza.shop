import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } =
    useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    })

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((currentParams) => {
      if (orderId) {
        currentParams.set('orderId', orderId)
      } else {
        currentParams.delete('orderId')
      }

      if (customerName) {
        currentParams.set('customerName', customerName)
      } else {
        currentParams.delete('customerName')
      }

      if (status) {
        currentParams.set('status', status)
      } else {
        currentParams.delete('status')
      }

      // voltar para página 1 nos filtros
      currentParams.set('page', '1')

      return currentParams
    })
  }

  function handleClearFilters() {
    setSearchParams((currentParams) => {
      currentParams.delete('orderId')
      currentParams.delete('customerName')
      currentParams.delete('status')

      currentParams.set('page', '1')

      return currentParams
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    })
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register('orderId')}
      />
      <Input
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
        {...register('customerName')}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Saiu para entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button variant={'outline'} type="submit" size={'xs'}>
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        variant={'ghost'}
        type="button"
        size={'xs'}
        onClick={handleClearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
