import { useState } from 'react';
import "../styles/signup-login.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const registerSubmit = async(e) => {
        e.preventDefault();

      try {
        const { data } = await axios.post("/api/v1/register", { name, email, password }, { "Content-Type": "application/json" });
        console.log(data);

        navigate("/dashboard");
        toast.success("User Logged In Successfully");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

     
    return (
        <>
        <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h1 style={{textAlign: "center", color: "tomato", fontFamily:"cursive"}}>SignUp Page</h1>
            <form
                method='post'
                className="signUpForm"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='true'
                  />
                </div>

                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='true'
                  />
                </div>

                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
    )
}

export default SignUp
