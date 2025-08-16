// src/app/about/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, Goal } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Page Header */}
      <section className="w-full bg-slate-900 text-white py-20 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">About SAMARPAN</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Discover the story, mission, and vision that drive our commitment to education.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-20 px-6">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">How It All Began...</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Education is both the means as well as the end to a better life. It empowers an individual to earn their livelihood and increases awareness on a range of issues, helping them evolve as a better citizen. Doubtless, education is the most powerful catalyst for social transformation.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Rewinding back to 2014, a few strong-willed students, led by Om Prakash Jha, asked why local children were working when they should have been nurturing their young minds. With determination sturdier than rock, he laid the foundation of SAMARPAN. Thus, was born a venture to teach with a belief towards a brighter future: SAMARPAN - ‘Ek Soch Ek Viswas’.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/hero-background.jpg" // Replace with a relevant image of the team or children
              alt="Samarpan Team" 
              className="rounded-lg shadow-2xl object-cover w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Vision and Goal Section */}
      <section className="w-full bg-slate-50 py-20 px-6">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-l-4 border-orange-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="h-8 w-8 text-orange-500" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a world where every child has the opportunity to receive a quality education, empowering them to build a brighter future for themselves and their communities. We envision a society free from the shackles of illiteracy.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-yellow-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <Goal className="h-8 w-8 text-yellow-500" />
              <CardTitle>Our Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Samarpan aims to create a positive change in the lives of economically underprivileged children. We impart the basic tool necessary for growth, Education, empowering the little ones with academic and life lessons.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

       {/* Call to Action Section */}
      <section className="w-full py-20 px-6 text-center">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-800">Join Us in Making a Difference</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Whether you are a student, a professional, or just someone who wants to help, your contribution can change a life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/donate" passHref>
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
                Donate Now
              </Button>
            </Link>
            <Link href="/team" passHref>
              <Button size="lg" variant="outline">
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
