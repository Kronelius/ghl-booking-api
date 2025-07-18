import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', async (req, res) => {
  const start = new Date().toISOString();
  const end = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const response = await axios.get(
      `https://rest.gohighlevel.com/v1/calendars/${process.env.CALENDAR_ID}/freeSlots`,
      {
        params: {
          start,
          end,
          timezone: process.env.TIMEZONE
        },
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`
        }
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error fetching slots');
  }
});

export default router;
