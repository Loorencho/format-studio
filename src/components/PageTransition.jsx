import { useLocation, Outlet } from 'react-router-dom'
import './PageTransition.css'

export default function PageTransition() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-transition">
      <Outlet />
    </div>
  )
}
