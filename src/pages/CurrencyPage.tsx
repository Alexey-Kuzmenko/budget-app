import { Typography } from '@mui/material';
import Converter from '../components/Converter/Converter';

function CurrencyPage() {

    return (
        <>
            <Typography variant='h4' component='h1' sx={{ marginBottom: '20px' }}>Currency converter</Typography>
            <Converter />
        </>
    );
}

export default CurrencyPage;