const express = require("express");
const router = express.Router();
const {
  getAllShloks,
  createShlok,
  updateShlok,
  deleteShlok
} = require("../Controllers/shlokController");

router.get("/", getAllShloks);
router.post("/", createShlok);
router.put("/:id", updateShlok);
router.delete("/:id", deleteShlok);

module.exports = router;
