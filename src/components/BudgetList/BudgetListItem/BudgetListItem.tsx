import styles from './BudgetListItem.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import BudgetItemType from '../../../budgetItem/budgetItem'

type BudgetItemProps = Omit<BudgetItemType, 'id'>

function BudgetListItem({ type, value, comment }: BudgetItemProps) {
    return (
        <Card variant='outlined'>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <div className={styles.BudgetListItem__innerFlexContainer}>
                    <Typography sx={{ fontSize: 14 }} color='darkgreen' gutterBottom textTransform='uppercase'>
                        {type}
                    </Typography>

                    <Typography variant="h5" component="div">
                        {value}
                    </Typography>
                </div>

                <Typography variant="body2">
                    {comment}
                </Typography>

            </CardContent>

            <CardActions>
                <Button variant='outlined' size="small" color='error'>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default BudgetListItem;