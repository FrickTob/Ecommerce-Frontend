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

  return (
    <form id="paymentForm" onSubmit={handlePaymentSubmit}>
    <div className="payment-grid">
        <label>Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" required />
        <div className='expCVV'>
            <label>Expiration Date:</label>
            <label>CVV:</label>
            <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" required />
            <input type="text" id="cvv" name="cvv" required />
        </div>
    </div>

    <input type="submit" value="Submit"/>
</form>
  )
}

export default PaymentForm
