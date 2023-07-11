import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { closeSession } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';

function Logout() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(closeSession())
    }, []);

    return (
        <Navigate to='/' replace />
    );
}

export default Logout;