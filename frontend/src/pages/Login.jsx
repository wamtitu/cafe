import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useContext } from "react";
import  { context } from '../context/Context'



const login = () => {
  const {dispatch} = useContext(context)
  const navigate = useNavigate();
  const Schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    
    Axios.post("http://localhost:8081/auth/login", data)
      .then(({data}) => {
        if(data.token){
          
          navigate("/")
          dispatch({ type: "login_success",payload : data})
        }
      })
      .catch(({response}) => {
        console.log(response)
        // alert(response.data.error)
      });
  };

  return (
    <div className="login-container">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
        <div className="input-control">
          <input type="text" placeholder="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div className="input-control">
          <input
            type="password"
            placeholder="password"
          
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className="remember-forgot">
          <div className="label">
            <input type="checkbox" />
            <p>Remember Me</p>
          </div>
          <Link to="#">Forgot Password</Link>
        </div>
        
        <div className="login-buttons">
        <input type="submit" value="Login" className="btn" />
          <div className="navigation">
            <p>I don't have an account</p>
            <Link to="/signup">Sign-Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default login