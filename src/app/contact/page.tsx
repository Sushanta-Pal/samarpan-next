// src/app/contact/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Facebook, Linkedin, Mail, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission (e.g., send to an API)
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We will get back to you soon.",
    });
  };

  return (
    <main className="flex flex-col items-center">
      {/* Page Header */}
      <section className="w-full bg-slate-50 py-20 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, a suggestion, or want to volunteer, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="w-full py-20 px-6">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input type="text" placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Textarea placeholder="Your Message" rows={6} required />
              <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Details */}
          <div className="space-y-6">
            <a href="mailto:hithaldia.samarpan@gmail.com" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-6 flex items-center gap-6 hover:shadow-lg hover:border-orange-500 transition-all">
                <Mail className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">hithaldia.samarpan@gmail.com</p>
                </div>
              </Card>
            </a>
            <a href="https://www.google.com/maps/place/Haldia+Institute+of+Technology" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-6 flex items-center gap-6 hover:shadow-lg hover:border-yellow-500 transition-all">
                <MapPin className="h-8 w-8 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="text-muted-foreground">Haldia Institute of Technology, Haldia, 721657</p>
                </div>
              </Card>
            </a>
             <Card className="p-6 hover:shadow-lg transition-all">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex items-center space-x-6">
                  <a href="https://www.instagram.com/samarpan_hit/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="https://www.facebook.com/samarpanathith" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    <Facebook size={28} />
                  </a>
                  <a href="https://www.linkedin.com/company/samarpanhit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-sky-700 transition-colors">
                    <Linkedin size={28} />
                  </a>
                </div>
              </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
