import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../components/AuthContainer";
import { setSession } from "../utils/session";
import { theme } from "../theme/palette";
import { signupAPI } from "../api/auth";

const inputStyle = {
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: ".1px solid #ccc",
  fontSize: "16px",
  width: "300px",
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await signupAPI({
        email,
        password,
      });
      console.log("🚀 ~ handleSignup ~ data:", data);
      setSession(data?.token);

      navigate("/");
    } catch {
      setError("User already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <AuthContainer>
        <h2>Signup</h2>
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
          Already have an account? <a href="/login">Login</a>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
        {error && (
          <p style={{ color: theme.colorPalette.status.error }}>{error}</p>
        )}
      </AuthContainer>
    </form>
  );
};

export default Signup;
