import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    isOpen: boolean | null
}

function Loader({ isOpen }: LoaderProps) {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isOpen === null ? false : !isOpen ? true : false}
        >
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}

export default Loader;