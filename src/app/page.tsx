'use client';

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { CartItem, useCart } from "@/app/context/CartContext"; // Import the useCart hook

// Fetch products from Sanity
const getProduct = async () => {
  const products = await client.fetch(`
      *[_type == "product"][0..4]{
        _id,
        name,
        description,
        price,
        quantity,
       "image_url": image.asset->url,
      }
  `);
  return products;
};

export default async function Home() {
  const { addToCart } = useCart(); // Use addToCart from the CartContext

  const products = await getProduct();

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((item: CartItem) => {
          return (
            <div key={item.id}>
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
                    id: item._id, // Use the product ID from Sanity
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    quantity: 1, // Default quantity is 1
                    image_url: item.image_url,
                  })
                }
                className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-300"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
