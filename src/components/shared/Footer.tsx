import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import Logo from './Logo'; // Assuming Logo.tsx is in the same directory
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-900 text-slate-200">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* About Section (takes more space) */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            {/* Using the logo component for consistency */}
            <Logo />
          </div>
          <p className="text-slate-400 mt-2 text-sm">
            An NGO of Haldia Institute of Technology, providing free primary education to needy children.
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <a href="https://www.facebook.com/samarpanathith" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
              <Facebook size={22} />
            </a>
            <a href="https://www.instagram.com/samarpan_hit/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
              <Instagram size={22} />
            </a>
            <a href="https://www.linkedin.com/company/samarpanhit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-orange-500 transition-colors">
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/events" className="text-slate-400 hover:text-white transition-colors">Events</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h3 className="font-semibold text-white">Get Involved</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/team" className="text-slate-400 hover:text-white transition-colors">Our Team</Link></li>
            <li><Link href="/donate" className="text-slate-400 hover:text-white transition-colors">Donate</Link></li>
          </ul>
        </div>

        {/* Stay Updated Section */}
        <div className="lg:col-span-1">
           <h3 className="font-semibold text-white">Stay Updated</h3>
           <p className="text-slate-400 mt-2 text-sm mb-4">
            Join our newsletter to get the latest updates.
           </p>
           <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" className="bg-slate-800 border-slate-700 text-white" />
            <Button type="submit" size="icon" className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:opacity-90 transition-opacity">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="container py-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} SAMARPAN. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
