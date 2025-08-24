import { Data } from "../models/data.js"




export const createdata = async (req, res) => {
  const { name, address, phoneNo, qualification } = req.body;

  if (name == '' || phoneNo == '' || qualification == '' || address == '') {
    return res.json({
      message: "All fields are required"
    });
  }
  let user;
  try {
    user = await data.create({
      name, address, phoneNo, qualification
    })
  } catch (error) {
    return res.json({
      message: "Server Error",
      error: error.message,
      errorName: error.name
    });
  }

  if (!user || user == "" || user == null) {
    return res.status(500).json({
      message: "User not created"
    })
  }

  return res.status(201).json({
    message: "User created successfully",
    user
  })
}


export const getdata = async (req, res) => {

  let users;
  try {
    users = await User.find({});
  } catch (error) {
    return res.status(200).json({
      message: "users not found",
      error: error.message
    })
  }

  if (!users || users === "" || users === null) {
    return res.status(404).json({
      message: "users not found"
    });
  }

  return res.status(200).json({
    users
  });
}
