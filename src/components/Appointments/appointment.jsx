import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
// import Cookies from "js-cookie";
// import Departments from "../Departments";
class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Contact: "",
      Age: "",
      Day: "",
      Speciality: "",
      Description: "",
      Id: "",
    };
    this.inputRef = React.createRef();
  }
  async handleSubmit(e) {
    console.log(this.state);
    try {
      const response = await axios.post(
        "http://localhost:3500/appointment/appointmentList",
        JSON.stringify(this.state),
        {
          headers: { "Content-Type": "application/json" ,'Access-Control-Allow-Origin': '*'},
          // withCredentials: true,
          
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      alert(response?.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
    // axios
    //   .post("http://localhost:3500/appointment/appointmentList", this.state, {
    //     headers: headers,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     alert(res.data);
    //   });
  }
  // componentDidMount() {
  // 	this.inputRef.current.focus();
  // }
  render() {
    return (
      <>
        <div id="appointmentpatient">
          <Nav tabs>
            <NavItem>
              <NavLink>
                <Link to="/loginpatient">Doctor List</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active>
                <Link to="/appointment/bookAppointment">Book Appointment</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/appointment/getPatientProfile">Edit Profile</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/appointment/patientAppointments">
                  View Appointments
                </Link>
              </NavLink>
            </NavItem>
          </Nav>
          <section id="appointment" className="appointment section-bg">
            <div className="container">
              <div className="section-title">
                <h2>Make an Appointment</h2>
                <p>fjkhj</p>
              </div>

              <form
                action="forms/appointment.php"
                method="post"
                role="form"
                className="php-email-form"
              >
                <div className="row">
                  <div className="col-md-4 form-group">
                    <input
                      // innerRef={this.inputRef}
                      type="text"
                      name="name"
                      className="form-control"
                      id="name"
                      placeholder="Your Name"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Name: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3 mt-md-0">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      data-rule="email"
                      data-msg="Please enter a valid email"
                      onChange={(e) => {
                        this.setState({ Email: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3 mt-md-0">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="Your Phone"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Contact: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 form-group mt-3">
                    <input
                      type="datetime"
                      name="date"
                      className="form-control datepicker"
                      id="date"
                      placeholder="Appointment Date"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 4 chars"
                      onChange={(e) => {
                        this.setState({ Day: e.target.value });
                      }}
                    />
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3">
                    <select
                      name="department"
                      id="department"
                      className="form-select"
                    >
                      <option value="">Select Department</option>
                      <option value="Department 1">Neurosurgeon</option>
                      <option value="Department 2">Department 2</option>
                      <option value="Department 3">Department 3</option>
                    </select>
                    <div className="validate"></div>
                  </div>
                  <div className="col-md-4 form-group mt-3">
                    <select name="doctor" id="doctor" className="form-select">
                      <option value="">Select Doctor</option>
                      <option value="Doctor 1">Doctor 1</option>
                      <option value="Doctor 2">Doctor 2</option>
                      <option value="Doctor 3">Doctor 3</option>
                    </select>
                    <div className="validate"></div>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Message (Optional)"
                  ></textarea>
                  <div className="validate"></div>
                </div>
                <div className="mb-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your appointment request has been sent successfully. Thank
                    you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Make an Appointment</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Appointment;
