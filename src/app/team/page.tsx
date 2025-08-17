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
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  linkedinUrl?: string;
};

// --- Real Data Integration ---
const teamDataRaw = [
    { "id": "m-1", "name": "Om Prakash Jha", "role": "Founder & Mentor", "imageFormat": "jpg", "linkedinUrl": "#" },
    { "id": "m-2", "name": "Subhajit Das", "role": "Advisor", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-3", "name": "Soumyadeep Taladhi", "role": "Student Representative", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-4", "name": "Rahul Gope", "role": "Student Representative", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-5", "name": "Kumar Abhishek", "role": "Co Student Representative", "imageFormat": "JPG", "linkedinUrl": "#" },
    { "id": "m-6", "name": "Harsh Kumar", "role": "Co Student Representative", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-7", "name": "Oindrila Sengupta", "role": "Mentor Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-8", "name": "Prem Kumar", "role": "Mentor Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-9", "name": "Rupayan Das", "role": "Mentor Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-10", "name": "Priyajit Das", "role": "Teaching Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-11", "name": "Tithi Das", "role": "Teaching Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-12", "name": "Saikat Bhattacharya", "role": "Teaching Head", "imageFormat": "jpg", "linkedinUrl": "#" },
    { "id": "m-13", "name": "Tamanna Parween", "role": "Volunteer Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-14", "name": "Shubham Kumar", "role": "Volunteer Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-15", "name": "Aditya Srivastava", "role": "Volunteer Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-16", "name": "Subhajit Pramanick", "role": "Treasurer", "imageFormat": "png", "linkedinUrl": "#" },
    { "id": "m-17", "name": "Ashis Kumar", "role": "Treasurer", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-18", "name": "Ranit Mal", "role": "PR & Management Lead", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-19", "name": "Sachin Kumar", "role": "PR & Management Lead", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-20", "name": "Jahanvi chhajer", "role": "PR & Management Lead", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-21", "name": "Abheek Banerje", "role": "Media Head", "imageFormat": "jpg", "linkedinUrl": "#" },
    { "id": "m-22", "name": "Anusrita Saha", "role": "Creative Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-23", "name": "Sushanta Pal", "role": "Web Master", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-24", "name": "Shreya Mitra", "role": "Cultural Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-25", "name": "Srijani Bose", "role": "Cultural Head", "imageFormat": "jpeg", "linkedinUrl": "#" },
    { "id": "m-26", "name": "Alapan Das", "role": "Cultural Head", "imageFormat": "jpg", "linkedinUrl": "#" }
];

const teamData: TeamMember[] = teamDataRaw.map(member => ({
    ...member,
    imageUrl: `/${member.id}.${member.imageFormat.toLowerCase()}`
}));
// --- End Data Integration ---


// The new, re-designed Team Card component with 3D effect
const TeamCard = ({ member, size = 'normal' }: { member: TeamMember, size?: 'normal' | 'large' }) => {
    const cardSize = size === 'large' ? 'w-64' : 'w-60';
    const imageSize = size === 'large' ? 'w-36 h-36' : 'w-32 h-32';
    
    return (
        <div className={cn("group relative pt-20", cardSize)}>
            <div className="relative bg-white rounded-xl shadow-lg transition-transform duration-300 transform group-hover:scale-105">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 transition-transform duration-300 transform group-hover:-translate-y-2">
                    <div className={cn("rounded-full overflow-hidden border-4 border-white shadow-md", imageSize)}>
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                     {member.linkedinUrl && (
                        <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="absolute -bottom-2 -right-2 p-2 bg-slate-800 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 hover:bg-orange-500">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    )}
                </div>
                <div className="pt-20 pb-6 px-4 text-center">
                    <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
                    <p className="text-sm text-orange-600">{member.role}</p>
                </div>
            </div>
        </div>
    );
};

// Skeleton loader to match the new card
const TeamCardSkeleton = () => (
    <div className="w-60 pt-20">
        <div className="relative bg-white rounded-xl shadow-lg h-52">
             <Skeleton className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full" />
             <div className="pt-20 pb-6 px-4 text-center space-y-2">
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>
        </div>
    </div>
);

// A helper component to render a section title
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">{children}</h2>
        <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
    </div>
);

// Component for the circular core team layout
const CoreTeamLayout = ({ members }: { members: TeamMember[] }) => {
    if (members.length < 1) return null;

    return (
        <div className="relative py-12 hidden lg:flex justify-center items-center">
            <div className="absolute w-[600px] h-[600px] bg-slate-100 rounded-full" />
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
        setTeam(teamData);
        setIsLoading(false);
      }, 1500);
    };
    fetchData();
  }, []);

  const renderTeamSection = (members: TeamMember[], size?: 'normal' | 'large') => (
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
            {isLoading ? (
                <div className="flex justify-center gap-8 flex-wrap">
                    {Array.from({ length: 12 }).map((_, index) => <TeamCardSkeleton key={index} />)}
                </div>
            ) : (
                <>
                    {/* Founder & Advisor */}
                    <div>
                        <SectionTitle>Founder & Advisor</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(0, 2), 'large')}
                        </div>
                    </div>

                    {/* Student Representatives */}
                    <div>
                        <SectionTitle>Student Representatives</SectionTitle>
                        <CoreTeamLayout members={team.slice(2, 6)} />
                        <div className="flex flex-wrap justify-center gap-8 lg:hidden">
                            {renderTeamSection(team.slice(2, 6))}
                        </div>
                    </div>

                    {/* Mentor Heads */}
                    <div>
                        <SectionTitle>Mentor Heads</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(6, 9))}
                        </div>
                    </div>
                    
                    {/* Teaching Heads */}
                    <div>
                        <SectionTitle>Teaching Heads</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(9, 12))}
                        </div>
                    </div>

                    {/* Volunteer Heads */}
                    <div>
                        <SectionTitle>Volunteer Heads</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(12, 15))}
                        </div>
                    </div>
                    
                    {/* Treasurers */}
                    <div>
                        <SectionTitle>Treasurers</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(15, 17))}
                        </div>
                    </div>

                    {/* PR & Management */}
                    <div>
                        <SectionTitle>PR & Management</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(17, 20))}
                        </div>
                    </div>

                    {/* Media, Creative, Web */}
                     <div>
                        <SectionTitle>Media, Creative & Web</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(20, 23))}
                        </div>
                    </div>

                    {/* Cultural Heads */}
                    <div>
                        <SectionTitle>Cultural Heads</SectionTitle>
                        <div className="flex flex-wrap justify-center gap-8">
                            {renderTeamSection(team.slice(23, 26))}
                        </div>
                    </div>
                </>
            )}
        </div>
      </section>
    </main>
  );
}
