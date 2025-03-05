"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  MapPin, Bed, Bath, Square, Heart, Search, 
  SlidersHorizontal, X, Check, ArrowUpDown
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for properties
const allProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 4500000,
    bedrooms: 5,
    bathrooms: 4.5,
    area: 4200,
    type: "For Sale",
    category: "Luxury",
    isNew: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "Manhattan, NY",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    type: "For Sale",
    category: "Apartment",
    isNew: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Waterfront Apartment",
    location: "Miami, FL",
    price: 8500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    type: "For Rent",
    category: "Apartment",
    isNew: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Countryside Retreat",
    location: "Aspen, CO",
    price: 2800000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3800,
    type: "For Sale",
    category: "House",
    isNew: false,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
  },
  {
    id: 5,
    title: "Urban Loft",
    location: "Chicago, IL",
    price: 5200,
    bedrooms: 1,
    bathrooms: 1.5,
    area: 1200,
    type: "For Rent",
    category: "Apartment",
    isNew: true,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "Beachfront Condo",
    location: "San Diego, CA",
    price: 1800000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "For Sale",
    category: "Condo",
    isNew: false,
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
  },
  {
    id: 7,
    title: "Mountain View Cabin",
    location: "Denver, CO",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: "For Sale",
    category: "House",
    isNew: true,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80"
  },
  {
    id: 8,
    title: "Luxury Townhouse",
    location: "Boston, MA",
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200,
    type: "For Sale",
    category: "Townhouse",
    isNew: false,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 9,
    title: "Modern Studio Apartment",
    location: "Seattle, WA",
    price: 3800,
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    type: "For Rent",
    category: "Apartment",
    isNew: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

const formatPrice = (price: number, type: string) => {
  if (type === "For Rent") {
    return `$${price.toLocaleString()}/month`;
  }
  return `$${price.toLocaleString()}`;
};

const PropertiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [bedroomsMin, setBedroomsMin] = useState<number>(0);
  const [bathroomsMin, setBathroomsMin] = useState<number>(0);
  const [sortBy, setSortBy] = useState('newest');
  const [listingType, setListingType] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  
  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = allProperties;
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        property => 
          property.title.toLowerCase().includes(query) || 
          property.location.toLowerCase().includes(query)
      );
    }
    
    // Property type filter
    if (propertyType.length > 0) {
      filtered = filtered.filter(property => 
        propertyType.includes(property.category)
      );
    }
    
    // Listing type filter
    if (listingType.length > 0) {
      filtered = filtered.filter(property => 
        listingType.includes(property.type)
      );
    }
    
    // Price range filter
    filtered = filtered.filter(property => {
      if (property.type === "For Rent") {
        // Convert monthly rent to equivalent sale price for filtering
        const equivalentPrice = property.price * 200; // Rough estimate
        return equivalentPrice >= priceRange[0] && equivalentPrice <= priceRange[1];
      }
      return property.price >= priceRange[0] && property.price <= priceRange[1];
    });
    
    // Bedrooms filter
    if (bedroomsMin > 0) {
      filtered = filtered.filter(property => property.bedrooms >= bedroomsMin);
    }
    
    // Bathrooms filter
    if (bathroomsMin > 0) {
      filtered = filtered.filter(property => property.bathrooms >= bathroomsMin);
    }
    
    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bedrooms':
        filtered.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        break;
    }
    
    setFilteredProperties(filtered);
  }, [searchQuery, propertyType, priceRange, bedroomsMin, bathroomsMin, sortBy, listingType]);
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setPropertyType([]);
    setPriceRange([0, 5000000]);
    setBedroomsMin(0);
    setBathroomsMin(0);
    setListingType([]);
    setSortBy('newest');
  };
  
  const togglePropertyType = (type: string) => {
    if (propertyType.includes(type)) {
      setPropertyType(propertyType.filter(t => t !== type));
    } else {
      setPropertyType([...propertyType, type]);
    }
  };
  
  const toggleListingType = (type: string) => {
    if (listingType.includes(type)) {
      setListingType(listingType.filter(t => t !== type));
    } else {
      setListingType([...listingType, type]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Properties</h1>
        <p className="text-muted-foreground">
          Discover your perfect property from our extensive collection
        </p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-card rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by location, property name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-5">
                  <SheetTitle>Filter Properties</SheetTitle>
                  <SheetDescription>
                    Refine your search with specific criteria
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6">
                  {/* Listing Type */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Listing Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {["For Sale", "For Rent"].map((type) => (
                        <Button
                          key={type}
                          variant={listingType.includes(type) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleListingType(type)}
                          className="rounded-full"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Property Type */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Property Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["House", "Apartment", "Condo", "Townhouse", "Luxury"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`type-${type}`} 
                            checked={propertyType.includes(type)}
                            onCheckedChange={() => togglePropertyType(type)}
                          />
                          <Label htmlFor={`type-${type}`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <span className="text-sm text-muted-foreground">
                        ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 5000000]}
                      max={5000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-6"
                    />
                  </div>
                  
                  {/* Bedrooms */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Bedrooms</h3>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((num) => (
                        <Button
                          key={num}
                          variant={bedroomsMin === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBedroomsMin(num)}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          {num === 0 ? "Any" : num === 5 ? "5+" : num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bathrooms */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Bathrooms</h3>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <Button
                          key={num}
                          variant={bathroomsMin === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBathroomsMin(num)}
                          className="rounded-full w-10 h-10 p-0"
                        >
                          {num === 0 ? "Any" : num === 4 ? "4+" : num}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline" onClick={resetFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Reset All
                    </Button>
                    <Button>
                      <Check className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active Filters */}
        {(searchQuery || propertyType.length > 0 || listingType.length > 0 || bedroomsMin > 0 || bathroomsMin > 0 || priceRange[0] > 0 || priceRange[1] < 5000000) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {searchQuery && (
              <Badge variant="secondary" className="px-3 py-1">
                Search: {searchQuery}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {propertyType.map(type => (
              <Badge key={type} variant="secondary" className="px-3 py-1">
                {type}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => togglePropertyType(type)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            
            {listingType.map(type => (
              <Badge key={type} variant="secondary" className="px-3 py-1">
                {type}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => toggleListingType(type)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            
            {bedroomsMin > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                {bedroomsMin}+ Beds
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setBedroomsMin(0)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {bathroomsMin > 0 && (
              <Badge variant="secondary" className="px-3 py-1">
                {bathroomsMin}+ Baths
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setBathroomsMin(0)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            {(priceRange[0] > 0 || priceRange[1] < 5000000) && (
              <Badge variant="secondary" className="px-3 py-1">
                ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setPriceRange([0, 5000000])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredProperties.length} properties
        </p>
      </div>
      
      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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
                      <span className="text-sm">{property.area} sqft</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-6 pb-6">
                  <Button className="w-full" asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;