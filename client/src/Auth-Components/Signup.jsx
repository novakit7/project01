import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../assets/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // 🔹 Redirect if logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  // 🔹 OTP resend timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ================= SEND OTP =================
  const handleSendOtp = async () => {
    const cleanName = name.trim();
    const cleanEmail = email;
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return alert("Fill all fields first");
    }

    setLoading(true);

    try {
      console.log("SEND OTP BODY:", {
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
      });

      const res = await API.post("/auth/send-Otp", {
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
      });

      alert(res.data.message || "OTP sent ✅");

      setOtpSent(true);
      setTimer(30); // 30 sec cooldown

    } catch (err) {
      console.error("SEND OTP ERROR:", err);
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!otpSent) {
      return alert("Send OTP first");
    }

    if (!cleanOtp) {
      return alert("Enter OTP");
    }

    setLoading(true);

    try {
      console.log("VERIFY BODY:", {
        email: cleanEmail,
        otp: cleanOtp,
      });

      const res = await API.post("/auth/signup", {
        email: cleanEmail,
        otp: cleanOtp,
      });

      // store auth
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Signup successful 🎉");

      navigate("/home");

    } catch (err) {
      console.error("VERIFY ERROR:", err);
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="s-container">
      <div className="signup-box">
        <h2>🚀 Create Account</h2>

        <form onSubmit={handleVerifyOtp}>
          {/* NAME */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={otpSent}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={otpSent}
          />

          {/* SEND OTP BUTTON */}
          {!otpSent && (
            <button
              type="button"
              className="otp-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}

          {/* OTP INPUT + VERIFY */}
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>

              {/* RESEND OTP */}
              <button
                type="button"
                disabled={timer > 0}
                onClick={handleSendOtp}
                className="resend-btn"
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
              </button>
            </>
          )}

          {/* LOGIN REDIRECT */}
          <span
            style={{ cursor: "pointer", marginTop: "10px", display: "block" }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Log In
          </span>
        </form>
      </div>
    </div>
  );
}