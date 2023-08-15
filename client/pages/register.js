import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import  {Modal} from 'antd';
import Link from 'next/link';
import AuthForm from "../components/AuthForm.js";
const Register=()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[secret, setSecret] = useState("");
    const [ok,setOk]=useState(false);
    const[loading,setLoading]=useState(false);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        setLoading(true);
        try{
            const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,{
                name,
                email,
                password,
                secret,
            }
            );
            setName("");
            setEmail("");
            setPassword("");
            setSecret("");
            setOk(data.ok);
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
                    <h1>Register Page</h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-4 offset-md-4">
                    <AuthForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    email={email}
                    setEmail={setEmail}
                    secret={secret}
                    setSecret={setSecret}
                    loading={loading}
                    />
                </div>
            </div>
            <div className="row">
                        <div className="col">
                            <Modal
                                title="Congratulations!"
                                visible={ok}
                                onCancel={()=>setOk(false)}
                                footer={null}
                            >
                                <p>You have registered succesfully</p>
                                <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
                            </Modal>
                        </div>
                    </div>
        </div>
    )
}

export default Register;