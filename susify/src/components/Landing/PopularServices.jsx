import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    { name: "Figures", image: "/item1alt.png" },
    { name: "Shoes", image: "/item2.png" },
    {
      name: "Plushes",
      image: "/item3.png",
    },
    {
      name: "Games",
      image: "/item4new.png",
    },
    {
      name: "Chairs",
      image: "/item5new.png",
    },
    // { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    // {
    //   name: "Illustration",
    //   label: "Color your dreams",
    //   image: "/service7.jpeg",
    // },
    // { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];
  return (
    <div className="mx-20 my-16">
      <h2 className="text-4xl mb-5 text-[#404145] font-bold">
        Popular Listing
      </h2>
      <ul className="flex flex-wrap gap-16 ">
        {popularServicesData.map(({ name, label, image }) => {
          return (
            <li
              key={name}
              className="relative cursor-pointer"
              onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
            >
              <div className="absolute z-10 text-white left-4 top-4 " >
                <span>{label}</span>
                <h6 className="font-extrabold text-2xl ">{name}</h6>
              </div>
              <div className="h-80 w-72 ">
                <Image src={image} fill alt="service" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PopularServices;
