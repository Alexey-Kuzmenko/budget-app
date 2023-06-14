import './App.css';
import Layout from './containers/Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import BudgetList from './components/BudgetList/BudgetList';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BudgetList />} />
          <Route path='home' element={<HomePage />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
