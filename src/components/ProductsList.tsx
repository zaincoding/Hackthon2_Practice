'use client';

import Image from "next/image";
import { CartItem, useCart } from "@/app/context/CartContext";
import Cart from '../app/context/cart'
// Define the props for the component
interface ProductsListProps {
  products: CartItem[];
}

const generateUid = (product:CartItem)=>{
    
    return `${product.name}-${product.price}-${product.description}`
}

const ProductsList = ({ products }: ProductsListProps) => {
  const { addToCart } = useCart(); // Use the CartContext

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((item: CartItem) => {
            const uid = generateUid(item)
        return(
          <div key={uid}>
            <div>
              <Image
                src={item.image_url}
                alt={item.name}
                width={200}
                height={200}
              />
              <div>{item.name}</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
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
              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-300"
            >
              Add To Cart
            </button>
          </div>
        )}
    )}
      </div>
      <Cart/>
    </div>
  );
};

export default ProductsList;
