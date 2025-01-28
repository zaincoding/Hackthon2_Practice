'use client';
import {ShoppingCart} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useCart} from '../context/CartContext';
import Image from 'next/image';
// import CheckOut from '../../actions/CheckOut';




export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [displayFrom, setDisplayForm] = useState(false)
  const [delay,setDelay] = useState(true);
  const [isOrderCreated, setIsOrderCreated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    const timer = setTimeout(() =>{
      setDelay(false)
    },4000)

    return () => clearTimeout(timer)
  }, [])


  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setCustomerInfo({...customerInfo,[name]:value})
  }

  const handleCheckOut = () =>{

try{
    //  CheckOut(cart,customerInfo)

     setIsOrderCreated(true)
     setDisplayForm(false)

     setTimeout(() =>{
      window.location.reload()
     }, 2000)
}
 catch(error){
  console.log("Checkout failed:", error)
  setError("Checkout failed. Please try again.")
}
  }
  

  return (
    <main className="p-4">

      {/* Cart */}
      <div className="mt-8">




      {delay ? (<></>):( 

        <div>
                <div className='flex space-x-6'>
                <h1 className="text-2xl mb-4 font-serif">Shopping Cart</h1>
                <ShoppingCart size={36}/>
                </div>
                <h2 className="text-xl mb-4">Your Cart</h2>
      

        </div>
      )}
     {isOrderCreated && <p className='text-2xl font-semibold text-green-600'>Order is created in Sanity</p>}
     {error && <p className='text-red-500'>{error}</p>}

       {cart.length === 0 ? (

        delay? (<></>):(
      <p>Your cart is empty.</p>
        )


        )
         : (

              
          cart.map((item) => (
            <table key={item.id} className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 w-full" >
              <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Item Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50"
                      >
          
          <td className='border border-gray-300 px-4 py-2 truncate max-w-xs'><Image src={item.image_url} 
            alt={item.name}
          width={50}
          height={50}/>
               
          </td>
          
                        <td className='border border-gray-300 px-4 py-2 truncate max-w-xs'>{item.name}</td>
          
                                <td className="border border-gray-300 px-4 py-2 truncate-max-xs">${item.price.toFixed(2)}</td>
          
                  <td className="border border-gray-300 px-4 py-2 truncate-max-xs">{item.quantity}</td>
          
                  <td className="border border-gray-300 px-4 py-2 truncate-max-xs">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
          
                  <td className="border border-gray-300 px-4 py-2 truncate-max-xs">
                    <button
                      onClick={() => removeFromCart(item.id )}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  </td>
          
                      </tr>
                      </table>
          
          ))

          
        )}
        {cart.length === 0 ?(
          <></>
        ): (
          <div className='w-[800px]'>
              <button onClick={() => setDisplayForm(true)}
               className='max-w-full bg-green-500 hover:bg-blue-400 text-white text-lg p-2
              rounded-md mt-4'>CheckOut</button>
{displayFrom && (
<div className='border border-t-yellow-950 max-w-full space-y-6'>  
      <h2 className='text-2xl font-semibold border font-sans'>Customer Information</h2>
      <div>
        <label className='font-semibold text-xl'>Name: </label>
        <input
        
        type= "text"
        name= "name"
        value={customerInfo.name}
        onChange={handleInputChange}
        placeholder='Enter your name'
        size={30}

        className='bg-slate-200 text-center p-2 rounded-md mx-2'
        />
      </div>

      <div>
        <label className='font-semibold text-xl'>Email: </label>
        <input
        type= "email"
        name= "email"
        value={customerInfo.email}
        onChange={handleInputChange}
        placeholder='Enter your Email'

        size={30}
        className='bg-slate-200 text-center p-2 rounded-md mx-2'

        />
      </div>

      <div>
        <label className='font-semibold text-xl'>Phone: </label>
        <input
        type= "phone"
        name= "phone"
        value={customerInfo.phone}
        onChange={handleInputChange}
        placeholder='Enter your Phone'
        size={30}
        className='bg-slate-200 text-center p-2 rounded-md mx-1'

        />
      </div>
      <button onClick={handleCheckOut} className='bg-blue-400 p-2 rounded-md text-white font-semibold text-xl font-sans'>Submit</button>


</div>

)}
              </div>
)}
      </div>
    </main>
  );
}
