import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Main from "./pages/main/Main"
import Layout from "./layouts/Layout"
import Statistics from "./pages/welfare/statistics/Statistics.js"
import LoginForm from "./components/Assets/LoginForm/LoginForm.jsx"
import "./pages/main/Main.css"
import "./pages/welfare/statistics/Statistics.css"
import "./common.css"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LoginForm/>}> */}
            <Route path='/' element={<Layout/>}>
                <Route index element={<Main/>}/>
                {/* <Route index element={<Statistics/>}/> */}
            </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
