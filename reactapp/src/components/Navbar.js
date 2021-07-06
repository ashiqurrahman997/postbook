import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/MyProfile";
import Users from "../Pages/AllUsers";
import PostDetails from "../Pages/PostDetails";
import UserProfile from "../Pages/UserProfile"
import Update from "../Pages/Update";
export default function App() {
    return (
        <div>
            <Router>
                <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" >Post Book</a>                 
                    <div className="navbar-collapse" >
                        <div className="navbar-nav">
                            <Link className='nav-link' to="/">Home</Link>
                            <Link className='nav-link' to="/profile/2">My Profile</Link>
                            <Link className='nav-link' to="/users">All Users</Link>
                        </div>
                    </div>
                </nav>
        
                <div>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile/:id">
                            <Profile />
                        </Route>
                        <Route exact path="/users">
                            <Users />
                        </Route>
                       
                        <Route exact  path="/postdetails/:id">
                            <PostDetails /> 
                         </Route> 

                         <Route exact  path="/userprofile/:id">
                            <UserProfile /> 
                         </Route> 
                         <Route exact  path="/updateform">
                            <Update /> 
                         </Route> 
                    </Switch>

                </div>
                </div>
            </Router>

        </div>
    );
}