import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const signUpBtnHanler = () => {
    navigate("/signup");
  }

  const loginBtnHandler = () => {
    navigate("/login");
  }

  return (
    <>
      <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem"}}>
        <h1>Homepage</h1>
        <div>
          <button onClick={signUpBtnHanler} style={{ padding: "5px 10px", borderRadius: "4px", backgroundColor: "tomato", border: "none", marginRight: "1rem", cursor: "pointer" }}>SignUp</button>
          
          <button onClick={loginBtnHandler} style={{padding:"5px 10px", borderRadius: "4px", backgroundColor: "tomato", border: "none", cursor: "pointer"}}>Login</button>
        </div>
      </div>
    </>
  )
}

export default Home
