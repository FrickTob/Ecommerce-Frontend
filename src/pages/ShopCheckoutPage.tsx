import React, {useState, useEffect} from 'react'
import '../styles/ShopCheckoutPage.css'
import AddressForm from '../components/AddressForm'
import PaymentForm from '../components/PaymentForm'
import AddressFormLogic from '../logic/AddressFormLogic'
import PaymentFormLogic from '../logic/PaymentFormLogic'
import CheckoutOrderSummary from '../components/CheckoutOrderSummary'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'

interface ShopCheckoutPageProps {
  cartItems : Array<ProductAndQuantity>,
  removeCartItems : React.Dispatch<ProductAndQuantity[]>,
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
}

const ShopCheckoutPage : React.FC<ShopCheckoutPageProps> = ({cartItems, removeCartItems, setIsLoading}) => {

  
  let [showPaymentForm, setShowPaymentForm] = useState(false)
  let [showAddressForm, setShowAddressForm] = useState(true)
  let [showOrderSummary, setShowOrderSummary] = useState(false)
  let [addressForm, setAddressForm] = useState(new FormData())
  let [paymentForm, setPaymentForm] = useState(new FormData())
  let [cookie, setCookie] = useCookies(['cart'])

  useEffect(() => {
    let placeOrderButton = document.getElementById('submitOrderButton') as HTMLButtonElement
    showOrderSummary ? placeOrderButton.style.display = 'block' : placeOrderButton.style.display = 'none'
  },[showOrderSummary])

  let handleAddressSubmit = (event : React.FormEvent) => {
    event.preventDefault()
    let form = event.target as HTMLFormElement
    let formData = new FormData(form)
    let formLogic = new AddressFormLogic(formData)

    formLogic.invalidInputs.forEach(className => {
      showInvalidInput(className)
    });

    if (formLogic.validForm) {
      disableChildren(form)
      setAddressForm(formData)
      setShowPaymentForm(true)
      alert('Valid Form')
    }
  }

  let handlePaymentSubmit = (event : React.FormEvent) => {
    event.preventDefault()
    let form = event.target as HTMLFormElement
    let formData = new FormData(form)
    setPaymentForm(formData)
    let formLogic = new PaymentFormLogic(formData)

    formLogic.invalidInputs.forEach(className => {
      showInvalidInput(className)
    });

    if (formLogic.validForm) {
      disableChildren(form)
      setPaymentForm(formData)
      setShowOrderSummary(true)
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

  let handleCheckout = async () => {
    if (cartItems.length === 0) return
    let itemsString = JSON.stringify(cartItems)
    setIsLoading(true)
    let response = await fetch('/api/store/checkout/', {
      method: 'PUT',
      body: itemsString
    })
    let data = await response.json()
    setIsLoading(false)
    removeCartItems([])
    setCookie('cart', [])
    alert(data)
  }

  return (
    <div className='checkoutPage'>
        <div className='orderInfoSide'>
            <div className='AddressSection'>
                <h4>Shipping Info</h4>
                <AddressForm showForm={showAddressForm} handleAddressSubmit={handleAddressSubmit}/>
            </div>
            <div className='PaymentSection'>
                <h4>Payment Info</h4>
                <PaymentForm showForm={showPaymentForm} handlePaymentSubmit={handlePaymentSubmit}/>
            </div>
            <div className='OrderSummarySection'>
                <h4>Order Summary</h4>
                <CheckoutOrderSummary showSummary={showOrderSummary} addressForm={addressForm} paymentForm={paymentForm} cartItems={cartItems}  />
            </div>
          <button onClick={handleCheckout} className='submitBtn' id='submitOrderButton'>Submit Order</button>
        </div>
        <div className='orderSummarySide'>
          <h4>Your Cart</h4>
          {cartItems.map((item) => (
            <CartItem item={item.product} quantity={item.quantity} onClick={() => {}} showButton={false} />
          ))}
        </div>
    </div>
  )
}

export default ShopCheckoutPage
