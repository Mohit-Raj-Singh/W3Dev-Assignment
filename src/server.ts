import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());



app.use('/todos', todoRoutes);

const mongoURL='mongodb+srv://mohit94e:Mohit@cluster0.jfpsrqd.mongodb.net/?retryWrites=true&w=majority'


mongoose
  .connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
