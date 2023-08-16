import { useState ,useContext} from "react";
import { UserContext } from "../context/index.js";
import axios from "axios";
import {toast} from 'react-toastify';
import  {Modal} from 'antd';
import Link from 'next/link';
import AuthForm from "../components/AuthForm.js";
import {useRouter} from 'next/router.js';

const Login=()=>{
    const [email, setEmail] = useState("luffy@gmail.com");
    const [password, setPassword] = useState("123456789");
    const[loading,setLoading]=useState(false);
    const router =useRouter(); 
    const [state,setState]=useContext(UserContext);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        setLoading(true);
        try{
            const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,{
                email,
                password,
            }
            );
            //update context
            setState({
                user:data.user,
                token:data.token,
            });
            //stores in localstorage
            window.localStorage.setItem('auth',JSON.stringify(data));

            //route the login to home
            router.push("/");
            
            setLoading(false);
        }
        catch(err){
            toast.error(err.response.data)
            setLoading(false);
        }
    }
    // if(ok) toast.success("Registration Successful!");
    
    return(
        <div className="container-fluid">
            <div className="row py-5 bg-banner text-light">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-4 offset-md-4">
                    <AuthForm
                    handleSubmit={handleSubmit}
                    password={password}
                    setPassword={setPassword}
                    email={email}
                    setEmail={setEmail}
                    loading={loading}
                    page="login"
                    />
                </div>
            </div>

                    <div className="row">
                        <div className="col">
                            <p className="text-center">Not yet Registered? <Link href="/register">
                            Register
                            </Link> </p>
                        </div>
                    </div>
        </div>
    )
}

export default Login;