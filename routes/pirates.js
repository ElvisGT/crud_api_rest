const { Router } = require("express");
const Pirates = require("../controllers/pirates");

const pirates = new Pirates();

const router = Router();

router.get("/",pirates.getPirates)

router.post("/",pirates.createPirates)

router.put("/:id",pirates.updatePirates)

router.delete("/:id",pirates.deletePirates)


module.exports = router;