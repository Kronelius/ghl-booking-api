import express from 'express';
import dotenv from 'dotenv';
import getSlotsRouter from './api/getSlots.js';
import createBookingRouter from './api/createBooking.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/get-slots', getSlotsRouter);
app.use('/create-booking', createBookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
