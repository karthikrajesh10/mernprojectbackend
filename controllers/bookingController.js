import Booking from "../models/booking.js"

//create new booking
export const createBooking = async(req,res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save();

        res.status(200).json({
            success: true,
            message: "Booking saved",
            data: savedBooking
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};

//get single booking
export const getBooking = async(req,res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id);

        res.status(200).json({
            success: true,
            message: "Success",
            data: book
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
};

//get all bookings
export const getAllBookings = async(req,res) => {

    try {
        const books = await Booking.find();

        res.status(200).json({
            success: true,
            message: "Success",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};
