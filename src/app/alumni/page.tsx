// src/app/alumni/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Linkedin, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Define the structure of an Alumni profile
type AlumniProfile = {
  id: number;
  name: string;
  imageUrl: string;
  company: string;
  linkedinUrl: string;
};

// --- Mock Data ---
// Replace this with your actual data fetched from Supabase
const mockAlumniData: AlumniProfile[] = [
  { id: 1, name: "Priya Sharma", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop", company: "Google", linkedinUrl: "#" },
  { id: 2, name: "Rohan Verma", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop", company: "Microsoft", linkedinUrl: "#" },
  { id: 3, name: "Anjali Mehta", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop", company: "Amazon", linkedinUrl: "#" },
  { id: 4, name: "Vikram Singh", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop", company: "Salesforce", linkedinUrl: "#" },
  { id: 5, name: "Neha Gupta", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop", company: "Adobe", linkedinUrl: "#" },
  { id: 6, name: "Karan Desai", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop", company: "Netflix", linkedinUrl: "#" },
  { id: 7, name: "Sonia Patel", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop", company: "Uber", linkedinUrl: "#" },
  { id: 8, name: "Arjun Reddy", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop", company: "Spotify", linkedinUrl: "#" },
];
// --- End Mock Data ---


// A reusable component for the loading skeleton
const AlumniCardSkeleton = () => (
    <Skeleton className="h-80 w-full rounded-lg" />
);

// The new, enhanced Alumni Card component
const AlumniCard = ({ profile }: { profile: AlumniProfile }) => (
    <div className="relative group overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-80">
        {/* Background Image */}
        <img src={profile.imageUrl} alt={profile.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Glassmorphism Content Box */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="p-4 rounded-md bg-white/10 backdrop-blur-md border border-white/20">
                <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-slate-300 text-sm">
                    <Briefcase size={14} />
                    <span>{profile.company}</span>
                </div>
                <Link href={profile.linkedinUrl} passHref className="w-full">
                    <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white transition-colors">
                        <Linkedin size={16} className="mr-2" />
                        Connect
                    </Button>
                </Link>
            </div>
        </div>
        
        {/* Subtle hover glow effect */}
        <div className="absolute inset-0 rounded-lg ring-2 ring-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
);


export default function AlumniPage() {
  const [alumni, setAlumni] = React.useState<AlumniProfile[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate fetching data from a database
    const fetchData = () => {
      setTimeout(() => {
        setAlumni(mockAlumniData);
        setIsLoading(false);
      }, 1500); // Simulate a 1.5-second delay
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/* Page Header */}
      <section className="w-full bg-slate-50 py-20 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800">Our Alumni</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the success of our members who continue to inspire and make a difference in the world.
          </p>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="w-full py-20 px-6">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? // Show 8 skeleton cards while loading
              Array.from({ length: 8 }).map((_, index) => <AlumniCardSkeleton key={index} />)
            : // Show the actual alumni cards once data is loaded
              alumni.map((profile) => (
                <AlumniCard key={profile.id} profile={profile} />
              ))}
        </div>
      </section>
    </main>
  );
}
