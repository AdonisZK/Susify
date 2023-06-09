import ImageUpload from "../../../components/ImageUpload";
import { categories } from "../../../utils/categories";
import { EDIT_LISTING_ROUTE, GET_LISTING_DATA, HOST } from "../../../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function EditListing() {
  const [cookies] = useCookies();
  const router = useRouter();
  const { listingId } = router.query;
  const inputClassName =
    "block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    "mb-2 text-lg font-medium text-gray-900 dark:text-dark";
  const [files, setFile] = useState([]);
  const [features, setfeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    stock: 1,
    price: 0,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const {
          data: { listing },
        } = await axios.get(`${GET_LISTING_DATA}/${listingId}`);

        setData({ ...listing,  });

        listing.images.forEach((image) => {
          const url = HOST + "/uploads/" + image;
          const fileName = image;
          fetch(url).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            const files = new File([blob], fileName, { contentType });
            setFile([files]);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (listingId) fetchListingData();
  }, [listingId]);

  const editListing = async () => {
    const { category, description, price, stock, title } =
      data;
    if (
      category &&
      description &&
      title &&
      files.length &&
      price > 0 &&
      stock > 0
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const listingData = {
        title,
        description,
        category,
        price,
        stock,
      };
      const response = await axios.put(
        `${EDIT_LISTING_ROUTE}/${data.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.jwt}`,
          },
          params: listingData,
        }
      );
      if (response.status === 200) {
        router.push("/seller/listing");
      }
    }
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h1 className="text-6xl text-gray-900 mb-5">Edit a listing</h1>
      <h3 className="text-3xl text-gray-900 mb-5">
        Edit the details for the listing
      </h3>

      <div className="flex flex-col gap-5 mt-10">
        <div className="grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Listing Name
            </label>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              type="text"
              id="title"
              className={inputClassName}
              placeholder="Listing Name"
              required
            />
          </div>
          <div>
            <label htmlFor="categories" className={labelClassName}>
              Select a Category
            </label>
            <select
              id="categories"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              name="category"
              onChange={handleChange}
              value={data.category}
              defaultValue="Choose a Category"
            >
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className={labelClassName}>
              Listing Description
            </label>
            <textarea
              id="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description"
              name="description"
              value={data.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-11">
            <div>
              <label htmlFor="stock" className={labelClassName}>
                Listing Stock
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                id="stock"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                placeholder="Enter your stock"
              />
            </div>
            <div>
              <label htmlFor="price" className={labelClassName}>
                Price ( IDR )
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                id="price"
                placeholder="Enter a price"
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Listing Images
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <button
          className="border mt-5 text-lg font-semibold px-5 py-3 border-[#C8A2C8] bg-[#C8A2C8] text-white rounded-md"
          type="button"
          onClick={editListing}
        >
          Edit Listing
        </button>
      </div>
    </div>
  );
}

export default EditListing;
