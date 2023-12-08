import React, {useState} from 'react'
import '../styles/ShopCheckoutPage.css'
import AddressForm from '../components/AddressForm'
import PaymentForm from '../components/PaymentForm'
import FormLogic from '../logic/FormLogic'

const ShopCheckoutPage = () => {

  let handleAddressSubmit = (event : React.FormEvent) => {
    event.preventDefault()
    let form = event.target as HTMLFormElement
    let formData = new FormData(form)
    let formLogic = new FormLogic(formData)

    formLogic.invalidInputs.forEach(className => {
      showInvalidInput(className)
    });

    if (formLogic.validForm) {
      disableChildren(form)
      setShowPaymentForm(true)
      alert('Valid Form')
    }
  }

  let disableChildren = (element : HTMLElement) => {
    for (let i = 0; i < element.childElementCount; i++) {
      let child = element.children[i] as HTMLElement
      if (child.tagName === 'INPUT') {
        child.setAttribute('disabled', 'true')
        child.classList.remove('invalidInput')
      }
      else if (child.childElementCount !== 0) {
        disableChildren(child as HTMLElement)
      }    
    }
  }

  let showInvalidInput = (inputId : string) => {
    let input = document.getElementById(inputId) as HTMLInputElement
    input.classList.add('invalidInput')
  }

  let [showPaymentForm, setShowPaymentForm] = useState(false)
  let [showAddressForm, setShowAddressForm] = useState(true)

  return (
    <div className='checkoutPage'>
        <div className='orderInfoSide'>
            <div className='AddressSection'>
                <h4>Shipping Info</h4>
                <AddressForm showForm={showAddressForm} handleAddressSubmit={handleAddressSubmit}/>
            </div>
            <div className='PaymentSection'>
                <h4>Payment Info</h4>
                <PaymentForm showForm={showPaymentForm} handlePaymentSubmit={handleAddressSubmit}/>
            </div>
            <div className='OrderSummarySection'>
                <h4>Order Summary</h4>
            </div>
        </div>
        <div className='orderSummarySide'>
          Order Summary Goes Here
        </div>
    </div>
  )
}

export default ShopCheckoutPage
