import styles from './LoginForm.module.scss'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
// ! testing
import { signIn, signUp } from '../../../store/authSlice';

interface FormData {
    email: string
    password: string
}

function LoginForm() {
    const {
        control,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    })
    const [buttonId, setButtonId] = useState<string>();
    const dispatch = useAppDispatch()

    const onFormSubmitHandler: SubmitHandler<FormData> = (formData): void => {
        const { email, password } = formData

        if (buttonId === 'sign-in-btn') {
            dispatch(signIn({ email, password }))
        }

        if (buttonId === 'sign-up-btn') {
            dispatch(signUp({ email, password }))
        }

        reset()
    }

    return (
        <form className={styles.LoginForm} onSubmit={handleSubmit(onFormSubmitHandler)}>
            <Typography className={styles.LoginForm__title} mb={3} textTransform='uppercase' variant='h4' component='h1'>Login</Typography>

            <div className={styles.LoginForm__innerFlexContainer}>
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: { value: true, message: 'This field is required' },
                        pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email' }
                    }}
                    render={({ field }) => <TextField id="email" label="Email" variant="outlined" type="email" helperText={errors.email?.message ? errors.email.message : ''} error={errors.email ? true : false} {...field} />}
                />

                <Controller
                    name='password'
                    control={control}
                    rules={{
                        required: { value: true, message: 'This field is required' },
                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Unsecure password' }
                    }}
                    render={({ field }) => <TextField id="password" label="Password" variant="outlined" type="password" helperText={errors.password?.message ? errors.password.message : ''} error={errors.password ? true : false} {...field} />}
                />
            </div>

            <div className={styles.LoginForm__controls}>
                <Button id='sign-in-btn' type='submit' variant="outlined" color='success' size='medium' disabled={!isValid} onClick={() => { setButtonId('sign-in-btn') }}>Sign in</Button>
                <Button id='sign-up-btn' type='submit' variant="outlined" color='primary' size='medium' disabled={!isValid} onClick={() => { setButtonId('sign-up-btn') }}>Sign up</Button>
            </div>
        </form>
    );
}

export default LoginForm;