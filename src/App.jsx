import { BrowserRouter, Routes,Route } from "react-router-dom"
import {  Body,Login} from "./components"
 
function App() {

  return (
   
  <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/login" element={<Login/>}/>
        
        </Route>
      </Routes>

    </BrowserRouter>

    

  </>
     
  )
}

export default App
