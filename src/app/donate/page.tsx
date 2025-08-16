// src/app/donate/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, IndianRupee, Landmark } from "lucide-react";

export default function DonatePage() {
  return (
    <main className="flex flex-col items-center bg-slate-50">
      {/* Page Header */}
      <section className="w-full bg-slate-900 text-white py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-background.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Empower a Future</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Your contribution, no matter the size, can light up a child's life with the gift of education.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-24 px-6">
        <div className="container grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Side: Why Donate */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-slate-800">Your Donation Makes a Real Impact</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At SAMARPAN, every contribution is a step towards a brighter future for an underprivileged child. We ensure that your support is used efficiently to provide essential learning materials, quality teaching, and a safe environment for our students.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <IndianRupee className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">₹500 - Sponsor a Child's Books</h3>
                  <p className="text-muted-foreground text-sm">Provides a complete set of notebooks and textbooks for one child for an entire academic year.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <IndianRupee className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-700">₹1,000 - Support a Learning Kit</h3>
                  <p className="text-muted-foreground text-sm">Funds a learning kit with stationery, art supplies, and educational toys to foster creativity.</p>
                </div>
              </div>
            </div>
             <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf09XecxdMAJSaEYEFTUtFZ7lc5_ZzoAUOW8cg1OjIlKyX81A/viewform" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="mt-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
                    <Heart className="mr-2 h-5 w-5" /> Fill Donation Form
                </Button>
            </Link>
          </div>

          {/* Right Side: How to Donate */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Ways to Contribute</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="font-semibold">Scan to Pay with UPI</h3>
                  {/* Updated img src to point to the public folder */}
                  <img src="/QR.jpeg" alt="Donation QR Code" className="w-48 h-48 mx-auto mt-2 rounded-lg" />
                </div>
                
                {/* Bank Transfer */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">
                        <div className="flex items-center gap-2">
                            <Landmark size={18} /> Bank Transfer Details
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-2 pt-2">
                      <p><strong>Account Name:</strong> SAMARPAN</p>
                      <p><strong>Account Number:</strong> XXXXXXXXXX</p>
                      <p><strong>Bank:</strong> State Bank of India</p>
                      <p><strong>IFSC Code:</strong> SBIN00XXXXX</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <p className="text-xs text-center text-muted-foreground pt-4">
                    After donating, please fill out our Google Form so we can send you a receipt and our heartfelt thanks!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
