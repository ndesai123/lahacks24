import Navbar from "./components/navbar/navbar"
import Home from "./components/home_page/home"
import About from "./components/about_page/about"
import Resources from "./components/resources_page/resources"
import Pets from "./components/pet_page/pet"
import Gratitudes from "./components/past_gratitudes_page/grat"


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
                    <Route path="/resources" element={<Resources />}/>
                    <Route path="/gratitudes" element={<Gratitudes />}/>
                    <Route path="/pets" element={<Pets />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;