"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
    _id: string;
    title: string;
    description: string;
    images: string[];
    categories: string[];
    price: number;
    colors: string[];
    sizes: string[];
}

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
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
        const fetchProducts = async () => {
            const colorsRes = await fetch('/api/colors');
            const sizesRes = await fetch('/api/sizes');
            const categoriesRes = await fetch('/api/categories');
            const response = await fetch('/api/products');

            const colorsData = await colorsRes.json();
            const sizesData = await sizesRes.json();
            const categoriesData = await categoriesRes.json();

            setAvailableColors(colorsData);
            setAvailableSizes(sizesData);
            setAvailableCategories(categoriesData);
            const data: Product[] = await response.json();
            setProducts(data);
            setFilteredProducts(data); // Initially display all products
        };

        fetchProducts();
    }, []);

    const handleFilterChange = () => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.categories.includes(selectedCategory)
            );
        }

        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        if (selectedColors.length) {
            filtered = filtered.filter(product =>
                product.colors.some(color => selectedColors.includes(color))
            );
        }

        if (selectedSizes.length) {
            filtered = filtered.filter(product =>
                product.sizes.some(size => selectedSizes.includes(size))
            );
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="flex flex-col lg:flex-row p-4"dir="rtl">
            {/* Sidebar */}
            <div className="lg:w-1/4 w-full p-4 bg-cyan-50 border-r px-2">
                <h2 className="text-xl font-bold mb-4">فیلتر ها</h2>

                {/* Category Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">دسته‌بندی</h3>
                    <div className="space-y-2">
                        {availableCategories.map((category) => (
                            <label key={category._id} className="flex items-center space-x-2 text-gray-900 ">
                                <input
                                    type="checkbox"
                                    value={category._id}
                                    onChange={(e) => setCategories(
                                        e.target.checked 
                                            ? [...categories, e.target.value] 
                                            : categories.filter(c => c !== e.target.value)
                                    )}
                                    className="form-checkbox h-5 w-5 ml-3"
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">قیمت</h3>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, e.target.valueAsNumber])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm mt-2">
                        <span>0 تومان</span>
                        <span>{priceRange[1]} تومان</span>
                    </div>
                </div>

                {/* Colors Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">رنگ</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableColors.map(color => (
                            <div
                                key={color._id}
                                onClick={() => setSelectedColors(
                                    selectedColors.includes(color.name)
                                        ? selectedColors.filter(c => c !== color.name)
                                        : [...selectedColors, color.name]
                                )}
                                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                                    selectedColors.includes(color.name) ? 'border-blue-500' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color.hexCode }}
                            />
                        ))}
                    </div>
                </div>

                {/* Sizes Filter */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">سایز</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableSizes.map(size => (
                            <label key={size._id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={size.name}
                                    onChange={(e) => setSizes(
                                        e.target.checked
                                            ? [...sizes, e.target.value]
                                            : sizes.filter(s => s !== e.target.value)
                                    )}
                                    className="form-checkbox h-5 w-5 text-blue-500 ml-2"
                                />
                                {size.name}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleFilterChange}
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-200"
                >
                    اعمال فیلتر
                </button>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 w-full p-4">
                <div className="text-center mb-8">
                    <h1 className="font-bold text-3xl mb-4">به فروشگاه لوسی من خوش آمدید</h1>
                </div>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <Link key={product._id} href={`/product/${product._id}`}>
                                <div className="border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-48 object-cover rounded-md"
                                        width={300}
                                        height={300}
                                    />
                                    <h3 className="text-lg font-bold mt-4">{product.title}</h3>
                                    <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
                                    <p className="text-md font-semibold mt-3">{product.price} تومان</p>
                                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                                        خرید
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-lg">هیچ محصولی پیدا نشد.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
