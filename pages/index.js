import Header from "@/components/layout/Header";
import NextJsCarousel from "@/components/layout/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import AboutUs from "@/components/layout/aboutus";
import Footer from "@/components/layout/footer";
import ShuffledProducts from "@/components/products/shuffledhomeproducts";
import { getShuffledProducts } from "@/components/products/shuffledproduct"; // Import the new shuffled products service
import ProductSlide from "@/components/products/NewProductsSLIDE";
import CategoryBox from "@/components/utils/category_box";
import GoogleReviews from "@/components/Map/GoogleReviews";
import  BannerSection  from "@/components/layout/Banner";
import AnnouncementBar from "@/components/layout/announcementbar";
import Center from "@/homecenter";
import Title from "@/components/styled/Title";
import ContactUs from "@/components/layout/contactus";
import MoreAboutUs from "@/components/layout/moreaboutus";
import WhyChooseUs from "@/components/layout/whychoseus";


export default function HomePage({ newProducts, shuffledProducts, categories }) {
  return (
    <div style={{  overflowX: "hidden" }}>
      <div style={{marginBottom:"28px"}}>
        <AnnouncementBar 
          messages={[
            "Welcome to The Incredible Homes",
            "We deal in home decor & household items",
            "Delivery all over Pakistan!"
          ]}/>
    </div>
      <div style={{marginTop:"30px", position:"relative"}}>
      <Header />
      </div>
      <NextJsCarousel />
      <div>
      <Center>
        <Title style={{ marginBottom: '-20px' }}>New Arrivals</Title>
      </Center>
      </div>
      <ProductSlide products={newProducts} />
      <CategoryBox categories={categories} />
      <BannerSection/>
      <ShuffledProducts products={shuffledProducts} />
      <AboutUs />
      <WhyChooseUs />
      <MoreAboutUs />
      <GoogleReviews/>
      <ContactUs />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  try {
    const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 12 }).populate("category");
    const shuffledProducts = await getShuffledProducts(12);
    const categories = await Category.find({}).lean(); // Fetch categories from database

    return {
      props: {
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        shuffledProducts,
        categories: categories.map(category => ({
          _id: category._id.toString(),
          name: category.name,
          image: category.image || "/default-category.jpg",
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        newProducts: [],
        shuffledProducts: [],
        categories: [],
      },
    };
  }
}
