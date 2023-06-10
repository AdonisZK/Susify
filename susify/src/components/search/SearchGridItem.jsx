import { HOST } from "../../utils/constants";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaStar } from "react-icons/fa";

function SearchGridItem({ listing }) {
  const router = useRouter();
  const calculateRatings = () => {
    const { reviews } = listing;
    let rating = 0;
    if (!reviews?.length) {
      return 0;
    }
    reviews?.forEach((review) => {
      rating += review.rating;
    });
    return (rating / reviews.length).toFixed(1);
  };

  return (
    <div
      className="max-w-[300px] flex flex-col gap-2 p-1 cursor-pointer mb-8"
      onClick={() => router.push(`/listing/${listing.id}`)}
    >
      <div className="relative w-64 h-64">
        <Image
          src={`${HOST}/uploads/${listing.images[0]}`}
          alt="listing"
          fill
          className="rounded-xl"
        />
      </div>
      <div>
        <p className="line-clamp-2 text-[#404145]">{listing.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <div>
          {listing.createdBy.profileImage ? (
            <Image
              src={HOST + "/" + listing.createdBy.profileImage}
              alt="profile"
              height={30}
              width={30}
              className="rounded-full"
            />
          ) : (
            <div className="bg-lilac h-7 w-7 flex items-center justify-center rounded-full relative">
              <span className="text-lg text-white">
                {listing.createdBy.email[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-md ">
          <strong className="font-medium">{listing.createdBy.username}</strong>
        </span>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        <FaStar />
        <span>
          <strong className="font-medium">{calculateRatings()}</strong>
        </span>
        <span className="text-[#74767e]">({listing?.reviews?.length})</span>
      </div>
      <div>
        <strong className="font-medium">IDR {listing.price}</strong>
      </div>
    </div>
  );
}

export default SearchGridItem;
