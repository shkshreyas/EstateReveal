import React from 'react';
import PropertyDetailClient from './PropertyDetailClient';

interface PropertyPageProps {
  params: { id: string };
}

// This is a Server Component.
export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  // Fetch your property data here (synchronously or via server-side fetch)
  // For demonstration, we are using simple mock data
  const property = {
    id,
    title: `Property ${id}`,
    description: 'This is a beautiful property located in India.',
    // ...other property fields
  };

  return (
    <div>
      <h1>{property.title}</h1>
      {/* Render static details */}
      <p>{property.description}</p>

      {/* Render interactive components in the client */}
      <PropertyDetailClient property={property} />
    </div>
  );
}

// This function tells Next.js which paths to generate at build time.
export async function generateStaticParams() {
  // Replace with actual logic (e.g. fetch property IDs from a database)
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
} 