"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, MapPin, Building2, Home as HomeIcon, 
  TrendingUp, Shield, Clock, Users, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import FeaturedProperties from '@/components/featured-properties';
import LocationPriceChart from '@/components/location-price-chart';
import TestimonialCarousel from '@/components/testimonial-carousel';
import ClientOnly from '@/components/client-only';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  
  // Only run on client
  const AnimatedHero = () => {
    const { scrollYProgress } = useScroll({
      target: heroRef,
      offset: ["start start", "end start"]
    });
    
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
      <motion.div 
        className="container relative z-10 px-4 text-center"
        style={{ opacity, y, scale }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover Your Dream Property in India
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore our cutting-edge platform with immersive visuals and dynamic pricing across Indian cities
        </motion.p>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Tabs defaultValue="buy" className="bg-white/10 backdrop-blur-md rounded-lg p-2">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="rent">Rent</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>
            <TabsContent value="buy" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter location, neighborhood, or address in India"
                    className="pl-10 bg-white/90 border-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="lg" className="md:w-auto">
                  <Search className="mr-2 h-4 w-4" /> Search Properties
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="rent" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Where are you looking to rent?"
                    className="pl-10 bg-white/90 border-0"
                  />
                </div>
                <Button size="lg" className="md:w-auto">
                  <Search className="mr-2 h-4 w-4" /> Find Rentals
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="sell" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your property address"
                    className="pl-10 bg-white/90 border-0"
                  />
                </div>
                <Button size="lg" className="md:w-auto">
                  Get Estimate
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    );
  };

  const features = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "Extensive Property Listings",
      description: "Browse thousands of properties with detailed information and high-quality images."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Dynamic Pricing",
      description: "View real-time price trends based on location and market conditions."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure Transactions",
      description: "Enjoy peace of mind with our secure platform for all property transactions."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Real-Time Updates",
      description: "Receive instant notifications about new listings and price changes."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern luxury home"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <ClientOnly>
          <AnimatedHero />
        </ClientOnly>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <ClientOnly>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
              >
                <ArrowRight className="h-5 w-5 rotate-90" />
              </Button>
            </motion.div>
          </ClientOnly>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose EstateReveal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a unique combination of cutting-edge technology and user-friendly features
              to make your property journey in India seamless and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ClientOnly key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ClientOnly>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Explore our handpicked selection of premium properties</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>

          <FeaturedProperties />
        </div>
      </section>

      {/* Location Price Trends */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Location Price Trends</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay informed with real-time property price trends across different locations
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-6">
            <LocationPriceChart />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from satisfied clients who found their dream properties through EstateReveal
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied clients who have discovered their perfect properties through EstateReveal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}