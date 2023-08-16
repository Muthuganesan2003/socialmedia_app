import { useContext } from "react";
import { UserContext } from "../context";
const Home =()=>{
    const [state,setState]=useContext(UserContext);
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-1 text-center py-5">Home Page</h1>
                    {state &&<h1>Hello {JSON.stringify(state.user.name)}</h1>}
                    <img src="/images/tractor.jpg" alt="logo"></img>
                </div>
            </div>
        </div>
    )
}

export default Home;