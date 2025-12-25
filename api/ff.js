export default async function handler(req, res) {
  const { uid, region = "bd" } = req.query;

  if (!uid) return res.status(400).json({ error: "UID required" });

  try {
    const apiRes = await fetch(
      `https://info-ob49.vercel.app/api/account/?uid=${uid}&region=${region}`
    );
    const data = await apiRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
      nickname: data?.basicInfo?.nickname || null
    });

  } catch (err) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
