'use client';

import Image from "next/image";
import { CartItem, useCart } from "@/app/context/CartContext";
import Cart from '../app/context/cart'


interface ProductsListProps {
  products: CartItem[];
}

const generateUid = (product:CartItem)=>{
    
    return `${product.name}-${product.price}-${product.description}`
}

const ProductsList = ({ products }: ProductsListProps) => {
  const { addToCart } = useCart(); 

  return (
      <div  className="grid grid-cols-3 gap-4 max-w-[1280px] mx-4 mt-4">
        {products.map((item: CartItem) => {
            const uid = generateUid(item)
        return(
          <div key={uid}  className="border group hover:shadow-lg transition-shadow duration-300">
            <div>
              <Image
                src={item.image_url}
                alt={item.name}
                width={200}
                height={200}   
                className="h-[230px] w-[230px] transform transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="line-clamp-1 truncate max-w-xs text-2xl">{item.name}</div>
              <div className="line-clamp-3">{item.description}</div>
              <div className="text-xl font-semibold">${item.price}</div>
            </div>

            {/* Add To Cart Button */}
            <button
              onClick={() =>
                addToCart({
                  id: uid, // Ensure the ID is unique
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  quantity: 1, // Default quantity
                  image_url: item.image_url,
                })
              }

              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-300 rounded-md">
              Add To Cart
            </button>
          </div>
        )}
    )}
      <Cart/>
    </div>
  );
};

export default ProductsList;
