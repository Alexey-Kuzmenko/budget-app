import { Typography } from '@mui/material';
import Converter from '../components/Converter/Converter';
import Loader from '../components/Loader/Loader';
import { useAppSelector } from '../hooks';

function CurrencyPage() {
    const isLoad = useAppSelector((state) => state.currency.isLoad);

    return (
        <>
            <Typography variant='h4' component='h1' sx={{ marginBottom: '20px' }}>Currency converter</Typography>
            <Converter />
            <Loader isOpen={isLoad} />
        </>
    );
}

export default CurrencyPage;