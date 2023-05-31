import styles from './BudgetListItem.module.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import { BudgetItem } from '../../../budget.types'

interface BudgetItemProps extends Omit<BudgetItem, 'id'> {
    onClickHandler: React.MouseEventHandler
}

function BudgetListItem({ type, value, comment, onClickHandler }: BudgetItemProps) {
    return (
        <Card variant='outlined'>
            <CardContent sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <div className={styles.BudgetListItem__innerFlexContainer}>
                    <Typography sx={{ fontSize: 14 }} color={type === 'income' ? 'darkgreen' : 'darkred'} gutterBottom textTransform='uppercase'>
                        {type}
                    </Typography>

                    <Typography variant="h5" component="div">
                        {type === 'outcome' ? `-${value}` : value}
                    </Typography>
                </div>

                <Divider sx={{ backgroundColor: 'lightgrey', width: '100%' }} />

                <Typography variant="body2" sx={{ marginTop: '15px' }}>
                    {comment}
                </Typography>

            </CardContent>

            <CardActions sx={{ padding: '16px' }}>
                <Button variant='outlined' size="small" color='error' sx={{ 'zIndex': 10 }} onClick={onClickHandler}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default BudgetListItem;