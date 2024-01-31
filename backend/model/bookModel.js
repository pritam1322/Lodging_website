import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    checkIn: {
        type:Date, required:true
    },
    checkOut: {
        type:Date, required:true
    },
    guests:{
        type:Number, required:true
    },
    rooms:{
        type:Number, required:true
    },
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
});

const Book = mongoose.model('Book', BookSchema);

export default Book;