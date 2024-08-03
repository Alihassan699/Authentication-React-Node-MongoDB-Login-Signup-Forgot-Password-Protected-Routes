import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { connectdb } from './config/db.js';


import cors from 'cors';
import { config } from 'dotenv';

config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for the frontend URL
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: frontendUrl
    , credentials: true
 }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database and handle any connection errors
connectdb().catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});

//routes
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/', (req, res) =>{
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});