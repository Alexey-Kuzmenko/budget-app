import Box from '@mui/material/Box';
import styles from './BudgetList.module.scss';
import BudgetListItem from './BudgetListItem/BudgetListItem';
import { Typography, Alert } from '@mui/material';
import { BudgetItem } from '../../models/budget.types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteBudgetItems } from '../../store/budgetSlice';
import DialogWindow from '../Dialog/Dialog';
import { showDialog } from '../../store/dialogSlice';
import React, { useEffect, useState } from 'react';
import BudgetListForm from './BudgetListForm/BudgetListForm';
import { SelectChangeEvent } from '@mui/material';
import { autoLogout } from '../../store/authSlice';


function BudgetList() {
    const { budgetList, error } = useAppSelector(state => state.budget);
    const { isDialogOpen } = useAppSelector(state => state.dialog);
    const dispatch = useAppDispatch();
    const [deleteItemId, setDeleteItemId] = useState<{ hash: string, id: string }>({ hash: '', id: '' });
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');

    useEffect(() => {
        dispatch(autoLogout());
    }, []);

    const onDeleteClickHandler = (itemId: { hash: string, id: string }) => {
        dispatch(showDialog('open'));
        setDeleteItemId(itemId);
    };

    const onAcceptClickHandler = () => {
        dispatch(deleteBudgetItems(deleteItemId));
        dispatch(showDialog('hidden'));
    };


    const onInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        const value: string = e.currentTarget.value;
        setInputValue(value);
    };

    const onSelectChangeHandler = (e: SelectChangeEvent) => {
        const value: string = e.target.value;
        setSelectValue(value);
    };

    const renderListItems = (): JSX.Element[] => {
        return budgetList.filter((item: BudgetItem) => {
            return inputValue === '' ? item : item.comment.includes(inputValue);
        }).map(({ hash, id, type, value, comment }: BudgetItem) => {
            return (
                <BudgetListItem
                    key={id}
                    type={type}
                    value={value}
                    comment={comment}
                    onClickHandler={() => onDeleteClickHandler({ hash: hash ? hash : '', id })}
                />
            );
        });
    };

    return (
        <>
            <Box className={styles.BudgetList}>

                <Typography variant="h4" component="h1" align='justify' textTransform='uppercase'>Budget List:</Typography>

                <BudgetListForm
                    inputValue={inputValue}
                    selectValue={selectValue}
                    inputChangeHandler={onInputChangeHandler}
                    selectChangeHandler={onSelectChangeHandler}
                />

                {
                    error ? <Alert severity='error'>Error! Failed to fetch</Alert> : !budgetList.length ? <Alert severity="info">Your budget is empty</Alert> : renderListItems()
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