import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting } } = useForm();

    const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    navigate('/Home', { state: data });
  };

  return (
    <>
      <h1 className='attendity'> Attendity</h1>
      {isSubmitting && <div>Loading...</div>}
      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("email", {
            required: { value: true, message: "Email is required" }
          })} placeholder='Your college email id' type="email" id="" />

        <input {...register("password", {
            required: { value: true, message: "Password is required" }
          })} placeholder='Your password' type="password" />

        <input disabled={isSubmitting} type="submit" value="Submit"  />
      </form>
    </>
  )
}

export default App
