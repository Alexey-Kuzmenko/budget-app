import { MouseEventHandler } from 'react';
import styles from './MenuToggle.module.scss'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface MenuToggleProps {
    menuIsOpen: boolean
    onClickHandler: MouseEventHandler
}

function MenuToggle({ menuIsOpen, onClickHandler }: MenuToggleProps) {

    return (
        <div onClick={onClickHandler}>
            {
                menuIsOpen ?
                    <CloseRoundedIcon className={`${styles.MenuToggle} ${styles.MenuToggle_open}`} />
                    :
                    <MenuRoundedIcon className={styles.MenuToggle} />
            }
        </div>
    );
}

export default MenuToggle;