import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Whoops! algo aconteceu...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, detalhes abaixo:
      </p>

      <pre>{error?.message || JSON.stringify(error)}</pre>

      <span className="text-accent-foreground">
        <Link className="text-sky-500 dark:text-sky-400" to={'/'}>
          Voltar
        </Link>
      </span>
    </div>
  )
}
