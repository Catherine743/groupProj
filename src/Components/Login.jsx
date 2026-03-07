import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = () => {

    if(!email || !password){
      alert("Please enter email and password");
      return;
    }

    // temporary login logic
    if(email === "admin@gmail.com" && password === "1234"){
      alert("Login Successful");
      navigate("/");
    }else{
      alert("Invalid Credentials");
    }

  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">Smart Inventory</h2>
        <p className="login-subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

      </div>

    </div>
  );
}

export default Login;