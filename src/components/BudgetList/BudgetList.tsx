import Box from '@mui/material/Box';
import styles from './BudgetList.module.scss'
import BudgetListItem from './BudgetListItem/BudgetListItem';
import { Typography, Alert } from '@mui/material'
import { BudgetItem } from '../../budget.types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteBudgetItem } from '../../store/budgetSlice';
// ? proposal
import DialogWindow from '../Dialog/Dialog';
import { showDialog } from '../../store/dialogSlice';
import { useState } from 'react';

function BudgetList() {
    const { budgetList } = useAppSelector(state => state.budget);
    const { isDialogOpen } = useAppSelector(state => state.dialog)
    const dispatch = useAppDispatch();
    const [deleteTaskId, setDeleteTaskId] = useState('');

    const onDeleteClickHandler = (id: string) => {
        dispatch(showDialog('open'))
        setDeleteTaskId(id)
    }

    const onAcceptClickHandler = () => {
        dispatch(deleteBudgetItem(deleteTaskId))
        dispatch(showDialog('hidden'))
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
        <>
            <Box className={styles.BudgetList}>
                <Typography variant="h4" component="h1" align='justify' textTransform='uppercase'>Budget List:</Typography>
                {
                    !budgetList.length ? <Alert severity="info">Your budget is empty</Alert> : renderListItems()
                }
            </Box>

            {
                <DialogWindow
                    isOpen={isDialogOpen}
                    title="Confirm action"
                    contentText="Are you sure that you want to delete the budget item?"
                    onCloseHandler={() => dispatch(showDialog('hidden'))}
                    onAcceptHandler={onAcceptClickHandler}
                />
            }

        </>
    );
}

export default BudgetList;