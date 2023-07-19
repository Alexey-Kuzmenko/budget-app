import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { closeSession } from '../../store/authSlice';
import { Navigate } from 'react-router-dom';
import { resetState } from '../../store/budgetSlice';

function Logout() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(closeSession())
        dispatch(resetState())
    }, []);

    return (
        <Navigate to='/' replace />
    );
}

export default Logout;