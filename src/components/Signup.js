import { Box, Grid, TextField ,Button} from "@material-ui/core";
import React, { useState , useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import axios from "axios";
import './style.css'

function Signup({ isAuth, setIsAuth}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [resp, setResp] = useState("");

  const navigate = useNavigate();

  const clearset = () => {
    setEmail("");
    setName("");
    setConfirmPassword("");
    setConfirmPasswordError("");
    setPassword("");
  };

  const validationForm = () => {
    if (name.length < 1) {
      return false;
    } else if (password.length < 5) {
      return false;
    } else if (confirmPassword !== password) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!confirmPassword || !password) {
      setConfirmPasswordError("");
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords must match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validationForm()){
    const registered = {
        email: email,
        password: password,
        name: name,
        };
    
        axios
        .post(`http://localhost:3002/signup`, registered)
        .then((response) => {
            if (response.status === 200) {
            window.localStorage.setItem("name", response.data.user.name);
            window.localStorage.setItem("email", response.data.user.email);
            window.localStorage.setItem("id", response.data.user._id);
            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem("isAuth", true);
            setIsAuth(true);
            
            console.log("signed in Successfully");
            clearset();
            //   window.location.href="/paint"
            navigate("/paint");
            } else if (response.status === 203) {
            setResp(response.data.message);
            console.log(resp);
            }
        })
        .catch((error) => {
            console.log(error.message);
            console.log(resp);
            clearset();
        });
    } else window.alert("all feilds are required");
  };

  return (
    <div className="Login_Form">
      {resp.length > 0 && (
        <div style={{ width: "21rem", margin: "auto" }} className="Alert_type">
          <Alert severity="error">
            <AlertTitle>ERROR OCCURED</AlertTitle>
            <strong>{resp}</strong>
          </Alert>
        </div>
      )}

      <Grid container>
        <Grid item lg={6} md={12} sm={12}>
          <div className="left_box">
            <h1>Every canvas is a journey all its own</h1>
          </div>
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <div className="right_box">
            <form className="login_form" onSubmit={handleSubmit}>
              <div>
              <TextField
                  style={{ paddingBottom: "15px", width: "100%" }}
                  value={name}
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  label="Name"
                />
                <TextField
                  style={{ paddingBottom: "15px", width: "100%" }}
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  label="Email"
                />

                <TextField
                  style={{ paddingBottom: "15px", width: "100%" }}
                  value={password}
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="Password"
                />
                <span className="error">{confirmPasswordError}</span>
                <TextField
                  style={{ paddingBottom: "15px", width: "100%" }}
                  value={confirmPassword}
                  variant="outlined"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  label="Confirm Password"
                />
              </div>

              <div>
                    <p>Already a member ? <Link exact to='/'>Login</Link></p>
                </div>

              <div className="auth_button">
                <Button size='large'onClick={handleSubmit} style={{background: '#121212' ,color: 'white'}}>Singup</Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;