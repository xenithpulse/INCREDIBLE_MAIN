import Header from "@/components/layout/Headertwo";
import Center from "@/homecenter";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/homepagegrid";
import { Category } from "@/models/Category"; // Ensure this path is correct
import Title from "@/components/styled/Title";

export default function CategoryPage({ products, categoryName }) {
  return (
    <>
      <Header />
      <Center>
        <Title style={{ marginTop: '80px' }}>Explore {categoryName}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}


export async function getServerSideProps({ params }) {
  await mongooseConnect();

  // Get the category name from the URL params
  const categoryName = decodeURIComponent(params.name);

  // Find the category by name
  const category = await Category.findOne({ name: categoryName });

  if (!category) {
    return {
      notFound: true, // Handle case where category is not found
    };
  }

  // Fetch products for the found category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categoryName, // Pass the category name for title
    }
  };
}
