import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
      };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-32">
                <h1 className="text-4xl text-center mb-4 font-serif">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={submitHandler}>
                    <input type='text' placeholder={'John Doe'} value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type='email' placeholder={'your@gmail.com'} value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type='password' placeholder={'password'} value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Register</button>
                    {isLoading && <Loader/>}
                    <div className='text-center py-2 text-gray-500'>
                        Already a member ? 
                        <Link to={'/login'} className='underline text-black'> Login </Link>
                    </div>
                </form>
            </div>
        </div>
      )
    }

export default Register