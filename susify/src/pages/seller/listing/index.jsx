import { GET_USER_LISTING_ROUTE } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function index() {
  const [listing, setListing] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getUserListing = async () => {
      try {
        const { data } = await axios.get(GET_USER_LISTING_ROUTE, {
          withCredentials: true,
        });
        console.log(data);
        setListing(data.listing);
      } catch (err) {
        console.log(err);
      }
    };
    getUserListing();
  }, []);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m5 text-2xl font-semibold mb-5">All your listing</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black dark:text-black-400">
          <thead className="text-xs text-black uppercase bg-white-50 bg-lilac dark:text-black-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listing.map(({ title, category, stock, price, id }) => {
              return (
                <tr className="bg-white dark:bg-white-800 hover:bg-white-50 dark:hover:bg-white-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-white-900 whitespace-nowrap dark:text-black"
                  >
                    {title}
                  </th>
                  <td className="px-6 py-4">{category}</td>
                  <td className="px-6 py-4">{stock}</td>
                  <td className="px-6 py-4">{price}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={`/seller/listing/${id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
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
