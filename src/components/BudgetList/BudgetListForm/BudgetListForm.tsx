import styles from './BudgetListForm.module.scss';
import Box from '@mui/material/Box';
import { TextField, SelectChangeEvent, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ReactNode, useState } from 'react';

interface BudgetListFormProps {
    inputValue: string
    selectValue: string
    inputChangeHandler: React.ChangeEventHandler<HTMLInputElement>
    selectChangeHandler: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
}

function BudgetListForm({ inputValue, inputChangeHandler }: BudgetListFormProps) {
    const [showForm, setShowForm] = useState(false);

    const onToggleClickHandler = () => {
        setShowForm((prevState) => !prevState);
    };

    return (
        <Box sx={{ maxWidth: '550px', width: '100%', margin: '0 auto' }}>

            <Box onClick={onToggleClickHandler} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Typography align='justify' variant='h6' component='h2' mb={1}>Sort parameters</Typography>
                {
                    showForm ? <ArrowDropUpIcon sx={{ marginBottom: '5px' }} /> : <ArrowDropDownIcon sx={{ marginBottom: '10px' }} />
                }
            </Box>

            {
                showForm ?
                    <Box className={styles.BudgetListForm}>
                        <TextField id="search-input" label="Search" variant="filled" value={inputValue} onChange={inputChangeHandler} sx={{ width: '100%' }} />
                    </Box>
                    : null
            }
        </Box>
    );
}

export default BudgetListForm;