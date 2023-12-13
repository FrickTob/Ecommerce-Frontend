import React, {useEffect} from 'react'

interface CheckoutOrderSummaryProps {
    showSummary : boolean,
    addressForm : FormData,
    paymentForm : FormData,
    cartItems : ProductAndQuantity[]
}

const CheckoutOrderSummary : React.FC<CheckoutOrderSummaryProps> = ({showSummary, addressForm, paymentForm, cartItems}) => {
  useEffect(() => {
    let orderSummaryBox = document.getElementById('orderSummaryBox') as HTMLDivElement
    if (showSummary) orderSummaryBox.style.display = 'block'
    else orderSummaryBox.style.display = 'none'

  },[showSummary])
  return (
    <div id='orderSummaryBox'>
        {Array.from(addressForm.entries()).map((entry) => (
          <div>
          <p>{entry[0]}</p>
          <h3>{entry[1] as string}</h3>
          </div>
        ))}
        {Array.from(paymentForm.entries()).map((entry) => (
          <div>
          <p>{entry[0]}</p>
          <h3>{entry[1] as string}</h3>
          </div>
        ))}
        {cartItems.map((item) => (
          <div>
            <p>{item.product.product_title}</p>
            <p>{item.quantity}</p>
            <p>{(item.product.product_price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
    </div>
  )        
}

export default CheckoutOrderSummary

