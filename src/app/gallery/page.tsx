// src/app/gallery/page.tsx
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Camera, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Import the Supabase client
import { Button } from "@/components/ui/button";

// Define the structure of a Gallery Album
type Album = {
  id: number;
  title: string;
  imageUrls: string[]; // This should match your Supabase column name
};

// --- Dummy Images for Fallback ---
const dummyImages = [
    "https://placehold.co/600x800/F97316/FFFFFF?text=Image+1",
    "https://placehold.co/800x600/FBBF24/FFFFFF?text=Image+2",
    "https://placehold.co/600x600/EF4444/FFFFFF?text=Image+3",
];
// --- End Dummy Images ---


// A reusable component for the loading skeleton
const AlbumCardSkeleton = () => (
    <Skeleton className="w-full h-80 rounded-lg" />
);

// The new, re-designed "Polaroid" style Album Card component
const AlbumCard = ({ album }: { album: Album }) => (
    <Dialog>
        <DialogTrigger asChild>
            <div className="group relative break-inside-avoid mb-8 cursor-pointer">
                <div className="relative bg-white p-4 pb-16 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-2 hover:rotate-3 hover:shadow-xl">
                    <div className="overflow-hidden rounded-md">
                        <img
                            src={album.imageUrls[0]} // Use the first image as the cover
                            alt={album.title}
                            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                        <h3 className="text-lg font-semibold text-slate-700 font-serif">{album.title}</h3>
                         <div className="flex items-center justify-center gap-2 mt-1 text-xs text-slate-500">
                            <Camera size={14} />
                            <span>{album.imageUrls.length} Photos</span>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <Button variant="outline" className="text-white bg-transparent border-white hover:bg-white hover:text-black">
                            View Album <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
            <DialogHeader>
                <DialogTitle>{album.title}</DialogTitle>
            </DialogHeader>
            <Carousel className="w-full">
                <CarouselContent>
                    {album.imageUrls.map((image, index) => (
                        <CarouselItem key={index}>
                            <img src={image} alt={`${album.title} image ${index + 1}`} className="w-full h-auto object-contain rounded-md max-h-[70vh]" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </DialogContent>
    </Dialog>
);


export default function GalleryPage() {
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('gallery_albums')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error fetching gallery data:", error);
      } else if (data) {
        // Sanitize data to provide dummy images for albums with no images
        const sanitizedData = data.map(album => ({
            ...album,
            imageUrls: (album.imageUrls && album.imageUrls.length > 0) ? album.imageUrls : dummyImages,
        }));
        setAlbums(sanitizedData);
      }
      setIsLoading(false);
    };

    fetchAlbums();
  }, []);

  return (
    <main className="flex flex-col items-center bg-slate-50">
      {/* Page Header */}
      <section className="w-full bg-slate-900 text-white py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our Gallery</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A picture is worth a thousand words. Here are some of our favorite moments.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full py-24 px-6">
        <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                 {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => <AlbumCardSkeleton key={index} />)
                    : albums.map((album) => <AlbumCard key={album.id} album={album} />)
                 }
            </div>
        </div>
      </section>
    </main>
  );
}
