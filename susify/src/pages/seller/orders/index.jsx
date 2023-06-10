import { useStateProvider } from "@/context/StateContext";
import { GET_SELLER_ORDERS_ROUTE } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function index() {
  const [cookies] = useCookies();
  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();

  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(GET_SELLER_ORDERS_ROUTE, {
          withCredentials: true,
        });
        // console.log(data.orders),
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    if (userInfo) getOrders();
  }, [userInfo]);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All Sells on Process</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-black">
          <thead className="text-xs text-black uppercase bg-gray-50 bg-lilac text-black-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock Left
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Send Message
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white dark:bg-white-800 hover:bg-gray-50"
                  key={order.id}
                >
                  <th scope="row" className="px-6 py-4 ">
                    {order.id}
                  </th>
                  <th scope="row" className="px-6 py-4 ">
                    {order.listing.title}
                  </th>
                  <td className="px-6 py-4">
                    {order.buyer.fullName} ({order.buyer.username})
                  </td>
               
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.listing.stock}</td>
                  <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>


                  <td className="px-6 py-4 ">
                    <Link
                      href={`/buyer/orders/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default index;
