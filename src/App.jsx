import { BrowserRouter, Routes,Route } from "react-router-dom"
import {  Body,Login, Feed, Profile, Connections, Requests, ResetPassword} from "./components"
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
                  <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<Login />}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/connection" element={<Connections/>}/>
                  <Route path="/request" element={<Requests/>}/>
                  <Route path="/password/reset" element={<ResetPassword/>}/>
                </Route>
              </Routes>

            </BrowserRouter>
    </Provider>
   

    

  </>
     
  )
}

export default App
