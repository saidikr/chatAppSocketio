import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'



function App() {

const [logged, setLogged] = useState(false);
const [user,setUser]=useState([]);


  return (
    <div className="App">
      <div className={`${logged && "hidden"}`}>
      <LoginPage logged={logged} setLogged={setLogged} user={user} setUser={setUser} />
      </div>
      <div className={`${!logged && "hidden"}`}>
      <HomePage user={user} setUser={setUser} />
      </div>
      
    </div>
  )
}

export default App
