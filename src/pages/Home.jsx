import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [brandFilter, setBrandFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('Brand');
    const [selectedCategory, setSelectedCategory] = useState('Category');
    const [selectedPriceRange, setSelectedPriceRange] = useState('Price Range');

    useEffect(() => {
        const getData = async () => {
            const query = `page=${currentPage}&size=${itemsPerPage}&brand=${brandFilter}&category=${categoryFilter}&priceRange=${priceRangeFilter}`;
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-products?${query}`);
            setProducts(data);
        }
        getData();
    }, [currentPage, itemsPerPage, brandFilter, categoryFilter, priceRangeFilter]);

    useEffect(() => {
        const getCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/products-count`);
            setCount(data.count);
        }
        getCount();
    }, []);

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    const handlePaginationButton = (v) => {
        setCurrentPage(v);
    };

    const handleBrandFilter = (brand) => {
        setBrandFilter(brand);
        setSelectedBrand(brand || 'Brand');
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
        setSelectedCategory(category || 'Category');
    };

    const handlePriceRangeFilter = (priceRange) => {
        setPriceRangeFilter(priceRange);
        setSelectedPriceRange(priceRange || 'Price Range');
    };


    return (
        <div className="container mx-auto">
            {/* search input */}
            <div className="mt-8">
                <form className="flex items-center">
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-tr-none rounded-br-none" />
                    <input className="btn bg-red-400 rounded-tl-none rounded-bl-none" type="submit" value="Search" />
                </form>
            </div>
            {/* filter */}
            <div className="mt-4">
                {/* brand filter */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                        {selectedBrand}
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={() => handleBrandFilter('Samsung')}>Samsung</a></li>
                        <li><a onClick={() => handleBrandFilter('Microsoft')}>Microsoft</a></li>
                        <li><a onClick={() => handleBrandFilter('Google')}>Google</a></li>
                        <li><a onClick={() => handleBrandFilter('Apple')}>Apple</a></li>
                        <li><a onClick={() => handleBrandFilter('Garmin')}>Garmin</a></li>
                        <li><a onClick={() => handleBrandFilter('Lenovo')}>Lenovo</a></li>
                        <li><a onClick={() => handleBrandFilter('Oppo')}>Oppo</a></li>
                        <li><a onClick={() => handleBrandFilter('Xiaomi')}>Xiaomi</a></li>
                        <li><a onClick={() => handleBrandFilter('Tag Heuer')}>Tag Heuer</a></li>
                        <li><a onClick={() => handleBrandFilter('Asus')}>Asus</a></li>
                        <li><a onClick={() => handleBrandFilter('OnePlus')}>OnePlus</a></li>
                        <li><a onClick={() => handleBrandFilter('HP')}>HP</a></li>
                        <li><a onClick={() => handleBrandFilter('Sony')}>Sony</a></li>
                        <li><a onClick={() => handleBrandFilter('Razer')}>Razer</a></li>
                        <li><a onClick={() => handleBrandFilter('Acer')}>Acer</a></li>
                        <li><a onClick={() => handleBrandFilter('Alienware')}>Alienware</a></li>
                        <li><a onClick={() => handleBrandFilter('Fitbit')}>Fitbit</a></li>
                        <li><a onClick={() => handleBrandFilter('Fossil')}>Fossil</a></li>
                        <li><a onClick={() => handleBrandFilter('Dell')}>Dell</a></li>
                        <li><a onClick={() => handleBrandFilter('MSI')}>MSI</a></li>
                        <li><a onClick={() => handleBrandFilter('Nokia')}>Nokia</a></li>
                    </ul>
                </div>
                {/* category filter */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">{selectedCategory}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={() => handleCategoryFilter('phone')}>Phone</a></li>
                        <li><a onClick={() => handleCategoryFilter('laptop')}>Laptop</a></li>
                        <li><a onClick={() => handleCategoryFilter('tablets')}>Tablets</a></li>
                        <li><a onClick={() => handleCategoryFilter('watches')}>Watches</a></li>
                    </ul>
                </div>
                {/* price range filter */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">{selectedPriceRange}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><a onClick={() => handlePriceRangeFilter('0-100')}>$0 - $100</a></li>
                        <li><a onClick={() => handlePriceRangeFilter('100-500')}>$100 - $500</a></li>
                        <li><a onClick={() => handlePriceRangeFilter('500-1000')}>$500 - $1000</a></li>
                        <li><a onClick={() => handlePriceRangeFilter('1000-1500')}>$1000 - $1500</a></li>
                        <li><a onClick={() => handlePriceRangeFilter('1500-2000')}>$1500 - $2000</a></li>
                        <li><a onClick={() => handlePriceRangeFilter('2000-3000')}>$2000 - $3000</a></li>
                    </ul>
                </div>
            </div>

            {/* product cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {
                    products.map(item => <ProductCard key={item?._id} item={item}></ProductCard>)
                }
            </div>
            {/* Pagination Section */}
            <div className='flex justify-center mt-12'>
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-red-400  hover:text-white'
                >
                    <div className='flex items-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>

                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map(btnNum => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? 'bg-red-400 text-white' : ''
                            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-red-400  hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-red-400 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
                >
                    <div className='flex items-center -mx-1'>
                        <span className='mx-1'>Next</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Home;
