import Box from '@mui/material/Box';
import styles from './BudgetList.module.scss'
import BudgetListItem from './BudgetListItem/BudgetListItem';
import { Typography } from '@mui/material'
// ! testing
import BudgetItemType from '../../budgetItem/budgetItem'
import BudgetItem from '../../budgetItem/budgetItem';

// ! testing solution
const budget: BudgetItemType[] = []

for (let i = 0; i <= 10; i++) {
    budget.push(new BudgetItem(i, 'income', (i * 100), 'some comment'))
}
// ! debug
console.log(budget);

function BudgetList() {

    const renderListItems = (): JSX.Element[] => {
        return budget.map(({ id, type, value, comment }: BudgetItemType) => {
            return (
                <BudgetListItem
                    key={id}
                    type={type}
                    value={value}
                    comment={comment}
                />
            )
        })
    }

    return (
        <Box className={styles.BudgetList}>
            <Typography variant="h4" component="h1" align='justify' textTransform='uppercase'>Budget List:</Typography>
            {renderListItems()}
        </Box>
    );
}

export default BudgetList;