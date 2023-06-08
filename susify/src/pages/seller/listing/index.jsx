import { GET_USER_LISTING_ROUTE } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import axios from "axios";

function index() {
  const [ listing, setListing ] = useState([]);

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
  return <div> index </div>;
}

export default index;
