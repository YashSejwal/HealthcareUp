import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import "./register.css";
import Navbar from "../../components/Navbar";
import styles from "../../style";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className="reg">
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <Link to ="/loginpatient">Sign In</Link>
            </p>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} style={{marginLeft:"100px"}}>
              <label htmlFor="username">
                Username                  
              </label> <br/> <br/>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"1200px",marginLeft:"-112px"}}>
              <input
                style={{ borderColor: "black",color:"black" }}
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              /> 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <p style={{color:"white"}}><FontAwesomeIcon icon={faInfoCircle} />
4 to 24 characters.
                Must begin with a letter. 
                Letters, numbers, underscores, hyphens allowed.</p>
                </div>
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                
              </p><br/> 
             
              <label htmlFor="password">
                Password  <br/>
              </label>
              <br/> 
              <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"1180px",marginLeft:"-122px"}}>
              <input
                style={{ borderColor: "black",letterSpacing:"3px","::placeholder": {
                    color: "red", // Customize the color of the placeholder text
                    fontStyle: "italic", // Add additional styles as needed
                  }, }}

                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Password"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <p style={{color:"white"}}><FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                Must include an uppercase letter, a number and a
                special character.</p>
              </div>
              <br/> <br/>

              <label htmlFor="confirm_pwd">
                Confirm Password:
              </label>
              <br/> <br/>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"1180px",marginLeft:"-352px"}}>
              <input
                style={{ borderColor: "black" }}
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <p style={{color:"white"}}><FontAwesomeIcon icon={faInfoCircle} />
               Must be same as the password.</p>
              </div><br/> <br/><br/> 
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              <br />
              <span className="line">
                {/*put router link here*/}
                <a href="#">Sign In</a>
              </span>
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Register;
