import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, startTime, endTime } = req.body;

  try {
    const response = await axios.post(
      `https://rest.gohighlevel.com/v1/calendars/${process.env.CALENDAR_ID}/events`,
      {
        startTime,
        endTime,
        title: `AI Demo – ${name}`,
        email,
        name,
        description: 'Booked via Voice AI demo'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`
        }
      }
    );

    res.json({ message: 'Appointment booked', data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Booking failed');
  }
});

export default router;
