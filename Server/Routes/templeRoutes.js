const express = require("express");
const router = express.Router();
const { getAllTemples, createTemple, updateTemple, deleteTemple } = require("../Controllers/temple.Controller");    

router.get("/", getAllTemples);
router.post("/", createTemple);
router.put("/:id", updateTemple);
router.delete("/:id", deleteTemple);    

module.exports = router;