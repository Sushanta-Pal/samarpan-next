// src/app/gallery/page.tsx
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Camera } from "lucide-react";

// Define the structure of a Gallery Album
type Album = {
  id: number;
  title: string;
  images: string[];
};

// --- Mock Data ---
const mockAlbums: Album[] = [
  { id: 1, title: "Annual Day 2024", images: ["https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop", "https://images.unsplash.com/photo-1519167758481-83f550bb49b6?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"] },
  { id: 2, title: "Sports Fest", images: ["https://images.unsplash.com/photo-1579952363873-27f3bade974d?q=80&w=1935&auto=format&fit=crop", "https://images.unsplash.com/photo-1541250848049-b9f71362cb36?q=80&w=1887&auto=format&fit=crop"] },
  { id: 3, title: "Art Workshop", images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop", "https://images.unsplash.com/photo-1581292336312-5c746b962a26?q=80&w=1887&auto=format&fit=crop", "https://images.unsplash.com/photo-1581292336312-5c746b962a26?q=80&w=1887&auto=format&fit=crop", "https://images.unsplash.com/photo-1515419682768-937965b81a2c?q=80&w=2070&auto=format&fit=crop"] },
  { id: 4, title: "Science Fair", images: ["https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1928&auto=format&fit=crop", "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=1925&auto=format&fit=crop", "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=2072&auto=format&fit=crop"] },
  { id: 5, title: "Community Drive", images: ["https://images.unsplash.com/photo-1618423407341-a17f7b3e10a2?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"] },
  { id: 6, title: "Graduation Day", images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1627556704290-2b1f5853ff38?q=80&w=1920&auto=format&fit=crop", "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop"] },
];
// --- End Mock Data ---


// A reusable component for the loading skeleton
const AlbumCardSkeleton = () => (
    <div className="break-inside-avoid mb-8">
        <Skeleton className="w-full h-80 rounded-lg" />
    </div>
);

// The new, enhanced Album Card component
const AlbumCard = ({ album }: { album: Album }) => (
    <Dialog>
        <DialogTrigger asChild>
            <div className="group relative break-inside-avoid mb-8 cursor-pointer overflow-hidden rounded-lg shadow-lg">
                <div className="relative w-full h-80">
                    {album.images.slice(0, 3).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${album.title} preview ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform group-hover:rotate-0 group-hover:scale-100"
                            style={{
                                transform: `rotate(${(index - 1) * 8}deg) scale(${1 - index * 0.05})`,
                                zIndex: 3 - index,
                            }}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{album.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-300">
                        <Camera size={16} />
                        <span>{album.images.length} Photos</span>
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
                    {album.images.map((image, index) => (
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
    const fetchData = () => {
      setTimeout(() => {
        setAlbums(mockAlbums);
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Our Gallery</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A picture is worth a thousand words. Here are some of our favorite moments.
          </p>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="w-full py-24 px-6">
        <div className="container">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
                 {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => <AlbumCardSkeleton key={index} />)
                    : albums.map((album) => <AlbumCard key={album.id} album={album} />)
                 }
            </div>
        </div>
      </section>
    </main>
  );
}
