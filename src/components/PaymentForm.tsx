import React, {useEffect} from 'react'

interface PaymentFormProps {
    handlePaymentSubmit : (e : React.FormEvent<HTMLFormElement>) => void
    showForm : boolean
}
const PaymentForm : React.FC<PaymentFormProps> = ({handlePaymentSubmit, showForm}) => {

  useEffect(() => {
    let addressForm = document.getElementById('paymentForm') as HTMLFormElement
    if (showForm) {
        addressForm.style.display = 'block'
    }
    else {
        addressForm.style.display = 'none'
    }
},[showForm])

  let validateCardNumberInput = (e : React.KeyboardEvent<HTMLInputElement>) => {
    // only allow numeric input and add - automatically
    if (e.key === 'Backspace' || 'Tab') return
    if (!isFinite(Number(e.key))) {
      e.preventDefault()
      return
    }
    let input = e.target as HTMLInputElement
    let inputVal = input.value
  }
  let validateExpirationInput = (e : React.KeyboardEvent<HTMLInputElement>) => {
    // only allow numeric input and add / automatically
    if (e.key === 'Backspace' || 'Tab') return
    if (!isFinite(Number(e.key))) {
      e.preventDefault()
      return
    }
    let input = e.target as HTMLInputElement
    let inputVal = input.value
    if (inputVal.length === 2) {
      input.value = inputVal + '/'
    }
  }
  let validateCVVInput = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || 'Tab') return
    if (!isFinite(Number(e.key))) {
      e.preventDefault()
      return
    }
  }

  return (
    <form id="paymentForm" onSubmit={handlePaymentSubmit}>
    <div className="payment-grid">
        <label>Card Number:</label>
        <input type="text" onKeyDown={validateCardNumberInput} id="cardNumber" name="cardNumber" maxLength={19}  />
        <label>Name on Card:</label>
        <input type="text" id="nameOnCard" name="nameOnCard"  />
        <div className='expCVV'>
            <label>Expiration Date:</label>
            <label>CVV:</label>
            <input type="text" onKeyDown={validateExpirationInput} id="expirationDate" name="expirationDate" placeholder="MM/YYYY" maxLength={7}  />
            <input type="text" onKeyDown={validateCVVInput} id="cvv" name="cvv" maxLength={3}  />
        </div>
    </div>

    <input type="submit" value="Submit"/>
</form>
  )
}

export default PaymentForm
