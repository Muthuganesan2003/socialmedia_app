import Link from "next/link";
import { useContext,useEffect,useState} from "react";
import { UserContext } from "../context";
const Nav =()=>{
    const [state,setState]=useContext(UserContext);
    const[current,setCurrent]=useState("");
    const logout=()=>{
        window.localStorage.removeItem('auth');
        setState(null);
    }
    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname);
    },[process.browser && window.location.pathname])

    return(
        <nav className="nav d-flex justify-content-end bg-dark">
            <Link href="/" className={`nav-link text-light ${current==="/" && "active"}`}>Home</Link>

            {state===null ?(
                <>
                <Link href="/login" className={`nav-link text-light ${current==="/login" && "active"}`}>Login </Link>
                <Link href="/register" className={`nav-link text-light ${current ==="/register" && "active"}`} >Register</Link>
                </>
            ):(
                <>
                <Link onClick={logout} href="/login" className="nav-link text-light">Logout</Link>
                <Link href="/user/dashboard" className={`nav-link text-light ${current ==="/user/dashboard" && "active"}`}>
                    {state && state.user && state.user.name}
                </Link>
                </>
            )}
            
            
        </nav>
    
    )
}
export default Nav;
