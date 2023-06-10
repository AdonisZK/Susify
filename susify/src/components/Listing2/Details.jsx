import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/constants";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

function Details() {
  const [{ listingData, hasOrdered }] = useStateProvider();
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (listingData) {
        console.log(listingData);
      setCurrentImage(listingData.images[0]);
    }
  }, [listingData]);

  return (
    <>
      {listingData && currentImage !== "" && (
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#404145] mb-1">
            {listingData.title}
          </h2>
          <div className="flex items-center gap-2">
            <div>
              {listingData.createdBy?.profileImage ? (
                <Image
                  src={HOST + "/" + listingData.createdBy?.profileImage}
                  alt="profile"
                  height={30}
                  width={30}
                  className="rounded-full"
                />
              ) : (
                <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                  <span className="text-xl text-white">
                    {listingData.createdBy?.email[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <h4 className="text-[#27272a] font-bold">
                {listingData.createdBy?.fullName}
              </h4>
              <h6 className="text-[#74767e]">@{listingData.createdBy?.username}</h6>
            </div>
            {/* <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(averageRatings) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
