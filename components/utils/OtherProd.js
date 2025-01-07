import ProductsGrid from "@/homepagegrid";
import Title from "@/components/styled/Title";

export default function OtherProdSection({ products }) {
  return (
    <div>
      <Title style={{ marginTop: '80px' }}>Related Items You May Also Like</Title>
      <ProductsGrid products={products} />
    </div>
  );
}
