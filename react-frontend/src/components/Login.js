import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { doPasswordReset } from '../firebase/FirebaseFunctions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        alert("Either email or password is incorrect");
      }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };

  return (
    <section>
      <div className="container"></div>
      <div className="login">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="inputBox">
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="inputBox">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" id="btn" />
          </div>
        </form>   
        <button className='forgotPassword' onClick={passwordReset}>
        Forgot Password
        </button>
      </div>
    </section>
  );
}

export default Login;

