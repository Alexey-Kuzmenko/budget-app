import styles from './Header.module.scss'
import Container from '../../containers/Container/Container';
import Links from './links.type'
import { NavLink } from 'react-router-dom'
import MenuToggle from './MenuToggle/MenuToggle';
import Logo from '../../assets/budget_app_logo.webp'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeMenu, toggleMenu } from '../../store/navSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const links: Links[] = [{ path: 'home' }, { path: 'currency', text: 'currency' }]

function Header() {
    const dispatch = useAppDispatch()
    const { menuIsOpen } = useAppSelector((state) => state.navigation)
    const { token } = useAppSelector((state) => state.authentication)
    const menuClasses: string[] = [styles.Header__menuBody]

    if (menuIsOpen) {
        menuClasses.push(styles.Header__menuBody_open)
    }

    const onMenuLinkClickHandler = () => {
        dispatch(closeMenu())
    }

    const onMenuToggleClickHandler = () => {
        dispatch(toggleMenu())
    }

    const renderLinks = (): JSX.Element[] => {
        return links.map(({ path, text }: Links, i) => {
            return <NavLink
                key={i}
                to={path}
                className={styles.Header__menuLink}
                onClick={onMenuLinkClickHandler}
            >
                {text ? text : path}
            </NavLink>
        })
    }

    const headerLinks = (
        <>
            {renderLinks()}
            <NavLink to='logout' replace className={styles.Header__logoutBtn} onClick={onMenuLinkClickHandler}>
                <LogoutIcon className={styles.Header__logoutBtnIcon} />
            </NavLink>
        </>
    )

    return (
        <header className={styles.Header}>
            <Container>

                <div className={styles.Header__innerFlexContainer}>

                    <img src={Logo} alt="Logo" className={styles.Header__logo} />

                    <div className={styles.Header__menu}>
                        {
                            !token ? null : <MenuToggle onClickHandler={onMenuToggleClickHandler} />
                        }
                        <nav className={menuClasses.join(' ')}>
                            <div className={styles.Header__menuList}>
                                {!token ? null : headerLinks}
                            </div>
                        </nav>

                    </div>

                </div>

            </Container>
        </header>
    );
}

export default Header;