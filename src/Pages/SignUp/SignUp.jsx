import styles from "./SignUp.module.css";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import View from "../../assets/viewon.svg";
import ViewOff from "../../assets/viewoff.svg";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewOn, setViewOn] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleView = () => {
    setViewOn((viewOn) => !viewOn);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Sign Up</h2>
      <label>
        <span>Username:</span>
        <input
          type="name"
          name="username"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
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
      {!isLoading && <button className="btn">Sign Up </button>}
      {isLoading && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
}
