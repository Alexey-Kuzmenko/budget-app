import { MouseEventHandler } from 'react';
import styles from './MenuToggle.module.scss';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useAppSelector } from '../../../hooks';

interface MenuToggleProps {
    onClickHandler: MouseEventHandler
}

function MenuToggle({ onClickHandler }: MenuToggleProps) {
    const { menuIsOpen } = useAppSelector((state) => state.navigation);

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