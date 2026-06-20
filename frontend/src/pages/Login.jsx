import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
  "https://blog-platform-backend-xn4f.onrender.com/api/auth/login",
  {
    email,
    password,
  }
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

alert("Login Successful");
navigate("/home");
    } catch (error) {
  console.log(error.response?.data);
  alert(error.response?.data?.message || "Login Failed");
}
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>

      <br />

      <Link to="/register">Go To Register</Link>
    </div>
  );
}

export default Login;