import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useBookRoomMutation } from '../slices/usersApiSlice';
import { booking } from '../slices/authSlice';
import Loader from '../components/Loader';
import {differenceInCalendarDays} from "date-fns";

export default function BookingWidget() {

  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [guests,setGuests] = useState(1);
  const [rooms,setRooms] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [book, {isLoading}] = useBookRoomMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id;


  useEffect(() => {
    if (userInfo) {
      navigate('/book');
    }
  }, [navigate, userInfo]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  let price = rooms * 600 * numberOfNights;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await book({ name,phone,checkIn,checkOut, guests, rooms, userId}).unwrap();
      dispatch(booking({ ...res }));
      alert('Booking Successfull');
      navigate('/');
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };
  
  const guestsHandler = async(e) =>{
    try{
      const inputValue = parseInt(e.target.value, 10);
      if((rooms * 2) + 1 >= inputValue ){
        setGuests(inputValue);
      }
    }
    catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };
  return (
    <form className="bg-white shadow p-4 rounded-2xl" onSubmit={submitHandler}>
      <div className="text-2xl text-center">
        Price: {price}/-
      </div>
      <div className="border rounded-2xl mt-4 w-">
        <div className="py-3 px-4 border">
          <label>Full name :</label>
          <input type="text" value={name} required onChange={ev => setName(ev.target.value)}/>
          <label>Phone number :</label>
          <input type="text" value={phone} className="w-full border border-gray mt-2" required onChange={ev => setPhone(ev.target.value)}/>
        </div>
        
        <div className="flex">
          <div className="py-3 px-4 text-start w-3/6">
            <label>Check in :</label>
            <input type="date" value={checkIn} className="ml-4 border border-gray" required onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out :</label>
            <input type="date" value={checkOut} className="ml-4 border border-gray" required onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 gap-16 border-t flex flex-row ">
          <div className="flex gap-2 mr-4">
            <label>Guests :</label>
            <input type="number" value={guests} className="ml-0.5 border border-gray" required onChange={guestsHandler}/>
          </div>
          <div className="flex gap-2">
            <label>Rooms :</label>
            <input type="number" value={rooms} className="ml-0.5 border border-gray" required onChange={ev => setRooms(ev.target.value)}/>
          </div>
        </div>
      </div>
      <button  className="primary mt-4">
        Book this place
          <span></span>
      </button>
      
    </form>
  );
}