import {Router} from "express";
import logController from "../controllers/log";

const router = Router();

router.get("/:page", logController.getLogsByPagination);

module.exports = router;
