import './App.css';
import Header from "./pages/header/Header";
import { Routes,Route } from 'react-router-dom';
import Nomatch from './pages/noMatch/Nomatch';
import Dashboard from './pages/dashboard/Dashboard';
import PostUser from './pages/dashboard/employee/PostUser';
import UpdateUser from './pages/dashboard/employee/UpdateUser';

function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/employee' element={<PostUser/>}/>
      <Route path='/employee/:id' element={<UpdateUser/>}/>
      <Route path='*' element={<Nomatch/>}/>
    </Routes>
    </div>
  );
}

export default App;
