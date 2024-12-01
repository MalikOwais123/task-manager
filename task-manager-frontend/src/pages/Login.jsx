import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { theme } from "../theme/palette";
import { loginAPI } from "../api/auth";
// import Loader from "../components/Loader";

const inputStyle = {
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: ".1px solid #ccc",
  fontSize: "16px",
  width: "300px",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await loginAPI({
        email,
        password,
      });
      localStorage.setItem("token", data.token); // Store JWT in localStorage
      navigate("/"); // Redirect to home
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <AuthContainer>
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <p>
          Don&apos;t have an account? <a href="/signup">Signup</a>
        </p>
        <button type="submit">{loading ? "Loading..." : "Login"}</button>
        {error && (
          <p style={{ color: theme.colorPalette.status.error }}>{error}</p>
        )}
      </AuthContainer>
    </form>
  );
};

export default Login;
