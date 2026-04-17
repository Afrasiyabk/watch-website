import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { createOrder } from '../store/slices/orderSlice';
import {useNavigate} from 'react-router-dom'


const CartPage = () => {

  const { cartItems} = useSelector(state => state.cart);
  const { error , success} = useSelector(state => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const [orderData, setOrderData] = useState({
  orderItems: [],
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: 'Cash on Delivery',
  totalPrice: 0,
});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

const handleSubmit = (event) => {
  event.preventDefault();

  const finalOrder = {
    ...orderData,
    orderItems: cartItems.map(item => ({
      product: item._id,
      qty: item.qty,
      price: item.price
    })),
    totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) + 15
  };

  dispatch(createOrder(finalOrder));
  if (!error?.message) {
    handleClose()
    dispatch(clearCart())
    navigate('/')
  }

};

  const onChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prevState => ({
      ...prevState,
      shippingAddress: {
        ...prevState.shippingAddress,
        [name]: value,
      }
    }));
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className='relative flex flex-col lg:flex-row gap-10 p-5! md:p-8! lg:p-[70px]!'>

      {cartItems.length === 0 ?  (
        <div className='py-10'>
          <h2 className='text-2xl font-bold'>Your cart is empty</h2>
          <p className='text-gray-500 mt-2'>Add some items to your cart!</p>
        </div>
      ) : (
        <>
          {/* LEFT SIDE */}
      <div className='flex flex-col gap-5! lg:w-[65%]'>

        <h2 className='text-3xl font-bold'>Your Cart</h2>
        
        <table className='w-full border-collapse'>
          
          <thead className='border-b border-gray-300'>
            <tr>
              <th className='text-left w-[30%]'>Product</th>
              <th className='text-left w-[15%]'>Price</th>
              <th className='text-left w-[25%]'>Quantity</th>
              <th className='text-left w-[20%]'>Total</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems?.map((item) => (
              <tr key={item._id} className='border-b border-gray-200'>

                <td className='py-4!'>
                  <div className='flex items-center gap-3!'>
                    <img src={item?.image} className='w-16! h-16! object-cover rounded' />
                    <span className='font-medium'>{item?.name}</span>
                  </div>
                </td>

                <td>${item?.price}</td>

                <td>
                  <div className='flex items-center gap-2!'>
                    <button onClick={()=>{dispatch(decreaseQty(item?._id))}} className='px-2! py-1! bg-gray-200 text-black rounded cursor-pointer'><FaMinus /></button>
                    <span>{item?.qty}</span>
                    <button onClick={()=>{dispatch(increaseQty(item?._id))}} className='px-2! py-1! bg-gray-200 text-black rounded cursor-pointer'><FaPlus /></button>
                  </div>
                </td>

                <td>${item?.price * item?.qty}</td>

                <td>
                  <button onClick={()=>dispatch(removeFromCart(item._id))} className='flex items-center justify-center bg-red-500 text-white p-3! rounded cursor-pointer'>
                    <FaMinus />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* RIGHT SIDE CHECKOUT */}
      <div className='lg:w-[35%] bg-[#222] shadow-lg rounded-2xl p-6! h-fit'>

        <h3 className='text-xl font-bold mb-4!'>Order Summary</h3>

        <div className='flex justify-between mb-2!'>
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>

        <div className='flex justify-between mb-2!'>
          <span>Shipping</span>
          <span>$10</span>
        </div>

        <div className='flex justify-between mb-4!'>
          <span>Tax</span>
          <span>$5</span>
        </div>

        <hr className='mb-4!' />

        <div className='flex justify-between font-bold text-lg mb-4!'>
          <span>Total</span>
          <span>${subtotal + 10 + 5}</span>
        </div>

        <button onClick={handleClickOpen} className='w-full bg-green-600 text-white py-3! rounded-xl font-bold hover:bg-green-700'>
          Proceed to Checkout
        </button>

      </div>
        </>
      )
      }

       <Dialog open={open} onClose={handleClose}>
        <DialogContentText>
          {error?.message}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
        <DialogTitle className='text-amber-400!'>Enter Your Order Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To complete your purchase, please enter your shipping address and payment details here. We will send you a confirmation email once your order is processed.
          </DialogContentText>
            <TextField
            value={orderData.shippingAddress.address}
              autoFocus
              required
              margin="dense"
              id="address"
              name="address"
              label="Enter Your Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChange}
            />
            <div className='flex flex-col md:flex-row justify-center gap-2'>
              <TextField
              value={orderData.shippingAddress.country}
              autoFocus
              required
              margin="dense"
              id="country"
              name="country"
              label="Enter Your Country"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChange}
            />
            <TextField
              value={orderData.shippingAddress.city}
              autoFocus
              required
              margin="dense"
              id="city"
              name="city"
              label="Enter Your City"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChange}
            />
            </div>
            <TextField
              value={orderData.shippingAddress.postalCode}
              autoFocus
              required
              margin="dense"
              id="postalCode"
              name="postalCode"
              label="Enter Your Postal Code"
              type="number"
              fullWidth
              variant="standard"
              onChange={onChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className='bg-red-400! text-white!'>Cancel</Button>
          <Button type="submit" className='bg-amber-400! text-white!'>
            Done
          </Button>
        </DialogActions>
          </form>
      </Dialog>
    

    </div>
  )
}

export default CartPage;