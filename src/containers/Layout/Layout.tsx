import styles from './Layout.module.scss'
import { Outlet } from 'react-router-dom'
import Container from '../Container/Container';
import Header from '../../components/Header/Header';

function Layout() {
    return (
        <div className={styles.Layout}>
            <Header />
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}

export default Layout;