"use client";

import { client } from "@/sanity/lib/client";
import Image from 'next/image'
import Cart from '../app/context/cart'
import { useCart} from './context/CartContext';
import { useEffect, useState } from "react";


interface ProductType{
  id:number | string;
  name: string;
  description: string;
  price:number;
  quantity:number;
  image_url: string;

}

const generateUid = (product:ProductType) =>{
  return `${product.name}-${product.price}-${product.description}`

}

const getProduct = async() =>{
const products = await client.fetch(`

      *[_type == "product"][0..4]{
  id,
  name,
  description,
  price,
  quantity,
 "image_url":image.asset ->url,
    
}

  `) 
  return products;
}


export default function Home() {
 const { addToCart } = useCart();
 const [products, setProducts] = useState<ProductType[]>([])

 useEffect(()=>{
  getProduct().then(setProducts)
 },[])
 return(
  <div>
    <h1>Products</h1>
    <div>
      {products.map((item:ProductType) =>{
      const uniqueId = generateUid(item)
 
    return(
       <div key={uniqueId}>
       <div>
        <div><Image src={item.image_url} alt={item.name} width={200} height={200}/></div>
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.price}</div>
       </div>

       <button
              onClick={() => addToCart({ ...item, id: uniqueId, quantity: 1 })}
              className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-300"
            >Add To Cart</button>
        </div>
      )}
      )}
          <Cart/>

    </div>

  </div>
  )
}