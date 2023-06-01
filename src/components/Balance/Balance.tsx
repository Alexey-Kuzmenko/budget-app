import styles from "./Balance.module.scss"
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { calcTotalBalance } from "../../store/budgetSlice";

function Balance() {
    const { budgetList, totalBalance } = useAppSelector((state) => state.budget)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(calcTotalBalance())
    }, [dispatch, budgetList])

    return (
        <div className={styles.Balance}>
            <Typography component='h1' variant="h6">Balance: {totalBalance}</Typography>
        </div>
    );
}

export default Balance;