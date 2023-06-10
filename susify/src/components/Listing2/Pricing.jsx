import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiRightArrowAlt, BiSolidInbox } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaStar, FaBox, FaMapMarkerAlt } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { HOST } from "../../utils/constants";
import { useRouter } from "next/router";

function Pricing() {
  const [{ listingData, userInfo }, dispatch] = useStateProvider();
  const router = useRouter();

  return (
    <>
      {listingData && (
        <div className="sticky top-36 mb-10 h-max w-96">
          <div className="border p-10 flex flex-col gap-5">
            <div className="flex justify-between">
              <h4 className="text-md font-normal text-[#74767e]">
                {listingData.title}
              </h4>
              <h6 className="font-medium text-lg">IDR {listingData.price}</h6>
            </div>
            <div>
              <div className="text-[#62646a] font-semibold text-sm flex gap-6">
                <div className="flex items-center gap-2">
                  <FaBox className="text-xl" />
                  <span>{listingData.stock} Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-xl" />
                  <span>{listingData.createdBy?.address}</span>
                </div>
              </div>
              <ul></ul>
            </div>
            {/* <ul className="flex gap-1 flex-col">
              {listingData.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <BsCheckLg className="text-lilac text-lg" />
                  <span className="text-[#4f5156]">{feature}</span>
                </li>
              ))}
            </ul> */}
            {listingData.userId === userInfo?.id ? (
              <button
                className="flex items-center bg-lilac text-white py-2 justify-center font-bold text-lg relative rounded"
                onClick={() => router.push(`/seller/listing/${listingData.id}`)}
              >
                <span>Edit</span>
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            ) : (
              <button
                className="flex items-center bg-lilac text-white py-2 justify-center font-bold text-lg relative rounded"
                onClick={() => router.push(`/checkout?listingId=${listingData.id}`)}
              >
                <span>Continue</span>
                <BiRightArrowAlt className="text-2xl absolute right-4" />
              </button>
            )}
          </div>
          {listingData.userId !== userInfo?.id && (
            <div className="flex items-center justify-center mt-5">
              <button className=" w-5/6 hover:bg-[#74767e] py-1 border border-[#74767e] px-5 text-[#6c6d75] hover:text-white transition-all duration-300 text-lg rounded font-bold">
                Contact Me
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Pricing;
