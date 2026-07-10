const AuditLog = require("../models/AuditLog");

class AuditService {

    async log(user, action, module, details = {}) {

        await AuditLog.create({

            user,

            action,

            module,

            details

        });

    }

}

module.exports = new AuditService();