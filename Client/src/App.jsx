import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App