import styles from "./BudgetListForm.module.scss"
import Box from "@mui/material/Box"
import { TextField, Select, FormControl, SelectChangeEvent, InputLabel, MenuItem } from '@mui/material'
import React, { useState } from "react";


function BudgetListForm() {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');

    // ! debug
    console.group('State values')
    console.log(inputValue);
    console.log(selectValue);
    console.groupEnd()


    const onInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
        const value: string = event.currentTarget.value
        setInputValue(value)
    }

    const onSelectChangeHandler = (event: SelectChangeEvent): void => {
        const value: string = event.target.value
        setSelectValue(value)
    }

    return (
        <Box className={styles.BudgetListForm}>
            <TextField id="search-input" label="Search" variant="filled" value={inputValue} onChange={onInputChangeHandler} />

            <FormControl variant='filled' sx={{ width: '100%', maxWidth: '100px' }}>
                <InputLabel id='sort-select-label'>Type</InputLabel>
                <Select
                    labelId='sort-select-label'
                    id='sort-items-select'
                    value={selectValue}
                    label='Type'
                    onChange={onSelectChangeHandler}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value='income'>Income</MenuItem>
                    <MenuItem value='outcome'>Outcome</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default BudgetListForm;