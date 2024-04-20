import Navbar from "./components/navbar/navbar"
import Home from "./components/home_page/home"
import About from "./components/about_page/about"

import "./App.css"

import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About />}/>
                    { /*<Route path="/create" element={<Create />}/>
                    <Route path="/workouts" element={<Workouts />}/>
                    <Route path="/settings" element={<Settings />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp />}/> */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;