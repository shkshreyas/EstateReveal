"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Bed, Bath, Square, Heart, ArrowRight, ArrowLeft 
} from 'lucide-react';
import ClientOnly from '@/components/client-only';

// Mock data for featured properties in India
const properties = [
  {
    id: 1,
    title: "Luxury Villa in Gurgaon",
    location: "DLF Phase 5, Gurgaon, Haryana",
    price: 42500000,
    bedrooms: 5,
    bathrooms: 5.5,
    area: 4200,
    type: "For Sale",
    isNew: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 2,
    title: "Sea-facing Apartment",
    location: "Bandra West, Mumbai, Maharashtra",
    price: 38000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1850,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Modern Flat in Indiranagar",
    location: "Indiranagar, Bangalore, Karnataka",
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "For Rent",
    isNew: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Garden Villa in South Delhi",
    location: "Vasant Kunj, New Delhi, Delhi",
    price: 29500000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
  },
  {
    id: 5,
    title: "Premium Apartment in Koregaon Park",
    location: "Koregaon Park, Pune, Maharashtra",
    price: 52000,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 1600,
    type: "For Rent",
    isNew: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "Beachside Villa in Goa",
    location: "Anjuna, North Goa, Goa",
    price: 18500000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "For Sale",
    isNew: false,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
  }
];

const formatPrice = (price: number, type: string) => {
  if (type === "For Rent") {
    return `₹${price.toLocaleString()}/month`;
  }
  return `₹${price.toLocaleString()}`;
};

const FeaturedProperties = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const visibleProperties = properties.slice(startIndex, startIndex + 3);
  
  const nextProperties = () => {
    if (startIndex + 3 < properties.length) {
      setStartIndex(startIndex + 3);
    } else {
      setStartIndex(0);
    }
  };
  
  const prevProperties = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    } else {
      setStartIndex(Math.max(0, properties.length - 3));
    }
  };
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProperties.map((property, index) => (
          <ClientOnly key={property.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 relative h-[220px]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>
                      {property.type}
                    </Badge>
                    {property.isNew && (
                      <Badge variant="outline" className="bg-green-500 text-white border-0">
                        New
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-primary rounded-full"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart 
                      className={favorites.includes(property.id) ? "fill-red-500 text-red-500" : ""} 
                      size={18} 
                    />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-xl">{formatPrice(property.price, property.type)}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Bed size={16} className="mr-1" />
                      <span className="text-sm">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath size={16} className="mr-1" />
                      <span className="text-sm">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square size={16} className="mr-1" />
                      <span className="text-sm">{property.area} sq.ft</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-6">
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </ClientOnly>
        ))}
      </div>
      
      <div className="flex justify-center mt-10 gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevProperties}
          className="rounded-full"
        >
          <ArrowLeft size={18} />
        </Button>
        {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
          <Button
            key={index}
            variant={startIndex / 3 === index ? "default" : "outline"}
            size="icon"
            className="rounded-full w-10 h-10"
            onClick={() => setStartIndex(index * 3)}
          >
            {index + 1}
          </Button>
        ))}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextProperties}
          className="rounded-full"
        >
          <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedProperties;