import Navigation from "./components/navbar/navbar"

import "./App.css"

import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    {/* <Route path="/" element={<Home />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/create" element={<Create />}/>
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