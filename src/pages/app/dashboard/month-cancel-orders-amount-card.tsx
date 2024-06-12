import { useQuery } from '@tanstack/react-query'
import { LineChart } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '~/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export function MonthCancelOrdersAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <LineChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrderAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrderAmount.amount.toLocaleString('pt-BR')}
            </span>
            <span className="block text-xs text-muted-foreground">
              {monthCanceledOrderAmount.diffFromLastMonth >= 0 ? (
                <span className="text-rose-500 dark:text-rose-400">
                  {monthCanceledOrderAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-emerald-500 dark:text-emerald-400">
                  {monthCanceledOrderAmount.diffFromLastMonth}%
                </span>
              )}{' '}
              em relação ao mês passado
            </span>
          </>
        )}
      </CardContent>
    </Card>
  )
}
