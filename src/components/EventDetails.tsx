// src/components/EventDetails.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the structure of a Detailed Event
type DetailedEvent = {
  id: number;
  title: string;
  date: string;
  contents: string;
  imageUrls: string[];
};

// --- Dummy Images for Fallback ---
const dummyImages = [
    "https://placehold.co/1280x720/F97316/FFFFFF?text=Event+Image+1",
    "https://placehold.co/1280x720/FBBF24/FFFFFF?text=Event+Image+2",
    "https://placehold.co/1280x720/EF4444/FFFFFF?text=Event+Image+3",
];

export default function EventDetails({ event }: { event: DetailedEvent }) {
  // Sanitize the data received as props
  const sanitizedEvent = {
      ...event,
      imageUrls: (event.imageUrls && event.imageUrls.length > 0) ? event.imageUrls : dummyImages,
      category: new Date(event.date) > new Date() ? "Upcoming" : "Past Event",
      contents: event.contents || "No description available."
  };
  
  const formattedDate = new Date(sanitizedEvent.date).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Event Hero Section */}
      <section className="w-full h-80 bg-cover bg-center relative text-white flex items-center justify-center text-center">
          <Image src={sanitizedEvent.imageUrls[0]} alt={sanitizedEvent.title} fill className="object-cover z-0" priority />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative z-10">
              {sanitizedEvent.category && (
                  <Badge variant={sanitizedEvent.category === 'Upcoming' ? 'default' : 'secondary'} className={sanitizedEvent.category === 'Upcoming' ? 'bg-orange-500 text-white mb-4' : 'mb-4'}>
                      {sanitizedEvent.category}
                  </Badge>
              )}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{sanitizedEvent.title}</h1>
          </div>
      </section>

      {/* Event Content */}
      <section className="w-full py-16 px-6 bg-slate-50">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-4 text-slate-800">About the Event</h2>
                <div className="prose max-w-none text-muted-foreground leading-relaxed">
                    <p>{sanitizedEvent.contents}</p>
                </div>
            </div>

            {/* Details Card */}
            <div className="lg:sticky top-24 h-fit">
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Info className="h-6 w-6 text-orange-500" />
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-semibold">Date</p>
                                <p className="text-muted-foreground">{formattedDate}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      {sanitizedEvent.imageUrls.length > 0 && (
        <section className="w-full py-16 px-6">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Event Gallery</h2>
                <Carousel className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
                    <CarouselContent>
                        {sanitizedEvent.imageUrls.map((image, index) => (
                            <CarouselItem key={index}>
                                <Image src={image} alt={`${sanitizedEvent.title} image ${index + 1}`} width={1280} height={720} className="w-full h-auto object-cover aspect-video" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
            </div>
        </section>
      )}
    </main>
  );
}
