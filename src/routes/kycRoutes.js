const express = require("express");
const router = express.Router();

const {
  createKYC,
  getMyKYC,
  getKYCById,
  updateKYCStatus,
} = require("../controllers/kycController");

const { authenticate } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/kyc:
 *   post:
 *     summary: Create a new KYC request
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documentType
 *               - documentNumber
 *               - vendor
 *             properties:
 *               documentType:
 *                 type: string
 *                 example: AADHAAR
 *               documentNumber:
 *                 type: string
 *                 example: "123412341234"
 *               vendor:
 *                 type: string
 *                 example: DIGILOCKER
 *     responses:
 *       201:
 *         description: KYC created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authenticate, createKYC);

/**
 * @swagger
 * /api/kyc:
 *   get:
 *     summary: Get all KYC requests of the logged-in user
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of KYC requests
 */
router.get("/", authenticate, getMyKYC);

/**
 * @swagger
 * /api/kyc/{id}:
 *   get:
 *     summary: Get a KYC request by ID
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: KYC details
 *       404:
 *         description: KYC Request Not Found
 */
router.get("/:id", authenticate, getKYCById);

/**
 * @swagger
 * /api/kyc/{id}/status:
 *   put:
 *     summary: Update KYC Status
 *     tags: [KYC]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: DOCUMENT_VERIFIED
 *     responses:
 *       200:
 *         description: Status Updated Successfully
 *       400:
 *         description: Invalid Status Transition
 */
router.put("/:id/status", authenticate, updateKYCStatus);

module.exports = router;