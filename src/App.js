import React from "react";
import Main from "../src/Pages/Main/main";
import Locker from "../src/Pages/Locker/locker";
import Unlocker from "../src/Pages/Unlocker/unlocker";
import { useRoutes } from "react-router-dom";
import "./App.css";

function App() {
    let element = useRoutes([
        {
            path: "/",
            element: <Main />,
        },
        {
            path: "/locker",
            element: <Locker />,
        },
        {
            path: "/unlocker",
            element: <Unlocker />,
        },
    ]);
    return <div className="App">{element}</div>;
}

export default App;
