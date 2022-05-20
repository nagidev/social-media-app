import { useLocation, Outlet, Navigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
    const { _user } = useAuth()
    const location = useLocation()

    return (
        _user
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth