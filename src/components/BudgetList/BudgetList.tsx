import Box from '@mui/material/Box';
import styles from './BudgetList.module.scss'
import BudgetListItem from './BudgetListItem/BudgetListItem';
import { Typography, Alert } from '@mui/material'
import { BudgetItem } from '../../budget.types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteBudgetItem } from '../../store/budgetSlice';


function BudgetList() {
    const { budgetList } = useAppSelector(state => state.budget)
    const dispatch = useAppDispatch()

    const onDeleteClickHandler = (id: string) => {
        dispatch(deleteBudgetItem(id))
    }

    const renderListItems = (): JSX.Element[] => {
        return budgetList.map(({ id, type, value, comment }: BudgetItem) => {
            return (
                <BudgetListItem
                    key={id}
                    type={type}
                    value={value}
                    comment={comment}
                    onClickHandler={() => onDeleteClickHandler(id)}
                />
            )
        })
    }

    return (
        <Box className={styles.BudgetList}>
            <Typography variant="h4" component="h1" align='justify' textTransform='uppercase'>Budget List:</Typography>
            {
                !budgetList.length ? <Alert severity="info">Your budget is empty</Alert> : renderListItems()
            }
        </Box>
    );
}

export default BudgetList;