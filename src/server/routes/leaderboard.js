import {Router} from "express";
import ldbController from "../controllers/leaderboard";
const router = Router();

router.get("/trees", ldbController.getLeaderboardByTrees);
router.get("/leaves", ldbController.getLeaderboardByLeaves);
router.get("/", ldbController.getAll);

module.exports = router;
