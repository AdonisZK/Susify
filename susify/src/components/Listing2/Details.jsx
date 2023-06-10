import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/constants";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

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
              <h6 className="text-[#74767e]">
                @{listingData.createdBy?.username}
              </h6>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer 
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-h-[1000px] max-w-[1000px] overflow-hidden">
              <Image
                src={HOST + "/uploads/" + currentImage}
                alt="Listing"
                height={1000}
                width={1000}
                className="hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              {listingData.images.length > 1 &&
                listingData.images.map((image) => (
                  <Image
                    src={HOST + "/uploads/" + image}
                    alt="listing"
                    height={100}
                    width={100}
                    key={image}
                    onClick={() => setCurrentImage(image)}
                    className={`${
                      currentImage === image ? "" : ""
                    } cursor-pointer transition-all duration-500`}
                  />
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl my-5 font-medium text-[#404145]">
              About this listing
            </h3>
            <div>
              <p>{listingData.description}</p>
            </div>
            <div className="">
            <h3 className="text-3xl my-5 font-medium text-[#404145]">
              About the Seller
            </h3>
            <div className="flex gap-4 mb-12">
              <div>
                {listingData.createdBy.profileImage ? (
                  <Image
                    src={HOST + "/" + listingData.createdBy.profileImage}
                    alt="profile"
                    height={120}
                    width={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {listingData.createdBy.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex  gap-2 items-center">
                  <h4 className="font-medium text-lg">
                    {listingData.createdBy.fullName}
                  </h4>
                  <span className="text-[#74767e]">
                    @{listingData.createdBy.username}
                  </span>
                </div>
                <div>
                  <p>{listingData.createdBy.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${
                          Math.ceil(listingData.averageRating) >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-yellow-500">
                    {listingData.averageRating}
                  </span>
                  <span className="text-[#74767e]">
                    ({listingData.totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
