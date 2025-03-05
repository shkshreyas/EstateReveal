"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, Bed, Bath, Square, Heart, Calendar, 
  Phone, Mail, Share2, ArrowLeft, Home, Car, 
  Wifi, Utensils, Tv, Wind, Waves, Trees, 
  Footprints, ShieldCheck, Ruler
} from 'lucide-react';

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "This stunning modern villa offers the perfect blend of luxury and comfort. Featuring expansive living spaces, high-end finishes, and breathtaking views, this property is an entertainer's dream. The open floor plan seamlessly connects indoor and outdoor living areas, while the gourmet kitchen is equipped with top-of-the-line appliances and custom cabinetry. The primary suite is a true retreat with a spa-like bathroom and private balcony. Additional features include a home theater, wine cellar, and infinity pool overlooking the city.",
    location: "Beverly Hills, CA",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: 4500000,
    bedrooms: 5,
    bathrooms: 4.5,
    area: 4200,
    lotSize: 0.75,
    yearBuilt: 2020,
    type: "For Sale",
    category: "Luxury",
    isNew: true,
    features: [
      "Infinity Pool",
      "Home Theater",
      "Wine Cellar",
      "Smart Home System",
      "Gourmet Kitchen",
      "Spa Bathroom",
      "3-Car Garage",
      "Outdoor Kitchen",
      "Fireplace",
      "Walk-in Closets"
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(310) 555-1234",
      email: "sarah@estatereveals.com",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    nearbyAmenities: [
      { name: "Beverly Hills High School", distance: "0.8 miles", type: "education" },
      { name: "Rodeo Drive", distance: "1.2 miles", type: "shopping" },
      { name: "Cedars-Sinai Medical Center", distance: "2.5 miles", type: "medical" },
      { name: "Beverly Gardens Park", distance: "0.5 miles", type: "recreation" },
      { name: "Spago Beverly Hills", distance: "1.0 miles", type: "dining" }
    ]
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    description: "Experience the height of urban luxury in this spectacular penthouse apartment. Located in the heart of Manhattan, this residence offers panoramic views of the city skyline through floor-to-ceiling windows. The open concept living area features designer finishes, custom lighting, and a chef's kitchen with marble countertops and premium appliances. The primary bedroom includes a custom walk-in closet and an ensuite bathroom with a soaking tub and rainfall shower. Building amenities include 24-hour concierge, fitness center, rooftop terrace, and private parking.",
    location: "Manhattan, NY",
    address: "789 Skyline Avenue, Manhattan, NY 10022",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    lotSize: null,
    yearBuilt: 2018,
    type: "For Sale",
    category: "Apartment",
    isNew: false,
    features: [
      "Floor-to-Ceiling Windows",
      "Private Terrace",
      "Chef's Kitchen",
      "Walk-in Closets",
      "Marble Bathrooms",
      "24-Hour Concierge",
      "Fitness Center",
      "Rooftop Lounge",
      "Private Parking",
      "Smart Home Technology"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
    ],
    agent: {
      name: "Michael Chen",
      phone: "(212) 555-6789",
      email: "michael@estatereveals.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    nearbyAmenities: [
      { name: "Central Park", distance: "0.3 miles", type: "recreation" },
      { name: "Fifth Avenue Shopping", distance: "0.2 miles", type: "shopping" },
      { name: "Museum of Modern Art", distance: "0.5 miles", type: "culture" },
      { name: "Michelin-Star Restaurants", distance: "0.1 miles", type: "dining" },
      { name: "Grand Central Terminal", distance: "0.7 miles", type: "transportation" }
    ]
  }
];

const PropertyDetailPage = () => {
  const params = useParams();
  const propertyId = parseInt(params.id as string);
  
  // Find the property with the matching ID
  const property = properties.find(p => p.id === propertyId) || properties[0];
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number, type: string) => {
    if (type === "For Rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>
      
      {/* Property Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={property.type === "For Sale" ? "default" : "secondary"}>
              {property.type}
            </Badge>
            {property.isNew && (
              <Badge variant="outline" className="bg-green-500 text-white border-0">
                New
              </Badge>
            )}
            <Badge variant="outline">{property.category}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-1" />
            <span>{property.address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-3xl font-bold text-primary mb-2">
            {formatPrice(property.price, property.type)}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={toggleFavorite}>
              <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Property Images */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <Image
              src={property.images[selectedImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className={`relative rounded-lg overflow-hidden cursor-pointer ${selectedImageIndex === index ? 'ring-4 ring-primary' : ''}`}
                style={{ height: '120px' }}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {property.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-medium">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-medium">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-medium">{property.area} sqft</p>
                    </div>
                  </div>
                  {property.lotSize && (
                    <div className="flex items-center">
                      <Ruler className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lot Size</p>
                        <p className="font-medium">{property.lotSize} acres</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-medium">{property.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year Built</p>
                      <p className="font-medium">{property.yearBuilt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {getFeatureIcon(feature)}
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Location & Nearby</h2>
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <p className="font-medium mb-2">Address</p>
                  <p className="text-muted-foreground">{property.address}</p>
                </div>
                
                <div className="aspect-w-16 aspect-h-9 relative h-[400px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={`https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80`}
                    alt="Map location"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg text-center">
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Map view would be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Nearby Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.nearbyAmenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {getAmenityIcon(amenity.type)}
                      </div>
                      <div>
                        <p className="font-medium">{amenity.name}</p>
                        <p className="text-sm text-muted-foreground">{amenity.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Agent Contact Card */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image
                    src={property.agent.image}
                    alt={property.agent.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-lg">{property.agent.name}</h3>
                <p className="text-muted-foreground text-sm">Listing Agent</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <Button className="w-full" asChild>
                  <a href={`tel:${property.agent.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Agent
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${property.agent.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Agent
                  </a>
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Schedule a Tour</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button variant="outline" className="w-full">Today</Button>
                  <Button variant="outline" className="w-full">Tomorrow</Button>
                  <Button variant="outline" className="w-full">Sat, Jun 10</Button>
                  <Button variant="outline" className="w-full">Sun, Jun 11</Button>
                </div>
                <Button className="w-full">
                  Request Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Similar Properties */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.filter(p => p.id !== property.id).map((similarProperty) => (
            <Card key={similarProperty.id} className="overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src={similarProperty.images[0]}
                  alt={similarProperty.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={similarProperty.type === "For Sale" ? "default" : "secondary"}>
                    {similarProperty.type}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{similarProperty.title}</h3>
                <p className="text-primary font-bold mb-2">
                  {formatPrice(similarProperty.price, similarProperty.type)}
                </p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin size={14} className="mr-1" />
                  <span className="text-sm">{similarProperty.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{similarProperty.bedrooms} Beds</span>
                  <span>{similarProperty.bathrooms} Baths</span>
                  <span>{similarProperty.area} sqft</span>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href={`/properties/${similarProperty.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get icon for feature
const getFeatureIcon = (feature: string) => {
  const featureMap: Record<string, JSX.Element> = {
    "Infinity Pool": <Waves className="h-4 w-4 text-primary" />,
    "Home Theater": <Tv className="h-4 w-4 text-primary" />,
    "Wine Cellar": <Utensils className="h-4 w-4 text-primary" />,
    "Smart Home System": <Wifi className="h-4 w-4 text-primary" />,
    "Gourmet Kitchen": <Utensils className="h-4 w-4 text-primary" />,
    "Spa Bathroom": <Bath className="h-4 w-4 text-primary" />,
    "3-Car Garage": <Car className="h-4 w-4 text-primary" />,
    "Outdoor Kitchen": <Utensils className="h-4 w-4 text-primary" />,
    "Fireplace": <Waves className="h-4 w-4 text-primary" />,
    "Walk-in Closets": <Home className="h-4 w-4 text-primary" />,
    "Floor-to-Ceiling Windows": <Home className="h-4 w-4 text-primary" />,
    "Private Terrace": <Trees className="h-4 w-4 text-primary" />,
    "Chef's Kitchen": <Utensils className="h-4 w-4 text-primary" />,
    "Marble Bathrooms": <Bath className="h-4 w-4 text-primary" />,
    "24-Hour Concierge": <ShieldCheck className="h-4 w-4 text-primary" />,
    "Fitness Center": <Footprints className="h-4 w-4 text-primary" />,
    "Rooftop Lounge": <Trees className="h-4 w-4 text-primary" />,
    "Private Parking": <Car className="h-4 w-4 text-primary" />,
    "Smart Home Technology": <Wifi className="h-4 w-4 text-primary" />
  };
  
  return featureMap[feature] || <Home className="h-4 w-4 text-primary" />;
};

// Helper function to get icon for amenity
const getAmenityIcon = (type: string) => {
  const typeMap: Record<string, JSX.Element> = {
    "education": <Footprints className="h-5 w-5 text-primary" />,
    "shopping": <Utensils className="h-5 w-5 text-primary" />,
    "medical": <ShieldCheck className="h-5 w-5 text-primary" />,
    "recreation": <Trees className="h-5 w-5 text-primary" />,
    "dining": <Utensils className="h-5 w-5 text-primary" />,
    "culture": <Tv className="h-5 w-5 text-primary" />,
    "transportation": <Car className="h-5 w-5 text-primary" />
  };
  
  return typeMap[type] || <MapPin className="h-5 w-5 text-primary" />;
};

export default PropertyDetailPage;