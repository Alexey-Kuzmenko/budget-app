import './App.css';
import Layout from './containers/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Logout from './components/Logout/Logout';
import { useAppDispatch, useAppSelector } from './hooks';
import { keepSession } from './store/authSlice';
import { useEffect } from 'react';
import CurrencyPage from './pages/CurrencyPage';

function App() {
  const token = useAppSelector((state) => state.authentication.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(keepSession());
  }, []);

  let routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='home' element={<HomePage />} />
        <Route path='logout' element={<Logout />} />
        <Route path='currency' element={<CurrencyPage />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );

  if (!token) {
    routes = (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
