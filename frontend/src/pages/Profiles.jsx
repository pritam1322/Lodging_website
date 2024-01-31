import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Profiles = () => {

    const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };


  return (
    <nav className="w-full flex justify-center mt-8 mb-8">
        

        <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-4">
                <div className="flex gap-2 rounded-full px-4 py-2 border border-black bg-cyan-950 text-white font-bold justify-content-around">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My Profiles
                </div>
                <div className="mt-16">
                <h1 className="text-4xl text-center mb-4">Update Profile</h1>
                    <form className="max-w-md mx-auto" onSubmit={submitHandler}>
                        <input type='text' placeholder={'John Doe'} value={name} onChange={ev => setName(ev.target.value)}/>
                        <input type='email' placeholder={'your@gmail.com'} value={email} onChange={ev => setEmail(ev.target.value)}/>
                        <input type='password' placeholder={'password'} value={password} onChange={ev => setPassword(ev.target.value)}/>
                        <button className="primary">Update</button>
                        {isLoading && <Loader/>}
                    </form>
                </div>
            </div>
        </div>

        
    </nav>
  )
}

export default Profiles