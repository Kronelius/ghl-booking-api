export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.GHL_API_KEY;
  const CALENDAR_ID = process.env.CALENDAR_ID;
  const TIMEZONE = process.env.TIMEZONE;

  const start = new Date().toISOString();
  const end = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const response = await fetch(
      `https://rest.gohighlevel.com/v1/calendars/${CALENDAR_ID}/freeSlots?start=${start}&end=${end}&timezone=${TIMEZONE}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
}
