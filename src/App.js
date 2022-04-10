import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { auth } from './components/Firebase/Firebase.config';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
export const AuthContext = createContext(null)
function App() {
  const [user] = useAuthState(auth);

  return (
    <>
    <AuthContext.Provider value={{user}}>
     <Routes>
         <Route path='/' element={<Login />} />
         <Route path='/login' element={<Login />} />
         <Route path='/home' element={<Home />} />
     </Routes>
     </AuthContext.Provider>
    </>
  );
}

export default App;
