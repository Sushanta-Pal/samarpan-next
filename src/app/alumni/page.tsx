// src/app/alumni/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Linkedin, Briefcase, Search, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase"; // Import the Supabase client
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define the structure of an Alumni profile
type AlumniProfile = {
  id: number;
  name: string;
  imageUrl: string;
  company: string;
  linkedinUrl: string;
  passout_batch?: number; // Added passout_batch field
};

// A reusable component for the loading skeleton
const AlumniCardSkeleton = () => (
    <Skeleton className="h-80 w-full rounded-lg" />
);

// The Alumni Card component with the fixed "Connect" button
const AlumniCard = ({ profile }: { profile: AlumniProfile }) => (
    <div className="relative group overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-80">
        {/* Background Image */}
        <img src={profile.imageUrl} alt={profile.name} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110" />
        
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
                 {profile.passout_batch && (
                    <div className="flex items-center gap-2 mt-1 text-slate-300 text-sm">
                        <GraduationCap size={14} />
                        <span>Batch of {profile.passout_batch}</span>
                    </div>
                )}
                {/* --- FIXED BUTTON --- */}
                <a 
                  href={profile.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white transition-colors flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium"
                >
                    <Linkedin size={16} className="mr-2" />
                    Connect
                </a>
            </div>
        </div>
        
        {/* Subtle hover glow effect */}
        <div className="absolute inset-0 rounded-lg ring-2 ring-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
);


export default function AlumniPage() {
  const [allAlumni, setAllAlumni] = React.useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = React.useState<AlumniProfile[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [passoutBatches, setPassoutBatches] = React.useState<number[]>([]);
  const [selectedBatch, setSelectedBatch] = React.useState<number | "all">("all");

  React.useEffect(() => {
    const fetchAlumni = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .order('passout_batch', { ascending: false });

      if (error) {
        console.error("Error fetching alumni data:", error);
      } else if (data) {
        const sanitizedData = data.map(profile => ({
            ...profile,
            company: profile.company || "Freelancer",
            linkedinUrl: profile.linkedinUrl || "#",
            imageUrl: profile.imageUrl || `https://placehold.co/400x400/F97316/FFFFFF?text=${profile.name.substring(0,2)}`,
            passout_batch: profile.passout_batch || null,
        }));
        setAllAlumni(sanitizedData);
        setFilteredAlumni(sanitizedData);
        
        // Extract unique, sorted passout batches
        const batches = Array.from(new Set(sanitizedData.map(p => p.passout_batch).filter(Boolean))) as number[];
        setPassoutBatches(batches.sort((a, b) => b - a));
      }
      setIsLoading(false);
    };

    fetchAlumni();
  }, []);

  React.useEffect(() => {
    let results = allAlumni;

    // Filter by selected batch first
    if (selectedBatch !== "all") {
        results = results.filter(profile => profile.passout_batch === selectedBatch);
    }

    // Then filter by search term
    if (searchTerm) {
        results = results.filter(profile =>
            profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    setFilteredAlumni(results);
  }, [searchTerm, selectedBatch, allAlumni]);

  return (
    <main className="flex flex-col items-center bg-slate-50">
      {/* Page Header */}
      <section className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 md:py-32 text-center border-b">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
            Our Alumni Network
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the stories of our graduates who are making a difference and leading the way in their fields.
          </p>
          <div className="mt-8 max-w-lg mx-auto flex items-center bg-white rounded-full shadow-md transition-all duration-300 focus-within:shadow-lg">
            <div className="pl-5 pr-2">
                <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
                type="search"
                placeholder="Search by name or company..."
                className="flex-1 h-14 bg-transparent border-none focus:ring-0 focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedBatch("all"); // Reset batch filter when searching
                }}
            />
            <Button className="m-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
                Search
            </Button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="w-full py-6 border-b">
          <div className="container flex justify-center items-center gap-2 flex-wrap">
              <Button 
                variant={selectedBatch === "all" ? "default" : "outline"}
                className={cn(selectedBatch === "all" && "bg-orange-500 hover:bg-orange-600 text-white")}
                onClick={() => setSelectedBatch("all")}
              >
                All Batches
              </Button>
              {passoutBatches.map(batch => (
                  <Button 
                    key={batch}
                    variant={selectedBatch === batch ? "default" : "outline"}
                    className={cn(selectedBatch === batch && "bg-orange-500 hover:bg-orange-600 text-white")}
                    onClick={() => setSelectedBatch(batch)}
                  >
                    {batch}
                  </Button>
              ))}
          </div>
      </section>

      {/* Alumni Grid */}
      <section className="w-full py-24 px-6">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? // Show 8 skeleton cards while loading
              Array.from({ length: 8 }).map((_, index) => <AlumniCardSkeleton key={index} />)
            : // Show the filtered alumni cards
              filteredAlumni.length > 0 ? (
                filteredAlumni.map((profile) => (
                    <AlumniCard key={profile.id} profile={profile} />
                ))
              ) : (
                <div className="col-span-full text-center text-muted-foreground py-12">
                    <h3 className="text-xl font-semibold">No Alumni Found</h3>
                    <p>Try adjusting your search or filter.</p>
                </div>
              )
          }
        </div>
      </section>
    </main>
  );
}
