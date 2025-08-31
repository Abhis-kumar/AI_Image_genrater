import { User } from "../models/User.js";

export const createUser = async (req, res) => {
    const { name, email, password, address } = req.body;

    if (name == '' || email == '' || password == '' || address == '') {
        return res.json({
            message: "All fields are required"
        });
    }
    let user;
    try {
        user = await User.create({
            name, email, password, address
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


export const getUsers = async (req, res) => {

    let users;
    try {
        users = await User.find({});
    } catch (error) {
        return res.status(200).json({
            message: "users not found",
            error: error.message
        })
    }

    if (!users || users === "" || users === null){
        return res.status(404).json({
            message:"users not found"
        });
    }

    return res.status(200).json({
        users
    });
}