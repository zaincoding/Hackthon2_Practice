'use client'

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Cart from "@/app/context/cart";
import { useCart,CartItem } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

// interface ProductType {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image_url: string;
// }

// const generateUid = (product: ProductType) => {
//   return `${product.name}-${product.price}-${product.description}`;
// };

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
  // const { addToCart } = useCart();


  const products = await getProduct()
  // Fetch products on the client-side
  // const [products, setProducts] = useState<CartItem[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getProduct();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((item: CartItem) => {
          // const uniqueId = generateUid(item);

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

              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-300"
              >
                Add To Cart
              </button>
            </div>
          );
        })}
        {/* <Cart /> */}
      </div>
    </div>
  );
}
