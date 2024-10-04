"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        console.log("Fetched Products:", data); // Debugging: Log the fetched products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="text-center p-2">
      <section
        id="Projects"
        className="flex overflow-x-scroll space-x-8 mt-10 mb-5 p-5"
      >
        {products.map((product: any) => {
          // Get the first image URL from the images array
          const imageUrl = product.images && product.images.length > 0 ? product.images[0] : "/default-placeholder.png"; // Use a placeholder if no image

          return (
            <div
              key={product._id}
              className="w-72 flex-shrink-0 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/product/${product._id}`}>
                <Image
                  src={imageUrl}
                  alt={product.title || 'Product Image'}
                  className="h-80 w-72 object-cover rounded-t-xl"
                  width={300}
                  height={480}
                  priority={true} // Prioritize loading of images
                />
                <div className="px-4 py-3 w-72">
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {product.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      ${product.price}
                    </p>
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bag-plus"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProductsPage;
