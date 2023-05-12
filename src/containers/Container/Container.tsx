import styles from './Container.module.scss'

interface ContainerProps {
    children?: JSX.Element[] | JSX.Element
}

function Container({ children }: ContainerProps) {
    return (
        <div className={styles.Container}>
            {children}
        </div>
    );
}

export default Container;