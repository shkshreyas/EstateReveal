"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts';
import { 
  MapPin, TrendingUp, ArrowUpDown, Building2, 
  Home, DollarSign, Calendar, Users, Search
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Mock data for market trends
const marketTrends = {
  'price': [
    { month: 'Jan', 'New York': 1200000, 'Los Angeles': 1100000, 'Chicago': 650000, 'Miami': 850000, 'Seattle': 950000 },
    { month: 'Feb', 'New York': 1250000, 'Los Angeles': 1150000, 'Chicago': 670000, 'Miami': 900000, 'Seattle': 980000 },
    { month: 'Mar', 'New York': 1300000, 'Los Angeles': 1180000, 'Chicago': 690000, 'Miami': 920000, 'Seattle': 1000000 },
    { month: 'Apr', 'New York': 1320000, 'Los Angeles': 1200000, 'Chicago': 700000, 'Miami': 950000, 'Seattle': 1020000 },
    { month: 'May', 'New York': 1350000, 'Los Angeles': 1220000, 'Chicago': 710000, 'Miami': 970000, 'Seattle': 1050000 },
    { month: 'Jun', 'New York': 1380000, 'Los Angeles': 1250000, 'Chicago': 730000, 'Miami': 990000, 'Seattle': 1080000 }
  ],
  'inventory': [
    { month: 'Jan', 'New York': 1200, 'Los Angeles': 1500, 'Chicago': 900, 'Miami': 800, 'Seattle': 700 },
    { month: 'Feb', 'New York': 1150, 'Los Angeles': 1450, 'Chicago': 850, 'Miami': 780, 'Seattle': 680 },
    { month: 'Mar', 'New York': 1100, 'Los Angeles': 1400, 'Chicago': 820, 'Miami': 760, 'Seattle': 650 },
    { month: 'Apr', 'New York': 1050, 'Los Angeles': 1350, 'Chicago': 800, 'Miami': 740, 'Seattle': 630 },
    { month: 'May', 'New York': 1000, 'Los Angeles': 1300, 'Chicago': 780, 'Miami': 720, 'Seattle': 600 },
    { month: 'Jun', 'New York': 950, 'Los Angeles': 1250, 'Chicago': 750, 'Miami': 700, 'Seattle': 580 }
  ],
  'daysOnMarket': [
    { month: 'Jan', 'New York': 45, 'Los Angeles': 38, 'Chicago': 52, 'Miami': 40, 'Seattle': 35 },
    { month: 'Feb', 'New York': 43, 'Los Angeles': 36, 'Chicago': 50, 'Miami': 38, 'Seattle': 33 },
    { month: 'Mar', 'New York': 40, 'Los Angeles': 34, 'Chicago': 48, 'Miami': 36, 'Seattle': 30 },
    { month: 'Apr', 'New York': 38, 'Los Angeles': 32, 'Chicago': 45, 'Miami': 34, 'Seattle': 28 },
    { month: 'May', 'New York': 35, 'Los Angeles': 30, 'Chicago': 42, 'Miami': 32, 'Seattle': 25 },
    { month: 'Jun', 'New York': 32, 'Los Angeles': 28, 'Chicago': 40, 'Miami': 30, 'Seattle': 22 }
  ]
};

// Mock data for neighborhood insights
const neighborhoods = [
  {
    id: 1,
    name: "Upper East Side",
    city: "New York",
    avgPrice: 2100000,
    priceChange: 5.2,
    inventory: 120,
    daysOnMarket: 28,
    walkScore: 92,
    image: "https://images.unsplash.com/photo-1622032493735-6d5b0e68b6c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Beverly Hills",
    city: "Los Angeles",
    avgPrice: 3500000,
    priceChange: 3.8,
    inventory: 85,
    daysOnMarket: 32,
    walkScore: 78,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 3,
    name: "Lincoln Park",
    city: "Chicago",
    avgPrice: 950000,
    priceChange: 4.1,
    inventory: 95,
    daysOnMarket: 35,
    walkScore: 88,
    image: "https://images.unsplash.com/photo-1616632631339-7b9846bc2b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    name: "South Beach",
    city: "Miami",
    avgPrice: 1200000,
    priceChange: 6.5,
    inventory: 110,
    daysOnMarket: 25,
    walkScore: 85,
    image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 5,
    name: "Queen Anne",
    city: "Seattle",
    avgPrice: 1350000,
    priceChange: 4.8,
    inventory: 75,
    daysOnMarket: 22,
    walkScore: 82,
    image: "https://images.unsplash.com/photo-1568912269693-a6a0a7e5d419?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    name: "Back Bay",
    city: "Boston",
    avgPrice: 1850000,
    priceChange: 3.2,
    inventory: 65,
    daysOnMarket: 30,
    walkScore: 95,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];

// Mock data for market reports
const marketReports = [
  {
    id: 1,
    title: "Q2 2025 Residential Market Report",
    description: "Comprehensive analysis of the residential real estate market trends for the second quarter of 2025.",
    date: "June 15, 2025",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Luxury Market Insights 2025",
    description: "Detailed examination of the luxury real estate segment, including price trends and buyer demographics.",
    date: "May 28, 2025",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "First-Time Homebuyer Guide 2025",
    description: "Essential information and market analysis for first-time homebuyers in today's competitive market.",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
  }
];

const cityColors = {
  'New York': 'hsl(var(--chart-1))',
  'Los Angeles': 'hsl(var(--chart-2))',
  'Chicago': 'hsl(var(--chart-3))',
  'Miami': 'hsl(var(--chart-4))',
  'Seattle': 'hsl(var(--chart-5))'
};

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const ExplorePage = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState(neighborhoods);
  
  useEffect(() => {
    let filtered = neighborhoods;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        neighborhood => 
          neighborhood.name.toLowerCase().includes(query) || 
          neighborhood.city.toLowerCase().includes(query)
      );
    }
    
    if (selectedCity !== 'all') {
      filtered = filtered.filter(neighborhood => neighborhood.city === selectedCity);
    }
    
    setFilteredNeighborhoods(filtered);
  }, [searchQuery, selectedCity]);
  
  const getYAxisFormatter = (metric: string) => {
    switch (metric) {
      case 'price':
        return (value: number) => formatYAxis(value);
      case 'inventory':
        return (value: number) => value.toString();
      case 'daysOnMarket':
        return (value: number) => `${value} days`;
      default:
        return (value: number) => value.toString();
    }
  };
  
  const getTooltipFormatter = (metric: string) => {
    switch (metric) {
      case 'price':
        return (value: number) => [`$${value.toLocaleString()}`, ''];
      case 'inventory':
        return (value: number) => [`${value} listings`, ''];
      case 'daysOnMarket':
        return (value: number) => [`${value} days`, ''];
      default:
        return (value: number) => [value.toString(), ''];
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Real Estate Market</h1>
        <p className="text-muted-foreground">
          Discover market trends, neighborhood insights, and property value forecasts
        </p>
      </div>
      
      {/* Market Trends Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Market Trends</h2>
          <div className="flex gap-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Average Price</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="daysOnMarket">Days on Market</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetric === 'daysOnMarket' ? (
                  <BarChart
                    data={marketTrends[selectedMetric as keyof typeof marketTrends]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={getYAxisFormatter(selectedMetric)} />
                    <Tooltip 
                      formatter={getTooltipFormatter(selectedMetric)}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    {Object.keys(cityColors).map((city) => (
                      <Bar
                        key={city}
                        dataKey={city}
                        fill={cityColors[city as keyof typeof cityColors]}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                ) : (
                  <AreaChart
                    data={marketTrends[selectedMetric as keyof typeof marketTrends]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={getYAxisFormatter(selectedMetric)} />
                    <Tooltip 
                      formatter={getTooltipFormatter(selectedMetric)}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Legend />
                    {Object.keys(cityColors).map((city) => (
                      <Area
                        key={city}
                        type="monotone"
                        dataKey={city}
                        stroke={cityColors[city as keyof typeof cityColors]}
                        fill={cityColors[city as keyof typeof cityColors]}
                        fillOpacity={0.2}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
              {Object.keys(cityColors).map((city) => {
                const data = marketTrends[selectedMetric as keyof typeof marketTrends];
                const latestValue = data[data.length - 1][city as keyof typeof data[0]] as number;
                const previousValue = data[data.length - 2][city as keyof typeof data[0]] as number;
                const percentChange = ((latestValue - previousValue) / previousValue) * 100;
                
                return (
                  <Card key={city} className="border-l-4" style={{ borderLeftColor: cityColors[city as keyof typeof cityColors] }}>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">{city}</div>
                      <div className="text-2xl font-bold mt-1">
                        {selectedMetric === 'price' && `$${latestValue.toLocaleString()}`}
                        {selectedMetric === 'inventory' && latestValue.toLocaleString()}
                        {selectedMetric === 'daysOnMarket' && `${latestValue} days`}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Neighborhood Insights Section */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Neighborhood Insights</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search neighborhoods..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="Seattle">Seattle</SelectItem>
                <SelectItem value="Boston">Boston</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((neighborhood, index) => (
            <motion.div
              key={neighborhood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-[200px]">
                  <Image
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{neighborhood.name}</h3>
                    <p className="text-white/80">{neighborhood.city}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Price</p>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-primary mr-1" />
                        <p className="font-semibold">${neighborhood.avgPrice.toLocaleString()}</p>
                      </div>
                      <p className={`text-xs ${neighborhood.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {neighborhood.priceChange >= 0 ? '↑' : '↓'} {Math.abs(neighborhood.priceChange).toFixed(1)}% YoY
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Inventory</p>
                      <div className="flex items-center">
                        <Home className="h-4 w-4 text-primary mr-1" />
                        <p className="font-semibold">{neighborhood.inventory} listings</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days on Market</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-1" />
                        <p className="font-semibold">{neighborhood.daysOnMarket} days</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Walk Score</p>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-1" />
                        <p className="font-semibold">{neighborhood.walkScore}/100</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href={`/properties?location=${encodeURIComponent(neighborhood.name)}`}>
                      View Properties
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No neighborhoods found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {setSearchQuery(''); setSelectedCity('all');}}>Reset Filters</Button>
          </div>
        )}
      </section>
      
      {/* Market Reports Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Market Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="relative h-[200px]">
                  <Image
                    src={report.image}
                    alt={report.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{report.date}</div>
                  <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                  <p className="text-muted-foreground mb-4">{report.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/reports/${report.id}`}>
                      Read Report
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;