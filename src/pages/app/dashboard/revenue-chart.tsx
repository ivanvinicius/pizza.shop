import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

// interface RevenueChartProps { }

const data = [
  { day: '10/12', revenue: 1200 },
  { day: '11/12', revenue: 890 },
  { day: '12/12', revenue: 430 },
  { day: '13/12', revenue: 2600 },
  { day: '14/12', revenue: 1890 },
  { day: '15/12', revenue: 459 },
  { day: '16/12', revenue: 3620 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diaria no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={'100%'} height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <CartesianGrid vertical={false} className="stroke-muted" />

            <XAxis
              stroke={colors.zinc[400]}
              tickLine={false}
              dataKey={'day'}
              dy={16}
            />

            <YAxis
              dx={-16}
              width={85}
              stroke={colors.zinc[400]}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <Line
              type={'linear'}
              strokeWidth={2}
              dataKey={'revenue'}
              stroke={colors.orange[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
