import styles from './Form.module.scss'
import { TextField, FormControl, Select, InputLabel, MenuItem, Button, FormHelperText } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { BudgetType } from '../../budgetItem/budgetItem';

interface FormValues {
    type: BudgetType
    comments: string
    value: number | string
}

function Form() {
    const {
        control,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm<FormValues>(
        {
            defaultValues: {
                type: 'income',
                comments: '',
                value: ''
            },
            mode: 'onBlur'
        }
    )

    const onFormSubmitHandler: SubmitHandler<FormValues> = (formData): void => {
        console.log(formData);
        reset()
    }

    const onFormResetHandler = (): void => {
        reset()
    }

    return (
        <form className={styles.Form} onSubmit={handleSubmit(onFormSubmitHandler)}>
            <div className={styles.Form__innerFlexContainer}>

                <Controller
                    name='type'
                    control={control}
                    render={({ field }) => (
                        <FormControl error={errors.type ? true : false} >
                            <InputLabel id='type'>Type</InputLabel>
                            <Select {...field} labelId='type' label="Type">
                                <MenuItem value='income'>Income</MenuItem>
                                <MenuItem value='outcome'>Outcome</MenuItem>
                            </Select>
                            {
                                errors.type ? <FormHelperText>Field is required</FormHelperText> : null
                            }
                        </FormControl>
                    )}
                />

                <Controller
                    name='comments'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <TextField id="outlined-basic" label="Comments" variant="outlined" type='text' inputProps={{ maxLength: 40 }} helperText={errors.comments ? "Field is required" : ""} error={errors.comments ? true : false} {...field} />}
                />

                <Controller
                    name='value'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <TextField id="outlined-basic" label="Value" variant="outlined" type='number' helperText={errors.value ? "Field is required" : ""} error={errors.value ? true : false} {...field} />}
                />

                <div className={styles.Form__controls}>
                    <Button variant="outlined" color='success' size='medium' type='submit' disabled={!isValid}>
                        Add
                    </Button>

                    <Button variant="outlined" color="error" size='medium' onClick={onFormResetHandler}>
                        Clear
                    </Button>

                </div>

            </div>
        </form>
    );
}

export default Form;