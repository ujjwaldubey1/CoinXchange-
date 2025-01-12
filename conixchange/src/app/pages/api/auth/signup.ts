import dbconnections from "@/app/lib/dbconnections";
import User from "@/app/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }
  
  const {name, email, password, StoreName, StoreAddress, PhoneNumber} = req.body;

  if(!name || !email || !password || !StoreName || !StoreAddress || !PhoneNumber) {
    return res.status(400).json({message: 'All fields are required'});
  }

  const emailRejex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRejex.test(email)) {
    return res.status(400).json({message: 'Invalid email address'});
  }
  if(password.length < 6) {
    return res.status(400).json({message: 'Password must be at least 6 characters long'});
  }
  if(isNaN(PhoneNumber) || PhoneNumber.toString().length !== 10) {
    return res.status(400).json({message: 'Invalid phone number'});
  }
  try {
    dbconnections();
    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      StoreName,
      StoreAddress,
      PhoneNumber
    });
    const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(201).json({result, token});
    
    await result.save();
    return res.status(201).json({message: 'User created successfully'});

  } catch (error) {
    console.log('Something went wrong', error);
    return res.status(500).json({message: 'Something went wrong'});
  }
}
export default signup;