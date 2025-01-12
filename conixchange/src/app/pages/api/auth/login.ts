import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/app/Schemas/UserSignuSchema";

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser) {
      return res.status(404).json({message: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({message: 'Invalid credentials'});
    }
    const token = JWT.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.status(200).json({result: existingUser, token});

  } catch (error) {
    console.log('Something went wrong', error);
    return res.status(500).json({message: 'Something went wrong'});
  }
}
export default login;