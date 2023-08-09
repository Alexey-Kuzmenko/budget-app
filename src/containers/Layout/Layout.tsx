import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import Container from '../Container/Container';
import Header from '../../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks';
// ! testing
import { useEffect } from 'react';
import { fetchCurrencies } from '../../store/currencySlice';


function Layout() {
    const { menuIsOpen } = useAppSelector((state) => state.navigation);
    const mainVisibility = menuIsOpen ? 'hidden' : 'visible';
    const dispatch = useAppDispatch();

    // ? potential solution
    useEffect(() => {
        dispatch(fetchCurrencies());
    }, []);

    return (
        <div className={styles.Layout}>
            <Header />
            <main style={{ paddingTop: '20vh', visibility: mainVisibility }}>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}

export default Layout;