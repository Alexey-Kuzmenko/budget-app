import styles from "./BudgetListForm.module.scss"
import Box from "@mui/material/Box"
import { TextField, Select, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'
import { ReactNode } from "react"

interface BudgetListFormProps {
    inputValue: string
    selectValue: string
    inputChangeHandler: React.ChangeEventHandler<HTMLInputElement>
    selectChangeHandler: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
}

function BudgetListForm({ inputValue, selectValue, inputChangeHandler, selectChangeHandler }: BudgetListFormProps) {

    return (
        <Box className={styles.BudgetListForm}>
            <TextField id="search-input" label="Search" variant="filled" value={inputValue} onChange={inputChangeHandler} />

            <FormControl variant='filled' sx={{ width: '100%', maxWidth: '100px' }}>
                <InputLabel id='sort-select-label'>Type</InputLabel>
                <Select
                    labelId='sort-select-label'
                    id='sort-items-select'
                    value={selectValue}
                    label='Type'
                    onChange={selectChangeHandler}
                >
                    <MenuItem value='none'>None</MenuItem>
                    <MenuItem value='income'>Income</MenuItem>
                    <MenuItem value='outcome'>Outcome</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default BudgetListForm;