import React, { useState } from "react";
import axios from "axios";
import joi from "joi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //Use Naviage
  const navigate = useNavigate();

  //error Message from Joy
  const [errorList, setErrorList] = useState([]);

  // set object of data input with init value
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  //submit data from API
  const submitFormData = async (e) => {
    //Stop Refresh form becouse this Single Page App
    e.preventDefault();

    const validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
    } else {
      //submit data from API
      const { data } = await axios.post(
        "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/create/user",
        user
      );
      if (data.status) {
        navigate("/login");
      } else {
        console.log("API Error");
      }
    }
  };

  // select data from inputes
  const getInPutValue = (e) => {
    const myUser = { ...user }; // deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  // Vaildation with Joy
  const validateFormData = () => {
    const scehma = joi.object({
      first_name: joi.string().alphanum().required().min(2).max(10),
      last_name: joi.string().alphanum().required().min(2).max(10),
      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]{3}$/)),
    });
    return scehma.validate(user, { abortEarly: false });
  };

  return (
    <>
      <div className="container bg-white w-75 text-center p-5">
        <h1 className="title">SIGNUP</h1>

        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger p-2">
            {error.message}
          </div>
        ))}
        <form onSubmit={submitFormData}>
          <div>
            <div className="form-group row">
              <div className="input-data">
                <label htmlFor="first_name" className="labelLog">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter Your First Name"
                  className="inputLog"
                  onChange={getInPutValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-data">
                <label htmlFor="last_name" className="labelLog">
                  LastName
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter Your Last Name"
                  className="inputLog"
                  onChange={getInPutValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-data">
                <label htmlFor="email" className="labelLog">
                  Email
                </label>
                <input
                  type="Email"
                  name="email"
                  placeholder="please Enter Your Email"
                  className="inputLog"
                  onChange={getInPutValue}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-data">
                <label htmlFor="password" className="labelLog">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="please Enter Your Password"
                  className="inputLog"
                  onChange={getInPutValue}
                />
              </div>
            </div>
          </div>

          <button className="btn btnC my-3 px-5 py-3">Sgin-up</button>
          <p className="text-center">
            if you already have an account?
            <Link to="/login" className="text-danger">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
