class AMLService {
    async checkCustomer(documentNumber) {

        console.log("Running AML Screening...");

        // Simulate AML Screening
        const sanctionedNumbers = [
            "999999999999",
            "888888888888"
        ];

        const pepNumbers = [
            "777777777777"
        ];

        let riskScore = 10;
        let amlStatus = "CLEAR";
        let riskLevel = "LOW";

        if (sanctionedNumbers.includes(documentNumber)) {
            amlStatus = "SANCTIONED";
            riskScore = 95;
            riskLevel = "HIGH";
        }
        else if (pepNumbers.includes(documentNumber)) {
            amlStatus = "PEP";
            riskScore = 70;
            riskLevel = "MEDIUM";
        }

        return {
            amlStatus,
            riskScore,
            riskLevel
        };
    }
}

module.exports = new AMLService();


