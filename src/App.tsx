import React from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import BudgetList from './components/BudgetList/BudgetList';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BudgetList />} />
          <Route path='home' element={<BudgetList />} />
          <Route />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
