import {SyncOutlined} from "@ant-design/icons";
const AuthForm =({
    handleSubmit,
    name,
    setName,
    password,
    setPassword,
    email,
    setEmail,
    secret,
    setSecret,
    loading,
    page,
})=>{
    return(
<form onSubmit={handleSubmit}>
                        {page !== "login" &&<div className="form-group py-3">
                            <label className="text-muted">Name:</label>
                            <input
                            value={name}
                            onChange={(event)=>setName(event.target.value)} 
                            type="text" 
                            className="form-control"
                            placeholder="Enter Name"/>
                        </div>}
                        <div className="form-group py-2">
                            <label className="text-muted">Email:</label>
                            <input
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)} 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter Email"/>
                        </div>

                        <div className="form-group py-2">
                            <label className="text-muted">Password:</label>
                            <input 
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)}
                            type="password" 
                            className="form-control" 
                            placeholder="Enter Password"/>
                        </div>

                        <>
                        {page !== 'login'&& <div className="form-group py-2">
                            <label className="form-text text-muted">Security Questions</label>
                            <div className="py-1">
                            <select>
                                <option>What is your childhood name?</option>
                                <option>What is the name of your first school?</option>
                                <option>What is your pet name?</option>
                            </select>
                            </div>
                            <div className="py-2">
                            <input
                            value={secret}
                            onChange={(event)=>setSecret(event.target.value)}  
                            type="text" 
                            className="form-control " 
                            placeholder="Enter your answer"/>
                            </div>
                            
                        </div>}
                        </>
                        
                        <div className="py-1">
                        <button type="submit" disabled={page==='login'
                        ? !email || !password
                        : !name || !email || !password || !secret
                        } className="btn btn-primary col-12">
                            {loading ? <SyncOutlined spin/>:"Submit"}
                        </button>
                        </div>
                    </form>
    )
    
}
export default AuthForm;