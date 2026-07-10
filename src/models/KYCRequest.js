const mongoose = require("mongoose");

const kycRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        documentType: {
            type: String,
            enum: [
                "AADHAAR",
                "PAN",
                "PASSPORT",
                "DRIVING_LICENSE"
            ],
            required: true,
        },

        documentNumber: {
            type: String,
            required: true,
        },

        documentUrl: {
            type: String,
            default: "",
        },

        vendor: {
            type: String,
            enum: [
                "DIGILOCKER",
                "CKYC",
                "MANUAL"
            ],
            default: "MANUAL",
        },

        // Vendor Verification Status
        status: {
            type: String,
            enum: [
                "INITIATED",
                "DOCUMENT_VERIFIED",
                "AML_PENDING",
                "AML_COMPLETED",
                "APPROVED",
                "REJECTED",
                "FAILED"
            ],
            default: "INITIATED",
        },

        // AML Result
       amlStatus: {
    type: String,
    enum: [
        "PENDING",
        "CLEAR",
        "PEP",
        "SANCTIONED"
    ],
    default: "PENDING",
},

        // AML Risk Score
        riskScore: {
            type: Number,
            default: 0,
        },

        // AML Risk Level
        riskLevel: {
            type: String,
            enum: [
                "LOW",
                "MEDIUM",
                "HIGH"
            ],
            default: "LOW",
        },

        remarks: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("KYCRequest", kycRequestSchema);