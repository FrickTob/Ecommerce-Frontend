/// change validate functions to update functions that also validate the logic
/// change form validation to its own function so you can check it after every update


class FormLogic {
    invalidInputs : Array<string>
    validForm : boolean = false

    constructor(formData : FormData) {
        this.invalidInputs = []

        this.validateFirstName(formData.get('firstName') as string)
        this.validateLastName(formData.get('lastName') as string)
        this.validateAddress(formData.get('address') as string)
        this.validateCity(formData.get('city') as string)
        this.validateState(formData.get('state') as string)
        this.validateZip(formData.get('zipCode') as string)
        this.validateCountry(formData.get('country') as string)

        this.validForm = this.invalidInputs.length === 0
    }
    public validateFirstName = (firstName : string) => {
        if (firstName.length === 0) this.invalidInputs.push('firstName')
    }
    public validateLastName = (lastName : string) => {
        if (lastName.length === 0) this.invalidInputs.push('lastName')
    }
    public validateAddress = (address : string) => {
        if (address.length === 0) this.invalidInputs.push('address')
    }
    public validateCity = (city : string) => {
        if (city.length === 0) this.invalidInputs.push('city')
    }
    public validateState = (state : string) => {
        if (state.length === 0) this.invalidInputs.push('state')
    }
    public validateZip = (zip : string) => {
        if (zip.length === 0) this.invalidInputs.push('zipCode')
    }
    public validateCountry = (country : string) => {
        if (country.length === 0) this.invalidInputs.push('country')
    }
}

export default FormLogic