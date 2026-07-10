class DigiLockerAdapter {
    async verify(documentNumber, documentType) {

        console.log("Verifying using DigiLocker...");

        return {
            verified: true,
            vendor: "DIGILOCKER",
            documentNumber,
            documentType,
            responseId: "DL-" + Date.now()
        };
    }
}

module.exports = DigiLockerAdapter;