import asyncHandler from 'express-async-handler';
import Book from '../model/bookModel.js';
import User from '../model/userModel.js';

// @desc    Book a room
// @route   POSt /api/book
// @access  Public

const bookRoom = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id);

    if(!user){
        throw new Error('Please Login/Register to continue');
    }

    const {name, phone, checkIn, checkOut, guests, rooms,} = req.body;

    if(!name || !phone){
        throw new Error('Name and phone number are mandatory');
    }

    const booking = await Book.create({name,phone,checkIn,checkOut,guests, rooms, user:user._id});

    if(booking){
        res.status(201).json('Booking successfull')
    }
    else{
        res.status(400);
        throw new error('Invalid user details');
    }

    
});

export {bookRoom};