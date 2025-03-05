import { GetStaticProps, GetStaticPaths } from 'next';

// Your component, e.g.:
export default function PropertyPage({ property }: { property: any }) {
  // Render property details
  return (
    <div>
      <h1>{property.title}</h1>
      {/* More property info */}
    </div>
  );
}

// This function returns an array of route parameters for every property you want to statically generate.
export async function generateStaticParams() {
  // For demonstration purposes, we use a list of known IDs.
  // In a real application, you might fetch this list from your CMS or database.
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

// Alternatively, if you're using getStaticPaths (for the Pages Router):
export const getStaticPaths: GetStaticPaths = async () => {
  const params = await generateStaticParams();
  const paths = params.map((p) => ({
    params: { id: p.id }
  }));
  return {
    paths,
    fallback: false // or 'blocking' based on your use case
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params!;
  // Here you fetch property details for the given id, e.g. from Supabase or your mock data
  const property = {
    id,
    title: `Property ${id}`,
    // other property fields...
  };

  return {
    props: {
      property
    }
  };
}; 