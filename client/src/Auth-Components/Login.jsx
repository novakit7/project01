import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../assets/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //  auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      //  store token
      localStorage.setItem("token", data.token);

      //  store user safely
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // small delay (avoid race issues)
      setTimeout(() => {
        navigate("/home");
      }, 50);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="s-container">
      <div className="signup-box loginbox">
        <h2>🔐 Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span
              style={{ color: "#8a2be2", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}