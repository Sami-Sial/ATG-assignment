import React, { useState } from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "../styles/ForgotPassword.css";
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = async(e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://atg-assignment-eight.vercel.app/api/v1/password/forgot", { email }, { "Content-Type": "application/json" });
      console.log(data);  

      toast.success(`Email sent to ${email} successfully./n Verify email and reset password`);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
   
  };


  return (
    <>
       <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default ForgotPassword
