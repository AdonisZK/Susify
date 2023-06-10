import React, { useEffect, useState } from "react";
import axios from "axios";
import { CREATE_ORDER } from "../utils/constants";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies, setCookies] = useCookies();
  const router = useRouter();
  const { listingId } = router.query;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { listingId },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          },
        );
        setClientSecret(data.clientSecret)
        // console.log(data.clientSecret)
      } catch (err) {
        console.log(err);
      }
    };
    if (listingId) createOrder();
  }, [listingId]);

  return <div> checkout </div>;
}

export default checkout;
