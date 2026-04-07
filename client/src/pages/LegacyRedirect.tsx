import { Navigate } from 'react-router-dom'

export default function LegacyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />
}
