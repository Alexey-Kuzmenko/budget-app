import Box from '@mui/material/Box';
import styles from './BudgetList.module.scss'
import BudgetListItem from './BudgetListItem/BudgetListItem';
import { Typography, Alert } from '@mui/material'
import { BudgetItem } from '../../budget.types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteBudgetItem } from '../../store/budgetSlice';
import DialogWindow from '../Dialog/Dialog';
import { showDialog } from '../../store/dialogSlice';
import React, { useState } from 'react';

// ! testing
import BudgetListForm from './BudgetListForm/BudgetListForm';
import { SelectChangeEvent } from '@mui/material'

function BudgetList() {
    const { budgetList } = useAppSelector(state => state.budget);
    const { isDialogOpen } = useAppSelector(state => state.dialog)
    const dispatch = useAppDispatch();
    const [deleteTaskId, setDeleteTaskId] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');

    const onDeleteClickHandler = (id: string) => {
        dispatch(showDialog('open'))
        setDeleteTaskId(id)
    }

    const onAcceptClickHandler = () => {
        dispatch(deleteBudgetItem(deleteTaskId))
        dispatch(showDialog('hidden'))
    }


    const onInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        const value: string = e.currentTarget.value
        setInputValue(value);
    }

    // ? potential solution
    const onSelectChangeHandler = (e: SelectChangeEvent) => {
        const value: string = e.target.value
        // ! debug
        console.log(value);
        setSelectValue(value)
    }

    const renderListItems = (): JSX.Element[] => {
        return budgetList.filter((item: BudgetItem) => {
            return inputValue === '' ? item : item.comment.includes(inputValue)
        }).map(({ id, type, value, comment }: BudgetItem) => {
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
            <BudgetListForm
                inputValue={inputValue}
                selectValue={selectValue}
                inputChangeHandler={onInputChangeHandler}
                selectChangeHandler={onSelectChangeHandler}
            />

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