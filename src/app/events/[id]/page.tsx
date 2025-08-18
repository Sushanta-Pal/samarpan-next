// src/app/events/[id]/page.tsx
import * as React from "react";
import { supabase } from "@/lib/supabase";
import EventDetails from "@/components/EventDetails";

// This function runs at build time to generate static pages for each event
export async function generateStaticParams() {
  const { data: events, error } = await supabase.from('events').select('id');

  if (error || !events) {
    return [];
  }

  return events.map((event) => ({
    id: event.id.toString(),
  }));
}

// This is the main page component, now a Server Component
export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the specific event data on the server
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !event) {
    // A simple fallback for when an event is not found
    return <div className="text-center py-20">Event not found.</div>;
  }

  // Pass the fetched data to the client component for rendering
  return <EventDetails event={event} />;
}
