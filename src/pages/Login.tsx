import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "../hooks/useAuth";
import "../styles/login.css";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) return;

    const result = login(email, password);

    if (!result) {
      alert("Invalid credentials");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Sign in</Dialog.Title>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button">Login</button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
