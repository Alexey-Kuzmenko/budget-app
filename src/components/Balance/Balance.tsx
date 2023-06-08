import styles from "./Balance.module.scss"
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { calcTotalBalance } from "../../store/budgetSlice";
import { red, green } from "@mui/material/colors"
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function Balance() {
    const { budgetList, totalBalance } = useAppSelector((state) => state.budget)
    const dispatch = useAppDispatch()
    const budgetTextColor = totalBalance > 0 ? green[800] : totalBalance === 0 ? '#000' : red[800]

    const elementsStyles = {
        color: budgetTextColor
    }

    useEffect(() => {
        dispatch(calcTotalBalance())
    }, [dispatch, budgetList])

    return (
        <div className={styles.Balance}>
            <Typography sx={elementsStyles} component='h1' variant="h6">Balance: {totalBalance}</Typography>
            {
                totalBalance > 0 ?
                    <MoodIcon sx={elementsStyles} />
                    :
                    totalBalance === 0 ?
                        <SentimentNeutralIcon sx={elementsStyles} />
                        :
                        <SentimentVeryDissatisfiedIcon sx={elementsStyles} />
            }
        </div>
    );
}

export default Balance;