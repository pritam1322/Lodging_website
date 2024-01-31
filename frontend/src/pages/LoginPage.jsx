import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };


  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="mt-32 ">
            <h1 className="text-4xl text-center mb-4 font-serif">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={submitHandler}>
                <input type='email' placeholder={'your@gmail.com'} value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type='password' placeholder={'password'} value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
                <div className='text-center py-2 text-gray-500'>
                    Don&apos;t have an account yet ? 
                    <Link to={'/register'} className='underline text-black'> Register now </Link>
                </div>
            </form>
            {isLoading && <Loader />}
        </div>
    </div>
  )
}

export default LoginPage