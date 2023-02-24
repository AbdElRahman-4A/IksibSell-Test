import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import joi from "joi";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataStore";

export default function Login() {
  const { token, login } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  //error Message from Joy
  const [errorList, setErrorList] = useState([]);

  // set object of data input with init value
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //submit data from API
  const submitForemData = async (e) => {
    //Stop Refresh form becouse this Single Page App
    e.preventDefault();

    const validationResponse = validateFormData();
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
    } else {
      //submit data from API
      const { data } = await axios.post(
        "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/login",
        user
      );
      if (!!data.access_token) {
        login(data.access_token);
      } else {
        console.log("API Error");
      }
    }
  };

  // Vaildation with Joy
  const validateFormData = () => {
    const scehma = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });
    return scehma.validate(user, { abortEarly: false });
  };

  // select data from inputes
  const getInPutValue = (e) => {
    const myUser = { ...user }; // deep copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  return (
    <>
      <div className="container bg-white w-75 text-center p-5">
        <h1 className="title row">SGININ</h1>

        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger p-2">
            {error.message}
          </div>
        ))}
        <form onSubmit={submitForemData}>
          <div className="form-group row">
            <div className="input-data  ">
              <label htmlFor="email" className="exampleInputEmail1 labelLog">
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
            <div className="input-data ">
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

          <button className="btn btnC my-3 px-5 py-3">Login</button>
          <p className="text-center">
            if you haven`t Register yet?
            <Link to="/register" className="text-danger">
              Register Now
            </Link>
          </p>
        </form>
      </div>

      {/* <form> */}

      {/* <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
        <input type="text" id="form3Example1" class="form-control" />
        <label class="form-label" for="form3Example1">First name</label>
      </div>
    </div>
    <div class="col">
      <div class="form-outline">
        <input type="text" id="form3Example2" class="form-control" />
        <label class="form-label" for="form3Example2">Last name</label>
      </div>
    </div>
  </div>

  
  <div class="form-outline mb-4">
    <input type="email" id="form3Example3" class="form-control" />
    <label class="form-label" for="form3Example3">Email address</label>
  </div>

  
  <div class="form-outline mb-4">
    <input type="password" id="form3Example4" class="form-control" />
    <label class="form-label" for="form3Example4">Password</label>
  </div>

   
  <div class="form-check d-flex justify-content-center mb-4">
    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
    <label class="form-check-label" for="form2Example33">
      Subscribe to our newsletter
    </label>
  </div>

  
  <button type="submit" class="btn btn-primary btn-block mb-4">Sign up</button>

   
  <div class="text-center">
    <p>or sign up with:</p>
    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" class="btn btn-secondary btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form> */}
    </>
  );
}
