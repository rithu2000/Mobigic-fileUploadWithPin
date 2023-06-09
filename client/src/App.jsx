import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPublicRoute from './routes/UserPublicRoute';
import UserProtectRouter from './routes/UserProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<UserPublicRoute><Home /></UserPublicRoute>} />
          <Route path='/login' element={<UserProtectRouter><Login /></UserProtectRouter>} />
          <Route path='/signup' element={<UserProtectRouter><Signup /></UserProtectRouter>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;