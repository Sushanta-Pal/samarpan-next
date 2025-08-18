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
// The props type is now defined inline to resolve the TypeScript error
export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // ✅ await the params

  // Fetch the specific event data on the server
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !event) {
    return <div className="text-center py-20">Event not found.</div>;
  }

  return <EventDetails event={event} />;
}
