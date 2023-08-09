import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './Converter.module.scss';
import { Autocomplete, TextField, Button, Box, Typography } from '@mui/material';
import getCurrencyCode from '../../helpers/getCurrencyCode';
import { getRates, resetValue } from '../../store/currencySlice';

export interface FormData {
    baseCurrency: string
    targetCurrency: string
    value: string
}

function Converter() {
    const { currencies, value } = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();

    const {
        control,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm<FormData>({
        defaultValues: {
            baseCurrency: '',
            targetCurrency: '',
            value: ''
        }
    });

    const onFormSubmitHandler: SubmitHandler<FormData> = (formData): void => {
        const baseCurrencyCode = getCurrencyCode(formData.baseCurrency);
        const targetCurrencyCode = getCurrencyCode(formData.targetCurrency);

        if (baseCurrencyCode && targetCurrencyCode) {
            dispatch(resetValue());
            dispatch(getRates({ value: formData.value, baseCurrency: baseCurrencyCode, targetCurrency: targetCurrencyCode }));
        } else {
            throw new Error('Invalid base currency and target currency value');
        }

        reset();
    };

    const onResetFormHandler = (): void => {
        reset();
        dispatch(resetValue());
    };

    return (
        <>
            <form className={styles.Converter} onSubmit={handleSubmit(onFormSubmitHandler)}>
                <div className={styles.Converter__innerFlexContainer}>

                    <Controller
                        name='baseCurrency'
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <Autocomplete
                                disablePortal
                                value={value}
                                id="base-currency-combo-box"
                                options={currencies}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Base currency" />}
                                onChange={(_, data) => {
                                    onChange(data);
                                    return data;
                                }}
                            />
                        }
                    />

                    <Controller
                        name='targetCurrency'
                        control={control}
                        render={({ field: { onChange, value } }) =>
                            <Autocomplete
                                disablePortal
                                value={value}
                                id="target-currency-combo-box"
                                options={currencies}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Target currency" />}
                                onChange={(_, data) => {
                                    onChange(data);
                                    return data;
                                }}
                            />
                        }
                    />

                    <Controller
                        name='value'
                        control={control}
                        render={({ field }) => <TextField id="value" label="Value" variant="outlined" type='text' {...field} />}
                    />


                    <div className={styles.Converter__controls}>
                        <Button variant="outlined" color='primary' sx={{ width: '100px' }} type='submit' disabled={!isValid}>Calculate</Button>
                        <Button variant="outlined" color='error' sx={{ width: '100px' }} type='reset' onClick={onResetFormHandler} >Reset</Button>
                    </div>
                </div>

            </form>

            <Box className={styles.Converter__totals}>
                <Typography variant='h6'>Value: {value}</Typography>
            </Box>
        </>
    );
}

export default Converter;