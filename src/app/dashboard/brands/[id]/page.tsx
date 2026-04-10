import BrandDetail from "@/components/core/dashboard/brands/brand-detail";

interface BrandsDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const BrandsDetails = async ({ params }: BrandsDetailsProps) => {
  const { id } = await params;

  return (
    <div className="p-6">
      <BrandDetail brandId={id} />
    </div>
  );
};

export default BrandsDetails;
