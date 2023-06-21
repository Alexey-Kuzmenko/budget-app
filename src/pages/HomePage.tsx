import Balance from "../components/Balance/Balance";
import BudgetList from "../components/BudgetList/BudgetList";
import Form from "../components/Form/Form";
import { useAppSelector } from "../hooks";
import Loader from "../components/Loader/Loader";

function HomePage() {
    const { isLoad } = useAppSelector((state) => state.budget)

    return (
        <>
            <Form />
            <Balance />
            <BudgetList />
            <Loader isOpen={isLoad} />
        </>
    );
}

export default HomePage;