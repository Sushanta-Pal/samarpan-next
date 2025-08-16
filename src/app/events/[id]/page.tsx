// src/app/events/[id]/page.tsx
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the structure of a Detailed Event
type DetailedEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  category: "Past Event" | "Upcoming";
};

// --- Mock Data ---
// In a real app, you would fetch only the specific event data based on the ID
const mockDetailedEvents: DetailedEvent[] = [
    { id: "annual-day-2024", title: "Annual Day Celebration 2024", date: "August 15, 2024", description: "A day of fun, performances, and celebration with the children, showcasing their talents. The event featured singing, dancing, and drama, culminating in a prize distribution ceremony to recognize the children's achievements throughout the year.", images: ["https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", "https://images.unsplash.com/photo-1519167758481-83f550bb49b6?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"], category: "Upcoming" },
    { id: "sports-fest", title: "Sports Fest", date: "July 20, 2024", description: "An exciting day of sports and games, promoting teamwork and physical fitness among the children. Activities included a friendly football match, relay races, and other fun games, followed by a healthy lunch for all participants.", images: ["https://images.unsplash.com/photo-1579952363873-27f3bade974d?q=80&w=1935&auto=format&fit=crop", "https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=1887&auto=format&fit=crop"], category: "Past Event" },
    { id: "art-workshop", title: "Art & Craft Workshop", date: "June 05, 2024", description: "A creative workshop where children explored their artistic talents through painting, drawing, and craft-making. The session was guided by volunteer artists, and the children's beautiful creations were displayed for everyone to admire.", images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop", "https://images.unsplash.com/photo-1581292336312-5c746b962a26?q=80&w=1887&auto=format&fit=crop"], category: "Past Event" },
    { id: "science-fair", title: "Annual Science Fair", date: "May 10, 2024", description: "Showcasing innovative science projects and experiments by our bright young minds. The fair aimed to foster a love for science and critical thinking, with projects ranging from simple physics models to environmental conservation ideas.", images: ["https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1928&auto=format&fit=crop", "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=1925&auto=format&fit=crop"], category: "Past Event" },
];
// --- End Mock Data ---


export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = React.useState<DetailedEvent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate fetching data for a single event
    const fetchData = () => {
      // ** TODO: Replace this with your Supabase fetch call for a single event **
      // const { data, error } = await supabase.from('events').select('*').eq('id', params.id).single();
      // if (data) setEvent(data);
      const foundEvent = mockDetailedEvents.find(e => e.id === params.id);
      setTimeout(() => {
        setEvent(foundEvent || null);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [params.id]);

  if (isLoading) {
    return (
        <div className="container py-20">
            <Skeleton className="w-full h-96 rounded-lg" />
            <Skeleton className="h-10 w-3/4 mt-8" />
            <Skeleton className="h-6 w-1/2 mt-4" />
            <Skeleton className="h-24 w-full mt-4" />
        </div>
    );
  }

  if (!event) {
    return <div className="text-center py-20">Event not found.</div>;
  }

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Event Header */}
      <section className="w-full py-20 px-6 bg-slate-50">
        <div className="container">
          <Badge variant={event.category === 'Upcoming' ? 'default' : 'secondary'} className={event.category === 'Upcoming' ? 'bg-orange-500 text-white mb-4' : 'mb-4'}>
              {event.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800">{event.title}</h1>
          <div className="flex items-center gap-2 mt-4 text-muted-foreground">
            <Calendar size={18} />
            <span>{event.date}</span>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="w-full py-12 px-6">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image Carousel */}
            <div className="lg:col-span-2">
                 <Carousel className="w-full rounded-lg overflow-hidden">
                    <CarouselContent>
                        {event.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <img src={image} alt={`${event.title} image ${index + 1}`} className="w-full h-auto object-cover aspect-video" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* Description */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">About the Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                </p>
            </div>
        </div>
      </section>
    </main>
  );
}
