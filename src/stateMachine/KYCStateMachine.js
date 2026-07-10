class KYCStateMachine {

    constructor() {

        this.transitions = {

            INITIATED: [
                "DOCUMENT_VERIFIED",
                "FAILED"
            ],

            DOCUMENT_VERIFIED: [
                "AML_PENDING"
            ],

            AML_PENDING: [
                "AML_COMPLETED",
                "REJECTED"
            ],

            AML_COMPLETED: [
                "APPROVED",
                "REJECTED"
            ],

            APPROVED: [],

            REJECTED: [],

            FAILED: []
        };

    }

    canTransition(currentState, nextState) {

        return this.transitions[currentState]?.includes(nextState);

    }

}

module.exports = new KYCStateMachine();