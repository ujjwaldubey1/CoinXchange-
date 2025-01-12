import mongoose from "mongoose";
import {Schema, model,Document} from "mongoose";

export interface IUserSignup extends Document {
    name: string;
    email: string;
    password: string;
    StoreName: string;
    StoreAddress: string;
    PhoneNumber: number;
}

const UserSignupSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    StoreName: {type: String, required: true},
    StoreAddress: {type: String, required: true},
    PhoneNumber: {type: Number, required: true}
});

const User = mongoose.models.User ||model<IUserSignup>('User', UserSignupSchema);
export default User;