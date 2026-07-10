const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authMiddleware");
const { getAuditLogs } = require("../controllers/auditController");

router.get("/", authenticate, getAuditLogs);

module.exports = router;