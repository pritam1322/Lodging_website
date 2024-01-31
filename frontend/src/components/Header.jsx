import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {

    
  const { userInfo } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex bg-cyan-950 text-white justify-between py-5">
        
        <div className="flex py-2 px-16 gap-2">
            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            <span className="font-bold text-2xl">Flourshing Clime</span>
        </div>
        
        <div className="flex items-center">
            
            <div className="hidden md:block px-8">
                <div className="ml-10 flex items-baseline space-x-4">
                    <a href="/home" className="hover:bg-gray-700 underline hover:no-underline text-white text-xl  rounded-md font-sans py-2 px-6">Home</a>
                    <a href="/book" className="hover:bg-gray-700 underline hover:no-underline text-white text-xl  rounded-md font-sans py-2 px-6">Book Now</a>
                    {userInfo && (<a href="/profiles" className="hover:bg-gray-700 underline hover:no-underline text-xl text-white  rounded-md font-sans  py-2 px-4">Profiles</a>)}
                    {userInfo && (<Link to={"/"} className="hover:bg-gray-700 underline hover:no-underline text-xl text-white  rounded-md font-sans  py-2 px-4" onClick={logoutHandler}>Logout</Link>)}
                </div>
            </div>
            <div className='flex px-2'>
                <SearchComponent />
            </div>
            <Link to={'/login'} className="flex items-center gap-2 hover:bg-gray-700 rounded-full py-2 px-2">
                <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
            </Link>
        </div>
    </header>
  )
}

export default Header