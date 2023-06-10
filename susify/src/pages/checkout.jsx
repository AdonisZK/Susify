import React, { useEffect, useState } from "react";
import axios from "axios";
import { CREATE_ORDER } from "../utils/constants";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";


function checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies, setCookies] = useCookies();
  const router = useRouter();
  const stripePromise = loadStripe("pk_test_51NHNCKJB6wzGHIxru8vXuNaXslutNr3alJU4wcWP1eLxG6ZZRDjTOeoaIkHWpoQigiMmXJ3rUaA1MpM7AUzQV09S00bGBsaV2J");

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

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl">
        Please complete the payment to place the order.
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default checkout;
