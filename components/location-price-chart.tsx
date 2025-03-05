"use client";

import { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientOnly from '@/components/client-only';

// Mock data for price trends in Indian cities
const priceData = {
  '3months': [
    { month: 'Jan', 'Mumbai': 32000000, 'Delhi': 18000000, 'Bangalore': 15000000, 'Hyderabad': 12000000, 'Pune': 9500000 },
    { month: 'Feb', 'Mumbai': 33500000, 'Delhi': 18500000, 'Bangalore': 15500000, 'Hyderabad': 12300000, 'Pune': 9800000 },
    { month: 'Mar', 'Mumbai': 34800000, 'Delhi': 19200000, 'Bangalore': 16100000, 'Hyderabad': 12700000, 'Pune': 10200000 }
  ],
  '6months': [
    { month: 'Oct', 'Mumbai': 30000000, 'Delhi': 17000000, 'Bangalore': 14000000, 'Hyderabad': 11500000, 'Pune': 9000000 },
    { month: 'Nov', 'Mumbai': 30500000, 'Delhi': 17200000, 'Bangalore': 14200000, 'Hyderabad': 11600000, 'Pune': 9100000 },
    { month: 'Dec', 'Mumbai': 31200000, 'Delhi': 17600000, 'Bangalore': 14500000, 'Hyderabad': 11800000, 'Pune': 9300000 },
    { month: 'Jan', 'Mumbai': 32000000, 'Delhi': 18000000, 'Bangalore': 15000000, 'Hyderabad': 12000000, 'Pune': 9500000 },
    { month: 'Feb', 'Mumbai': 33500000, 'Delhi': 18500000, 'Bangalore': 15500000, 'Hyderabad': 12300000, 'Pune': 9800000 },
    { month: 'Mar', 'Mumbai': 34800000, 'Delhi': 19200000, 'Bangalore': 16100000, 'Hyderabad': 12700000, 'Pune': 10200000 }
  ],
  '1year': [
    { month: 'Apr', 'Mumbai': 28000000, 'Delhi': 16000000, 'Bangalore': 13000000, 'Hyderabad': 10500000, 'Pune': 8000000 },
    { month: 'May', 'Mumbai': 28500000, 'Delhi': 16200000, 'Bangalore': 13200000, 'Hyderabad': 10600000, 'Pune': 8100000 },
    { month: 'Jun', 'Mumbai': 29000000, 'Delhi': 16400000, 'Bangalore': 13400000, 'Hyderabad': 10700000, 'Pune': 8200000 },
    { month: 'Jul', 'Mumbai': 29500000, 'Delhi': 16600000, 'Bangalore': 13600000, 'Hyderabad': 10800000, 'Pune': 8300000 },
    { month: 'Aug', 'Mumbai': 30000000, 'Delhi': 16800000, 'Bangalore': 13800000, 'Hyderabad': 10900000, 'Pune': 8400000 },
    { month: 'Sep', 'Mumbai': 30500000, 'Delhi': 17000000, 'Bangalore': 14000000, 'Hyderabad': 11000000, 'Pune': 8500000 },
    { month: 'Oct', 'Mumbai': 31000000, 'Delhi': 17200000, 'Bangalore': 14200000, 'Hyderabad': 11100000, 'Pune': 8600000 },
    { month: 'Nov', 'Mumbai': 31500000, 'Delhi': 17400000, 'Bangalore': 14400000, 'Hyderabad': 11200000, 'Pune': 8700000 },
    { month: 'Dec', 'Mumbai': 32000000, 'Delhi': 17600000, 'Bangalore': 14600000, 'Hyderabad': 11300000, 'Pune': 8800000 },
    { month: 'Jan', 'Mumbai': 32500000, 'Delhi': 17800000, 'Bangalore': 14800000, 'Hyderabad': 11400000, 'Pune': 8900000 },
    { month: 'Feb', 'Mumbai': 33000000, 'Delhi': 18000000, 'Bangalore': 15000000, 'Hyderabad': 11500000, 'Pune': 9000000 },
    { month: 'Mar', 'Mumbai': 33500000, 'Delhi': 18200000, 'Bangalore': 15200000, 'Hyderabad': 11600000, 'Pune': 9100000 }
  ]
};

const cityColors = {
  'Mumbai': 'hsl(var(--chart-1))',
  'Delhi': 'hsl(var(--chart-2))',
  'Bangalore': 'hsl(var(--chart-3))',
  'Hyderabad': 'hsl(var(--chart-4))',
  'Pune': 'hsl(var(--chart-5))'
};

const formatYAxis = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(0)}L`;
  }
  return `₹${value}`;
};

const LocationPriceChart = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [propertyType, setPropertyType] = useState('all');
  
  const data = priceData[timeRange as keyof typeof priceData];
  
  return (
    <ClientOnly>
      <div>
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="price" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="sqft">Price/sqft</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
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
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
          {Object.keys(cityColors).map((city) => (
            <Card key={city} className="border-l-4" style={{ borderLeftColor: cityColors[city as keyof typeof cityColors] }}>
              <CardContent className="p-4">
                <div className="text-sm font-medium">{city}</div>
                <div className="text-2xl font-bold mt-1">
                  ₹{(data[data.length - 1][city as keyof typeof data[0]] as number).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Average property price
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ClientOnly>
  );
};

export default LocationPriceChart;