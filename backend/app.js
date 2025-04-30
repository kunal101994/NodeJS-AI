import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import connectDB from './db/db.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


connectDB();

app.get('/', (req, res) =>{
  res.send('Hello World!')
})



export default app;

