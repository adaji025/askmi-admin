import BrandDetail from "@/components/core/dashboard/brands/brand-detail";

interface BrandsDetailsProps {
  params: {
    id: string;
  };
}

const BrandsDetails = ({ params }: BrandsDetailsProps) => {
  return (
    <div className="p-6">
      <BrandDetail brandId={params.id} />
    </div>
  );
};

export default BrandsDetails;
