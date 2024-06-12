import { Skeleton } from '~/components/ui/skeleton'

export function MetricCardSekeleton() {
  return (
    <>
      <Skeleton className="b mt-1 h-7 w-36" />
      <Skeleton className="b h-4 w-52" />
    </>
  )
}
