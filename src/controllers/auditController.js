const AuditLog = require("../models/AuditLog");

// Get All Audit Logs
const getAuditLogs = async (req, res) => {
    try {

        const logs = await AuditLog.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: logs.length,
            data: logs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getAuditLogs
};