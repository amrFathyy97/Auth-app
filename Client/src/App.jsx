import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="root container mx-auto">
    <Routes>
      <Route path="register" element={<Register/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App