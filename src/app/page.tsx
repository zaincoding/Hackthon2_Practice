import { client } from "@/sanity/lib/client";
import Image from 'next/image'

interface ProductType{
  id:number;
  name: string;
  description: String;
  price:number;
  quantity:number;
  image_url: string;

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


export default async function Home() {
 const products = await getProduct()
  return(
  <div>
    <h1>Products</h1>
    <div>
      {products.map((item:ProductType) =>(
       <div key={item.id}>
       <div>
        <div><Image src={item.image_url} alt={item.name} width={200} height={200}/></div>
        <div>{item.name}</div>
        <div>{item.description}</div>
        <div>{item.price}</div>
       </div>
        </div>
      ))}
    </div>
  </div>
  )
}