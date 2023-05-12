import styles from './Header.module.scss'
import { useState } from 'react';
import Container from '../../containers/Container/Container';
import Links from './links.type'
import { NavLink } from 'react-router-dom'
import MenuToggle from './MenuToggle/MenuToggle';
import Logo from '../../assets/budget_app_logo.webp'

const links: Links[] = [{ path: 'home' }, { path: 'about', text: 'about' }]

function Header() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const menuClasses: string[] = [styles.Header__menuBody]

    if (menuIsOpen) {
        menuClasses.push(styles.Header__menuBody_open)
    }

    const onMenuLinkClickHandler = () => {
        setMenuIsOpen(false)
    }

    const onMenuToggleClickHandler = () => {
        setMenuIsOpen(prevSate => !prevSate)
        console.log(menuIsOpen)
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

    return (
        <header className={styles.Header}>
            <Container>

                <div className={styles.Header__innerFlexContainer}>

                    <img src={Logo} alt="Logo" className={styles.Header__logo} />

                    <div className={styles.Header__menu}>

                        <MenuToggle menuIsOpen={menuIsOpen} onClickHandler={onMenuToggleClickHandler} />

                        <nav className={menuClasses.join(' ')}>
                            <div className={styles.Header__menuList}>
                                {renderLinks()}
                            </div>
                        </nav>

                    </div>

                </div>

            </Container>
        </header>
    );
}

export default Header;