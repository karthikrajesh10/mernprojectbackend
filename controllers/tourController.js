import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Tour saved",
      data: savedTour,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Tour did not saved" });
  }
};

//update tour
export const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Tour Updated",
      data: updatedTour,
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({
      success: false,
      message: "Tour not Updated",
    });
  }
};

//Delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour Deleted",
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({
      success: false,
      message: "Tour not Deleted",
    });
  }
};

//get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate('reviews');

    res.status(200).json({
      success: true,
      message: "Tour found",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

//getAll tours
export const getAllTour = async (req, res) => {
  //for pagination
  const page = parseInt(req.query.page);

  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Tours found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found tours",
    });
  }
};


//get tour by search
export const getTourBySearch = async (req, res) => {

  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');

    res.status(200).json({
      success: true,
      message: "Tours found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found tour",
    });
  }
};

//get featured tours
export const getFeaturedTour = async (req, res) => {

  try {
    const tours = await Tour.find({featured:true})
    .populate('reviews')
    .limit(8);

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Featured Tours found",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

//get tour counts
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: tourCount,
      message: "Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tour count",
    });
  }
}