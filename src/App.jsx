import { BrowserRouter, Routes,Route } from "react-router-dom"
import {  Body,Login, Feed, Profile, Connections, Requests, ResetPassword,Chat, CallHistory, VideoCall} from "./components"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Premium from "./components/Premium"
import SandboxComponent from "./components/SandboxComponent"
 
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
                  <Route path="/premium" element={<Premium/>}/>
                  <Route path="/chat/:targetUserId" element={<Chat/>}/>
                  <Route path="/call/:targetUserId" element={<VideoCall />} />
                  <Route path="/call-history" element={<CallHistory />} />
                  <Route path="/sandbox/:roomId" element={<SandboxComponent />} />
                </Route>
              </Routes>

            </BrowserRouter>
    </Provider>
   

    

  </>
     
  )
}

export default App
