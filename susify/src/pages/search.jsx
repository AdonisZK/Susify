import SearchGridItem from "../components/Search/SearchGridItem";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEARCH_LISTING_ROUTE } from "../utils/constants";
import axios from "axios";

function search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [listing2, setlisting] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${SEARCH_LISTING_ROUTE}?searchTerm=${q}&category=${category}}`
        );
        console.log({ listing2 });
        setlisting(data.listing2);
      } catch (err) {
        console.log(err);
      }
    };
    if (category || q) getData();
  }, [category, q]);
  return (
    <>
      {listing2 && (
        <div className="mx-24 mb-24">
          {q && (
            <h3 className="text-4xl mb-10">
              Results for <strong>{q}</strong>
            </h3>
          )}
          <div className="flex gap-4">
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Category
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Price
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Location
            </button>
          </div>
          <div>
            <div className="my-4">
              <span className="text-[#74767e] font-medium ">
                {listing2.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4">
              {listing2.map((listing) => (
                <SearchGridItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default search;
