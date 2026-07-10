const DigiLockerAdapter = require("../adapters/DigiLockerAdapter");
const CKYCAdapter = require("../adapters/CKYCAdapter");

class VendorFactory {
    static getVendor(vendorName) {

        switch (vendorName.toUpperCase()) {

            case "DIGILOCKER":
                return new DigiLockerAdapter();

            case "CKYC":
                return new CKYCAdapter();

            default:
                throw new Error("Unsupported Vendor");
        }
    }
}

module.exports = VendorFactory;