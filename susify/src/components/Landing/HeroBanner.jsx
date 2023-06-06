import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
function HomeBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 2 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="h-[750px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image
          alt="hero"
          src="/bg-fp1.webp"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        {
         <Image
          alt="hero"
          src="/bg-fp2new.webp"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />}
      </div>
      <div className="z-10 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
   
        <div className="flex align-middle ">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-14 w-[1595px] pl-10 rounded-md rounded-r-none"
              placeholder={`Cari di Susify`}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        
          <button
            className="bg-lilac text-white px-12 text-lg font-semibold rounded-r-md"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Search
          </button>
        </div>
     
        <div className="text-white flex gap-4" style={{ marginBottom: '415px' }}>
          Recommended:
          <ul className="flex gap-5">
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 	cursor-pointer"
              onClick={() => router.push("/search?q=playstation 5")}
            >
              Playstation 5
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=figure")}
            >
              Figure
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=amogus plush")}
            >
              Amogus Plush
            </li>
            <li
              className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300	cursor-pointer"
              onClick={() => router.push("/search?q=switch zelda totk")}
            >
              Switch Zelda TOTK
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
