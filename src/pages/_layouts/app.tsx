import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <span>App Layout</span>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
