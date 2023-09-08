import { Outlet,useNavigate  } from "react-router-dom"
// import Header from "./Header"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AppLayout = () => {

    return (
        <div className="app">
            {/* <Header/> */}
            <Outlet/>
        </div>
    )
}

export default AppLayout