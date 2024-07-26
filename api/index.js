import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(
  process.env.MONGO_URL
).then( () => {
    console.log('Database is connected')
}).catch((err) => {
    console.log(err)
})

app.listen(port, () => {
  console.log(`Server is Runing on Port ${port}`);
});


app.use('/api/user' , userRouter)
app.use('/api/auth' , authRouter)