import React from "react";
import {
  EditISDelever,
  fetchOrderData,
  orderDelete,
} from "../store/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Orders = () => {
  const dispatch = useDispatch();
  const { allOrders, error, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderData());
  }, []);

  const EditDelever = async (id) => {
    await dispatch(EditISDelever(id)).unwrap();
    dispatch(fetchOrderData());
  };

  return (
    <div className="p-8! flex flex-col gap-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {error && <p className="text-red-500">{error.message}</p>}

      {allOrders?.length === 0 ? (
        <div className="py-10!">
          <h2 className="text-2xl font-bold">No Orders Found</h2>
          <p className="text-gray-500 mt-2!">
            Start shopping to place your first order!
          </p>
        </div>
      ) : (
        allOrders.map((order) => (
          <div
            key={order._id}
            className="text-white rounded-2xl p-6! shadow-lg flex flex-col gap-5"
          >
            {/* ORDER HEADER */}
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-400">Order ID</p>
                <p className="font-mono text-xs">{order._id}</p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <span
                  className={`px-3! py-1! rounded text-sm ${
                    order.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
                <button
                  disabled={order.isDelivered}
                  className={`${
                    order.isDelivered
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  onClick={() => EditDelever(order._id)}
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    <span
                      className={`px-3! py-1! rounded text-sm ${
                        order.isDelivered ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </span>
                  )}
                </button>
                <button
                  className="bg-red-400 p-3! rounded-full text-white cursor-pointer"
                  onClick={async () => {
                    await dispatch(orderDelete(order._id)).unwrap();
                    dispatch(fetchOrderData());
                  }}
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    <RiDeleteBin6Fill size={"20px"} />
                  )}
                </button>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="flex flex-col gap-4">
              {order.orderItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-gray-700 pb-3!"
                >
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.product?.name}</h2>
                    <p className="text-sm text-black">
                      ${item.price} × {item.qty}
                    </p>
                  </div>

                  <div className="font-bold text-amber-400">
                    ${item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-black">Shipping Address</p>
                <p className="text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.country} -{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>

              <div>
                <p className="text-black">Payment</p>
                <p className="text-gray-600">{order.paymentMethod}</p>
                <p className="text-gray-600 mt-1!">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center border-t border-gray-700 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-green-400">
                ${order.totalPrice}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
