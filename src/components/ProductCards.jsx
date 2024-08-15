import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductCards = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/products`)
            setProducts(data)
        }
        getData()
    },[])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {
                products.map(item=><ProductCard key={item?._id} item={item}></ProductCard>)
            }
        </div>
    );
};

export default ProductCards;