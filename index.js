import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './DB/connectDB.js';
import authRoute from './routes/authRoute.js'
const port = 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173"}));

// Connect to the database and then start the server
const startServer = async () => {
    try {
        await connectDB();
        // routes
        app.use('/api/v1', authRoute);
        app.get("/",(req,res)=>{
            res.send("home route")
        })
        // 
        app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
};

startServer();
