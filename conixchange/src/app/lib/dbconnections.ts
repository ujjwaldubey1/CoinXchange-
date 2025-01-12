// Purpose: Establish connection to MongoDB database.
import mongoose from "mongoose";

const dbconnections = () =>{

    mongoose.connect(`${process.env.MONGO_DB_URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
}
export default dbconnections;