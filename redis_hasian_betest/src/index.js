import express from "express";
import cacheService from "./config/cache.js";

const app = express();

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/api/cache/:key", async (req, res) => {
  try {
    const { key } = req?.params;

    const cacheData = await cacheService.get(key);

    if (cacheData !== null) {
      res.json({ message: "success", data: JSON.parse(cacheData) });
    } else {
      res.json({ message: "cached data not found", data: "" });
    }
  } catch (error) {
    res.json({ message: error?.message });
  }
});

app.post("/api/cache/:key", async (req, res) => {
  try {
    const { key } = req?.params;

    await cacheService.set(key, JSON.toString(req.body?.value), 3600);

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: error?.message });
  }
});

app.delete("/api/cache/:key", async (req, res) => {
  try {
    const { key } = req?.params;

    await cacheService.del(key);

    res.json({ message: "success" });
  } catch (error) {
    res.json({ message: error?.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
