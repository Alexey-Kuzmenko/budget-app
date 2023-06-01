import Balance from "../components/Balance/Balance";
import BudgetList from "../components/BudgetList/BudgetList";
import Form from "../components/Form/Form";

function HomePage() {
    return (
        <>
            <Form />
            <Balance />
            <BudgetList />
        </>
    );
}

export default HomePage;