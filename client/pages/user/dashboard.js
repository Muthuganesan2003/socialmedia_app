import { useContext } from "react";
import { UserContext } from "../../context";
const Dashboard =()=>{
    const [state,setState]=useContext(UserContext);
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-1 text-center py-5">Dashboard</h1>
                    {state &&<h1>Hello {JSON.stringify(state.user.name)}</h1>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;