export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, startTime, endTime } = req.body;
  const API_KEY = process.env.GHL_API_KEY;
  const CALENDAR_ID = process.env.CALENDAR_ID;

  try {
    const response = await fetch(
      `https://rest.gohighlevel.com/v1/calendars/${CALENDAR_ID}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime,
          endTime,
          title: `AI Demo – ${name}`,
          email,
          name,
          description: "Booked via Voice AI demo",
        }),
      }
    );
    const data = await response.json();
    res.status(200).json({ message: "Appointment booked", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
}
