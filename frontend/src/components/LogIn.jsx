import FaceIcon from "@material-ui/icons/Face";
import "../styles/signup-login.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";


const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = async(e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("https://atg-assignment-eight.vercel.app/api/v1/register/api/v1/login", { email, password }, { "Content-Type": "application/json" });
            console.log(data);
         
            navigate("/dashboard");
            toast.success("User Logged In Successfully");
        } catch (error) {
            console.log(error.response?.data.message);
        }
    };


  return (
    <>
      <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div>
         <h1 style={{textAlign: "center", color: "tomato", fontFamily:"cursive"}}>Login Page</h1>
           <form className="loginForm" onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="loginEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="loginPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              
              <Link to="/password/forgot" style={{fontSize: "16px"}}>Forget Password ? Click Here</Link>
              
                <input type="submit" value="Login" className="loginBtn" />
          </form>
         </div> 
      </div>
    </>
  )
}

export default LogIn
