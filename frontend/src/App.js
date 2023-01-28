import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './App.css';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  const { auth, loading } = useAuth();

  if (loading)
    return <p>Carregando...</p>

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path='/'
              element={auth ? <Home /> : <Navigate to='login' />}
            />
            <Route
              path='/login'
              element={auth ? <Navigate to='/' /> : <Login />}
            />
            <Route
              path='/register'
              element={auth ? <Navigate to='/' /> : <Register />}
            />
            <Route
              path='/profile'
              element={auth ? <EditProfile /> : <Navigate to='/login' />}
            />
            <Route
              path='/users/:id'
              element={auth ? <Profile /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App;
