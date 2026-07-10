const express = require("express");
const router = express.Router();

const { getAuditLogs } = require("../controllers/auditController");
const { authenticate } = require("../middleware/authMiddleware");

// Protected Route
router.get("/", authenticate, getAuditLogs);

module.exports = router;