// src/app/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Heart, Target, Calendar } from 'lucide-react';
import CountUp from 'react-countup';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center text-white relative"
        style={{ backgroundImage: `url('/hero-background.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="relative z-10 p-4 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-shadow-lg">
            SAMARPAN
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light tracking-wider text-shadow">
            EK SOCH, EK VISWAS
          </p>
          <Link href="/donate" passHref>
            <Button size="lg" className="mt-8 text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity transform hover:scale-105">
              Donate Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Message Section */}
      <section className="w-full max-w-5xl text-center py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
          ALL CHILDREN DESERVE AN OPPORTUNITY TO SUCCEED IN LIFE
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          An NGO of Haldia Institute of Technology, marching forward with the thirst of providing free primary education to the needy children of nearby areas.
        </p>
      </section>

      {/* Core Focus Section */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center border-t-4 border-transparent hover:border-orange-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="items-center">
              <div className="p-4 bg-orange-100 rounded-full">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="pt-4">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We aim to create a positive change by imparting the basic tool necessary for growth: Education.</p>
              <Link href="/about" passHref>
                <Button variant="link" className="px-0 mt-4 text-orange-600">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center border-t-4 border-transparent hover:border-yellow-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="items-center">
               <div className="p-4 bg-yellow-100 rounded-full">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="pt-4">Our Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">From educational drives to community gatherings, see the moments that define our journey.</p>
               <Link href="/events" passHref>
                <Button variant="link" className="px-0 mt-4 text-yellow-600">
                  View Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center border-t-4 border-transparent hover:border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="items-center">
               <div className="p-4 bg-red-100 rounded-full">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="pt-4">Get Involved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your support can empower children with books, learning materials, and a brighter future.</p>
              <Link href="/donate" passHref>
                <Button variant="link" className="px-0 mt-4 text-red-600">
                  Support Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section with Animated Counters */}
      <section className="w-full py-24 px-6 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Impact in Numbers</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Every number tells a story of a life changed, a future brightened, and a community strengthened.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="text-5xl font-extrabold text-orange-500">
                <CountUp end={150} duration={3} enableScrollSpy scrollSpyOnce />+
              </h3>
              <p className="mt-2 text-slate-300 text-lg">Children Educated</p>
            </div>
            <div className="p-4">
              <h3 className="text-5xl font-extrabold text-yellow-500">
                <CountUp end={50} duration={3} enableScrollSpy scrollSpyOnce />+
              </h3>
              <p className="mt-2 text-slate-300 text-lg">Events Organized</p>
            </div>
            <div className="p-4">
              <h3 className="text-5xl font-extrabold text-red-500">
                <CountUp end={500} duration={3} enableScrollSpy scrollSpyOnce />+
              </h3>
              <p className="mt-2 text-slate-300 text-lg">Volunteers Engaged</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
