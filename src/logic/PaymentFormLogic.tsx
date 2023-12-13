

class PaymentFormLogic {
    invalidInputs : Array<string>
    validForm : boolean = false

    constructor(formData : FormData) {
        this.invalidInputs = []

        this.validateCardNumber(formData.get('cardNumber') as string)
        this.validateNameOnCard(formData.get('nameOnCard') as string)
        this.validateExpirationDate(formData.get('expirationDate') as string)
        this.validateCVV(formData.get('cvv') as string)

        this.validForm = this.invalidInputs.length === 0
    }


    validateCardNumber = (cardNumber : string) => {
        if (cardNumber.length === 0) this.invalidInputs.push('cardNumber')
    }
    validateNameOnCard = (nameOnCard : string) => {
        if (nameOnCard.length === 0) this.invalidInputs.push('nameOnCard')
    }
    validateExpirationDate = (expirationDate : string) => {
        if (expirationDate.length === 0) this.invalidInputs.push('expirationDate')
    }
    validateCVV = (cvv : string) => {
        if (cvv.length === 0) this.invalidInputs.push('cvv')
    }


}

export default PaymentFormLogic