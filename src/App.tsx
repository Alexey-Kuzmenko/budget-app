import './App.css';
import Layout from './containers/Layout/Layout';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
// ! test solution
import LoginPage from './pages/LoginPage';

function App() {
  // ? test solution
  let isUserLogin: boolean = false

  let routes: JSX.Element = (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  )

  if (!isUserLogin) {
    routes = (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    )
  }

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
