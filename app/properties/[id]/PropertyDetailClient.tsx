"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize: number | null;
  yearBuilt: number;
  type: string;
  category: string;
  isNew: boolean;
  features: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  nearbyAmenities: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
}

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  // Only initialize state after mounting to ensure client/server match
  const [mounted, setMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Use a placeholder during server rendering and initial client render
  if (!mounted) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="icon" disabled>
          <Heart />
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Share2 />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={toggleFavorite}>
          <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} />
        </Button>
        <Button variant="outline" size="icon">
          <Share2 />
        </Button>
      </div>
      
      {/* Image gallery controls */}
      <div className="mt-6">
        <div className="grid grid-cols-4 gap-2 mt-2">
          {property.images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`relative rounded-lg overflow-hidden cursor-pointer ${selectedImageIndex === index ? 'ring-2 ring-primary' : ''}`}
              style={{ height: '60px' }}
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image}
                alt={`${property.title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Animated favorites notification */}
      {isFavorite && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <span className="text-sm text-green-600">Added to favorites!</span>
        </motion.div>
      )}
    </>
  );
} 