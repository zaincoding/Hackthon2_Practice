import { client } from "@/sanity/lib/client";
import ProductsList from "@/components/ProductsList"; // Import the client component

// Fetch products on the server side
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

// Server Component
export default async function Home() {
  const products = await getProduct(); // Fetch products on the server side
  return <ProductsList products ={products} />; // Pass products to the client component
}
