// src/app/events/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

// Define the structure of an Event (category is now optional)
type Event = {
  id: number;
  title: string;
  date: string;
  contents: string;
  imageUrls: string[];
  category?: "Past Event" | "Upcoming";
};

// --- Dummy Image for Fallback ---
const dummyImage = "https://placehold.co/600x800/F97316/FFFFFF?text=Event";

// A reusable component for the loading skeleton
const EventCardSkeleton = () => (
    <Skeleton className="w-full h-96 rounded-lg" />
);

// The new, enhanced Event Card component
const EventCard = ({ event }: { event: Event }) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <Link href={`/events/${event.id}`}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg h-96 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={event.imageUrls[0]} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {event.category && (
                    <div className="absolute top-4 right-4">
                         <Badge variant={event.category === 'Upcoming' ? 'default' : 'secondary'} className={event.category === 'Upcoming' ? 'bg-orange-500 text-white' : ''}>
                            {event.category}
                        </Badge>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Calendar size={16} />
                        <span>{formattedDate}</span>
                    </div>
                    <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
                    <p className="mt-2 text-slate-200 text-sm max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                        {event.contents}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Read More</span>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};


export default function EventsPage() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false }); // Show newest events first

      if (error) {
        console.error("Error fetching events data:", error);
      } else if (data) {
        const sanitizedData = data.map(event => ({
            ...event,
            imageUrls: (event.imageUrls && event.imageUrls.length > 0) ? event.imageUrls : [dummyImage],
            // Dynamically determine the category based on the date
            category: new Date(event.date) > new Date() ? "Upcoming" : "Past Event",
            contents: event.contents || "No description available."
        }));
        setEvents(sanitizedData);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <main className="flex flex-col items-center bg-slate-50">
      {/* Page Header */}
      <section className="w-full bg-slate-900 text-white py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our Events</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            From educational drives to community celebrations, explore the moments that define our journey.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="w-full py-24 px-6">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <EventCardSkeleton key={index} />)
            : events.map((event) => <EventCard key={event.id} event={event} />)
          }
        </div>
      </section>
    </main>
  );
}
