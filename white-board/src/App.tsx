
import './App.css'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Homepage/Home'
import Room from './pages/Roompage/Room'


const App=() => {
  

  return (
<div>
  <Router>
<Routes>
<Route  path="/" element={<Home/>}/>
<Route  path="/:roomId" element={<Room/>}/>
</Routes>
</Router>

</div>
  )
}

export default App
