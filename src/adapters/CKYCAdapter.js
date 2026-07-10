class CKYCAdapter {

    async verify(documentNumber, documentType) {

        console.log("Verifying using CKYC...");

        return {
            verified: true,
            vendor: "CKYC",
            documentNumber,
            documentType,
            responseId: "CKYC-" + Date.now()
        };
    }
}

module.exports = CKYCAdapter;