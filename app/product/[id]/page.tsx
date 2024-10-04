"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductDetailPage = () => {
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<Array<{
    hexCode: string | undefined; _id: string; name: string 
}>>([]);
  const [availableSizes, setAvailableSizes] = useState<Array<{ _id: string; name: string }>>([]);
  const [availableCategories, setAvailableCategories] = useState<Array<{ _id: string; name: string }>>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const colorsRes = await fetch('/api/colors');
      const sizesRes = await fetch('/api/sizes');
      const categoriesRes = await fetch('/api/categories');
      const colorsData = await colorsRes.json();
      const sizesData = await sizesRes.json();
      const categoriesData = await categoriesRes.json();

      setAvailableColors(colorsData);
      setAvailableSizes(sizesData);
      setAvailableCategories(categoriesData);
      try {
        if (id) {
          const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`);
          const data = await response.json();
          setProduct(data);
          setSelectedImage(data.images[0]); // Set the first image as the default selected image
          if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
          if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          setIsAuthenticated(true);
          setDecodedToken(decoded);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [id]);

  const handleBuyNowClick = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            productId: product._id,
            productTitle: product.title,
            selectedColor,
            selectedSize,
            productPrice: product.price,
            paymentStatus: 'pending',
          }),
        });

        const data = await response.json();
        console.log('Order saved:', data);

        // Redirect to payment link
        window.location.href = product.paymentLink;
      } catch (error) {
        console.error('Error saving order:', error);
      }
    } else {
      router.push('/Login');
    }
  };

  if (!product) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 px-5 lg:px-16" dir="rtl">
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* Main Image Section */}
        <div className="lg:w-1/2">
          <Image
            src={selectedImage}
            width={600}
            height={600}
            alt={product.title}
            className="rounded-lg shadow-lg"
          />
          {/* Thumbnail Images */}
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="cursor-pointer border border-blue-500 mx-4 rounded-lg hover:border-green-500 transition duration-300"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">{product.title}</h1>
          <p className="text-2xl mt-8 text-zinc-950 text-center  py-2 rounded-lg px-4 shadow-lg w-fit">{product.price}</p>
          <p className="mt-8 text-gray-950 leading-relaxed f-bold text-xl">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-950 text-start mr-10">رنگ ها</h2>
            <select
              onClick={() => setSelectedColor(colors[0])}
              value={colors}
              onChange={(e) => setColors(Array.from(e.target.selectedOptions, option => option.value))}
              className="w-32 text-center border-blue-500 shadow-lg px-4 mx-auto  mt-2 p-3 border rounded-lg gap-6 focus:border-blue-500 focus:outline-none"
            >
              {availableColors.map(color => (
                <option key={color._id} value={color.name} style={{backgroundColor: color.hexCode}} className="rounded-lg m-4 ">
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-950 text-start mr-10">سایز ها</h2>
            <select
              onClick={() => setSelectedSize(sizes[0])}
              value={sizes}
              onChange={(e) => setSizes(Array.from(e.target.selectedOptions, option => option.value))}
              className="w-32 border-blue-500 shadow-lg px-2 mt-2 p-3 border rounded-lg focus:border-blue-500 focus:outline-none"
            >
              {availableSizes.map(size => (
                <option key={size._id} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNowClick}
            className="mt-8 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
