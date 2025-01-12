import { BrowserRouter, Routes,Route } from "react-router-dom"
import {  Body,Login,Feed,Signup, Profile} from "./components"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
 
function App() {

  return (
   
  <>
    <Provider store={appStore}>
        <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<Body/>}>
                  <Route path="/" element={<Feed/>}/> 
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                </Route>
              </Routes>

            </BrowserRouter>
    </Provider>
   

    

  </>
     
  )
}

export default App
