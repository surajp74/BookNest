import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("demo@booknest.local"),
    [password, setPassword] = useState("demo123"),
    [error, setError] = useState(""),
    navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/orders");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Invalid credentials.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>

        <h1>Sign in to BookNest.</h1>

        <p>Use the demo account or create your own.</p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="button primary full" type="submit">
            Sign in
          </button>
        </form>

        <small>Demo: demo@booknest.local / demo123</small>

        <Link to="/books" className="back-link">
          Continue as guest
        </Link>
      </div>
    </div>
  );
}