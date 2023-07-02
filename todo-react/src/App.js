
import { Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './users/login';
import Signup from './users/signup';
import Navbar from './component/navbar';
import SecuredPage from './component/securePage';
import CreateTodos from './component/todolists/createTodos';
import Todos from './component/todolists';
import AllNotes from './component/allTodos';

function App() {

  // check auth
  const isAuthenticated = () =>{
    const token = sessionStorage.getItem('token')
    //console.log(token)
    return token !== null && token !== undefined
  }

  // create private route
  const PrivateRoute = ({children})=>{
    if(!isAuthenticated()){
      return <h1 className='container'>Please login to continue</h1>
    }
    return <div className='container'>{children}</div>

  }

  return (
    <div className="App">
    <Navbar/>

      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<AllNotes/>}/>

        {/* {isAuthenticated()? <Route path='/secured' element={<SecuredPage/>}/>
        : <Route path='/login' element={<Login/>}/>} */}

        <Route path='/secured' element={
        <PrivateRoute>
          <SecuredPage/>
        </PrivateRoute>}/>
        <Route path='/todos' element={
        <PrivateRoute>
          <Todos/>
        </PrivateRoute>}/>
        <Route path='/create' element={
        <PrivateRoute>
          <CreateTodos/>  
        </PrivateRoute>
        }/>
      </Routes>
    <div id="footer">
    © 2023 AkademiGA. All rights reserved. 
    </div>
    </div>
  );
}

export default App;
