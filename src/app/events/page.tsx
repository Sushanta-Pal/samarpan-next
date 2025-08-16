// src/app/events/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the structure of an Event
type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  category: "Past Event" | "Upcoming";
};

// --- Mock Data ---
const mockEvents: Event[] = [
  { id: "annual-day-2024", title: "Annual Day Celebration 2024", date: "August 15, 2024", description: "A day of fun, performances, and celebration with the children, showcasing their talents.", imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", category: "Upcoming" },
  { id: "sports-fest", title: "Sports Fest", date: "July 20, 2024", description: "An exciting day of sports and games, promoting teamwork and physical fitness.", imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade974d?q=80&w=1935&auto=format&fit=crop", category: "Past Event" },
  { id: "art-workshop", title: "Art & Craft Workshop", date: "June 05, 2024", description: "A creative workshop where children explored their artistic talents through painting and crafts.", imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop", category: "Past Event" },
  { id: "science-fair", title: "Annual Science Fair", date: "May 10, 2024", description: "Showcasing innovative science projects and experiments by our bright young minds.", imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1928&auto=format&fit=crop", category: "Past Event" },
];
// --- End Mock Data ---


// A reusable component for the loading skeleton
const EventCardSkeleton = () => (
    <Skeleton className="w-full h-96 rounded-lg" />
);

// The new, enhanced Event Card component
const EventCard = ({ event }: { event: Event }) => (
    <Link href={`/events/${event.id}`}>
        <div className="group relative overflow-hidden rounded-lg shadow-lg h-96 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={event.imageUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-4 right-4">
                 <Badge variant={event.category === 'Upcoming' ? 'default' : 'secondary'} className={event.category === 'Upcoming' ? 'bg-orange-500 text-white' : ''}>
                    {event.category}
                </Badge>
            </div>

            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                </div>
                <h3 className="text-2xl font-bold mt-2">{event.title}</h3>
                <p className="mt-2 text-slate-200 text-sm max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    {event.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Read More</span>
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
    </Link>
);


export default function EventsPage() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setEvents(mockEvents);
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
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
            ? Array.from({ length: 4 }).map((_, index) => <EventCardSkeleton key={index} />)
            : events.map((event) => <EventCard key={event.id} event={event} />)
          }
        </div>
      </section>
    </main>
  );
}
