import React, { useEffect } from "react";
import Pricing from "../../components/Listing2/Pricing";
import Details from "../../components/Listing2/Details";
import { useRouter } from "next/router";
import axios from "axios";
import { GET_LISTING_DATA } from "../../utils/constants";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";

function Listing2Page() {
  const router = useRouter();
  const { listingId } = router.query;
  const [{ listingData, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    dispatch({ type: reducerCases.SET_LISTING_DATA, listingData: undefined });
  }, [dispatch]);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const {
          data: { listing },
        } = await axios.get(`${GET_LISTING_DATA}/${listingId}`);
        console.log(listing);
        dispatch({ type: reducerCases.SET_LISTING_DATA, listingData: listing });
      } catch (err) {
        console.log(err);
      }
    };
    if (listingId) fetchListingData();
  }, [listingId, dispatch]);

  return (
    <div className="grid grid-cols-3 mx-32 gap-20">
      <Details />
      <Pricing />
    </div>
  );
}

export default Listing2Page;
