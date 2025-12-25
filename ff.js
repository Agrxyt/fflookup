export default async function handler(req, res) {
  const { uid, region = "bd" } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID required" });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const apiRes = await fetch(
      `https://info-ob49.vercel.app/api/account/?uid=${uid}&region=${region}`,
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    if (!apiRes.ok) {
      return res.status(502).json({ error: "Upstream API failed" });
    }

    const data = await apiRes.json();

    return res.status(200).json({
      nickname: data?.basicInfo?.nickname || null
    });

  } catch (err) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
