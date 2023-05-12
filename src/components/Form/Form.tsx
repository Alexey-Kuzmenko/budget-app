import { TextField } from '@mui/material';
import styles from './Form.module.scss'


function From() {
    const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    }

    return (
        <form className={styles.Form} onSubmit={onFormSubmitHandler}>
            <div className={styles.Form__innerFlexContainer}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" type='password' />
            </div>
        </form>
    );
}

export default From;