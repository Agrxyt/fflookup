export default async function handler(req, res) {
  const { uid } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "No UID provided" });
  }

  try {
    // Free Fire UID lookup API (public BD source)
    const response = await fetch(`https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry?productId=1&itemId=1&catalogId=376&paymentId=0&gameId=${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data && data.data && data.data.gameName) {
      res.status(200).json({
        uid,
        name: data.data.gameName,
      });
    } else {
      res.status(404).json({ error: "Lookup failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
