import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";
import View from "../../assets/viewon.svg";
import ViewOff from "../../assets/viewoff.svg";

import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewOn, setViewOn] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
      login(email, password);
  };
  const handleView = () => {
    setViewOn((viewOn) => !viewOn);
  };
  // const reset = (e) => {
  //   e.preventDefault();
  //   setEmail("");
  //   setPassword("");
  // };

  
  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <div>
          <span>Password:</span>
          <div className={styles.password}>
            <input
              type={viewOn ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!viewOn && (
              <img
                src={View}
                onClick={handleView}
                className={styles.view}
                alt="view"
              />
            )}
            {viewOn && (
              <img
                src={ViewOff}
                onClick={handleView}
                className={styles.view}
                alt="view"
              />
            )}
          </div>
        </div>
        
      </label>
      {!isLoading && <button className="btn">Login</button>}
      {isLoading && <button className="btn ">Loading...</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
