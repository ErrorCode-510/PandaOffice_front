import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";

import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";



import Error from "./pages/error/Error";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute loginCheck={true}>
                        <Layout />
                    </ProtectedRoute>
                }>

                </Route>

                <Route path="/member">
                    <Route path="login" element={<ProtectedRoute loginCheck={false}><Login /></ProtectedRoute>} />

                </Route>



                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
