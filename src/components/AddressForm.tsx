import React, {useEffect} from 'react'

interface AddressFormProps {
    handleAddressSubmit : (e : React.FormEvent<HTMLFormElement>) => void
    showForm : boolean
}

const AddressForm : React.FC<AddressFormProps> = ({handleAddressSubmit, showForm}) => {
    useEffect(() => {
        let addressForm = document.getElementById('addressForm') as HTMLFormElement
        if (showForm) {
            addressForm.style.display = 'block'
        }
        else {
            addressForm.style.display = 'none'
        }
    },[showForm])


  return (
    <form id='addressForm' onSubmit={handleAddressSubmit}>
                    <div className='nameLine'>
                      <label >First Name:</label>
                      <label >Last Name:</label>
                      <input type="text" id="firstName" name="firstName"  />
                      <input type="text" id="lastName" name="lastName"  />
                    </div>

                    <label >Address:</label>
                    <input type="text" id="address" name="address"  />
                    <div className='cityStateZip'>
                      <label>City:</label>
                      <label>State:</label>
                      <label>Zip Code:</label>
                      <input type="text" id="city" name="city"  />
                      <input type="text" id="state" name="state"  />
                      <input type="text" id="zipCode" name="zipCode"  />
                    </div>
                    <label>Country:</label>
                    <input type="text" id="country" name="country"  />

                    <input type="submit" value="Submit"/>
                </form>
  )
}

export default AddressForm
