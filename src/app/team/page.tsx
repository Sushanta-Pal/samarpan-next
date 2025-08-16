// src/app/team/page.tsx
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, GraduationCap, Linkedin } from "lucide-react";
import CountUp from "react-countup";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define the structure of a Team Member profile
type TeamMember = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
};

// --- Mock Data ---
const mockTeamData: TeamMember[] = [
    // Top 2 (Leadership)
    { id: 1, name: "Aarav Sharma", role: "President", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 2, name: "Diya Patel", role: "Vice President", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop", linkedinUrl: "#" },
    // Next 4 (Core Team)
    { id: 3, name: "Rohan Kumar", role: "Lead Developer", imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 4, name: "Isha Gupta", role: "Marketing Head", imageUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 5, name: "Arjun Singh", role: "Event Coordinator", imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 6, name: "Meera Reddy", role: "Creative Designer", imageUrl: "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
    // General Members
    { id: 7, name: "Kabir Khan", role: "Finance Manager", imageUrl: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 8, name: "Zara Ali", role: "Volunteer Lead", imageUrl: "https://images.unsplash.com/photo-1488426862026-39b533079b33?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 9, name: "Anika Rao", role: "Content Writer", imageUrl: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop", linkedinUrl: "#" },
    { id: 10, name: "Vivaan Joshi", role: "Photographer", imageUrl: "https://images.unsplash.com/photo-1522556189639-b150ed9c4331?q=80&w=1887&auto=format&fit=crop", linkedinUrl: "#" },
];
// --- End Mock Data ---


// The new, re-designed Team Card component with 3D effect
const TeamCard = ({ member, size = 'normal' }: { member: TeamMember, size?: 'normal' | 'large' }) => {
    const cardSize = size === 'large' ? 'w-64 h-80' : 'w-60 h-72';
    return (
        <div className={cn("group relative rounded-xl shadow-lg transition-transform duration-500 transform-style-3d hover:-translate-y-2", cardSize)}>
            {/* Card Backside */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl backface-hidden" />

            {/* Card Frontside */}
            <div className="absolute inset-0 w-full h-full bg-white rounded-xl backface-hidden transform group-hover:rotate-y-180 transition-transform duration-500">
                <div className="flex flex-col items-center justify-center h-full">
                    <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-slate-100"
                    />
                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
                        <p className="text-sm text-orange-600">{member.role}</p>
                    </div>
                </div>
            </div>
             {/* Card Frontside - Hover Content */}
            <div className="absolute inset-0 w-full h-full bg-black/70 rounded-xl backface-hidden flex flex-col items-center justify-center text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-500/50"
                />
                <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                <p className="text-md text-yellow-400">{member.role}</p>
                {member.linkedinUrl && (
                    <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-4">
                        <Linkedin className="h-8 w-8 hover:text-yellow-400 transition-colors" />
                    </Link>
                )}
            </div>
        </div>
    );
};

// Skeleton loader to match the new card
const TeamCardSkeleton = () => (
    <Skeleton className="w-60 h-72 rounded-xl" />
);

// A helper component to render a section title
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">{children}</h2>
        <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
    </div>
);

// Redesigned component for the core team layout
const CoreTeamLayout = ({ members }: { members: TeamMember[] }) => {
    if (members.length !== 4) return null;

    return (
        <div className="relative py-12 hidden lg:flex justify-center items-center">
            {/* Decorative background circle */}
            <div className="absolute w-[600px] h-[600px] bg-slate-100 rounded-full" />
            
            {/* 2x2 Grid for perfect centering and distribution */}
            <div className="relative grid grid-cols-2 gap-x-48 gap-y-12">
                {members.map((member) => (
                    <TeamCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};


export default function TeamPage() {
  const [team, setTeam] = React.useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setTeam(mockTeamData);
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  const renderTeamSection = (members: TeamMember[], size?: 'large' | 'normal') => (
      members.map((member) => <TeamCard key={member.id} member={member} size={size} />)
  );

  return (
    <main className="flex flex-col items-center bg-slate-50">
      {/* Page Header */}
      <section className="w-full bg-slate-900 text-white py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Meet Our Team</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            The passionate individuals dedicated to making a difference, one child at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full -mt-16 z-10">
          <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="p-8 bg-white rounded-lg shadow-xl flex items-center gap-6 border-t-4 border-orange-500">
                      <div className="p-4 bg-orange-100 rounded-full">
                          <GraduationCap className="h-8 w-8 text-orange-600" />
                      </div>
                      <div>
                          <h3 className="text-4xl font-bold text-slate-800">
                              <CountUp end={25} duration={3} enableScrollSpy scrollSpyOnce />+
                          </h3>
                          <p className="text-muted-foreground">Dedicated Teachers</p>
                      </div>
                  </div>
                   <div className="p-8 bg-white rounded-lg shadow-xl flex items-center gap-6 border-t-4 border-yellow-500">
                      <div className="p-4 bg-yellow-100 rounded-full">
                          <Users className="h-8 w-8 text-yellow-600" />
                      </div>
                      <div>
                          <h3 className="text-4xl font-bold text-slate-800">
                              <CountUp end={500} duration={3} enableScrollSpy scrollSpyOnce />+
                          </h3>
                          <p className="text-muted-foreground">Active Volunteers</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Team Sections */}
      <section className="w-full py-24 px-6">
        <div className="container space-y-24">
          {/* Leadership Section */}
          {isLoading ? (
            <div className="flex justify-center gap-8">
              <TeamCardSkeleton />
              <TeamCardSkeleton />
            </div>
          ) : (
            team.length > 0 && (
              <div>
                <SectionTitle>Leadership</SectionTitle>
                <div className="flex flex-wrap justify-center gap-8">
                  {renderTeamSection(team.slice(0, 2), 'large')}
                </div>
              </div>
            )
          )}

          {/* Core Team Section */}
          {isLoading ? (
             <div className="flex justify-center gap-8 flex-wrap">
              {Array.from({ length: 4 }).map((_, index) => <TeamCardSkeleton key={index} />)}
            </div>
          ) : (
            team.length > 2 && (
              <div>
                <SectionTitle>Core Team</SectionTitle>
                <CoreTeamLayout members={team.slice(2, 6)} />
                <div className="flex flex-wrap justify-center gap-8 lg:hidden">
                  {renderTeamSection(team.slice(2, 6))}
                </div>
              </div>
            )
          )}

          {/* General Members Section */}
          {isLoading ? null : (
            team.length > 6 && (
              <div>
                <SectionTitle>Our Members</SectionTitle>
                <div className="flex flex-wrap justify-center gap-8">
                  {renderTeamSection(team.slice(6))}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
