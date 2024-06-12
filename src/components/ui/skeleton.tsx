import { cn } from '~/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-zinc-300/30 dark:bg-zinc-600/30',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
