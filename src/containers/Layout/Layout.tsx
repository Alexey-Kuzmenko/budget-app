import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import Container from '../Container/Container';
import Header from '../../components/Header/Header';
import { useAppSelector } from '../../hooks';

function Layout() {
    const { menuIsOpen } = useAppSelector((state) => state.navigation);
    const mainVisibility = menuIsOpen ? 'hidden' : 'visible';

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