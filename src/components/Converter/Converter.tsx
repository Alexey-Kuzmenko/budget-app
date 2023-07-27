import styles from './Converter.module.scss';
import { Autocomplete, TextField, Button, Box, Typography } from '@mui/material';

function Converter() {
    return (
        <>
            <form className={styles.Converter}>
                <div className={styles.Converter__innerFlexContainer}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={['USD', 'UAH']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Base currency" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={['USD', 'UAH']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Target currency" />}
                    />
                    <Button variant="outlined" color='primary' sx={{ width: '100px' }}>Calculate</Button>
                </div>
            </form>

            <Box className={styles.Converter__totals}>
                <Typography variant='h6'>Total: {0}</Typography>
            </Box>
        </>
    );
}

export default Converter;