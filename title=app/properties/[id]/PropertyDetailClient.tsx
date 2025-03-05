"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  description: string;
  // other property fields
}

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({
  property
}: PropertyDetailClientProps) {
  const [favorite, setFavorite] = useState(false);
  // You can use useParams if needed here
  // const params = useParams();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/path-to-image.jpg"
          alt={property.title}
          width={600}
          height={400}
        />
        <Button onClick={() => setFavorite(!favorite)}>
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </motion.div>
    </div>
  );
} 