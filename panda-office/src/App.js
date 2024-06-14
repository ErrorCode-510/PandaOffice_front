import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Main from "./pages/main/Main"
import Layout from "./layouts/Layout"
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
