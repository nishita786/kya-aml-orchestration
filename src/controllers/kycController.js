const KYCRequest = require("../models/KYCRequest");
const VendorFactory = require("../factory/VendorFactory");
const AMLService = require("../services/AMLService");
const KYCStateMachine = require("../stateMachine/KYCStateMachine");
const AuditService = require("../services/AuditService");

// ======================================================
// Create KYC Request
// ======================================================
const createKYC = async (req, res) => {
    try {

        const {
            documentType,
            documentNumber,
            vendor
        } = req.body;

        // Vendor Verification
        const selectedVendor = VendorFactory.getVendor(vendor);

        const verificationResult = await selectedVendor.verify(
            documentNumber,
            documentType
        );

        // AML Screening
        const amlResult = await AMLService.checkCustomer(documentNumber);

        const status = verificationResult.verified
            ? "DOCUMENT_VERIFIED"
            : "FAILED";

        // Save KYC
        const kyc = await KYCRequest.create({
            user: req.user.id,
            documentType,
            documentNumber,
            vendor,
            status,
            amlStatus: amlResult.amlStatus,
            riskScore: amlResult.riskScore,
            riskLevel: amlResult.riskLevel,
            remarks: verificationResult.responseId
        });

        // Audit Log
        await AuditService.log(
            req.user.id,
            "CREATE_KYC",
            "KYC",
            {
                vendor,
                documentType,
                documentNumber,
                status,
                amlStatus: amlResult.amlStatus,
                riskScore: amlResult.riskScore,
                riskLevel: amlResult.riskLevel
            }
        );

        res.status(201).json({
            success: true,
            message: "KYC Verification Completed",
            vendorResponse: verificationResult,
            amlResult,
            data: kyc
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================================
// Get Logged In User KYC Requests
// ======================================================
const getMyKYC = async (req, res) => {

    try {

        const requests = await KYCRequest.find({
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================
// Get KYC By ID
// ======================================================
const getKYCById = async (req, res) => {

    try {

        const request = await KYCRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "KYC Request Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: request
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================================
// Update KYC Status
// ======================================================
const updateKYCStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const request = await KYCRequest.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "KYC Request Not Found"
            });

        }

        const oldStatus = request.status;

        const allowed = KYCStateMachine.canTransition(
            oldStatus,
            status
        );

        if (!allowed) {

            return res.status(400).json({
                success: false,
                message: `Invalid state transition from ${oldStatus} to ${status}`
            });

        }

        request.status = status;

        await request.save();

        // Audit Log
        await AuditService.log(
            req.user.id,
            "UPDATE_KYC_STATUS",
            "KYC",
            {
                previousStatus: oldStatus,
                newStatus: status
            }
        );

        res.status(200).json({
            success: true,
            message: "KYC Status Updated Successfully",
            data: request
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createKYC,
    getMyKYC,
    getKYCById,
    updateKYCStatus
};