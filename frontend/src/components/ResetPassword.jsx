import axios from 'axios';
import "../styles/ResetPassword.css"
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    try {
      const { data } = axios.put(`https://atg-assignment-eight.vercel.app/api/v1/password/reset/${token}`, { password, confirmPassword }, {"COntent-Type": "application/json"});
      console.log(data);
  
      toast.success("Password Updated Successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };


  return (
    <>
       <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
    </>
  )
}

export default ResetPassword
