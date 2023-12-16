import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const Register = () => {
  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required()
  }).required()
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });
  return (

    <form className="container rounded-md dark:bg-black flex flex-col h-96 justify-evenly align-items-center " onSubmit={handleSubmit((data) => console.log(data))}>
      <input placeholder='Username' {...register('username')} />
      <input placeholder='Email' {...register('email')} />
      {errors.email && <p> {errors.email?.message} </p>}
      <input placeholder='Password' type='password' {...register('password', { pattern: /\d+/ })} />
      {errors.age && <p>Please enter number for age.</p>}
      <input className='bg-sky-500 text-white w-20 rounded-lg p-2  md:hover:bg-red-400 sm:hover:bg-slate-600' type="submit" />
    </form> 
)}

export default Register