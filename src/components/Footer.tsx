// Footer.tsx

import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'; // Using lucide-react for social icons

// Define the structure for a link column
interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

// Mock Data for Footer Links
const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="container px-4 py-12 mx-auto md:px-8">
        
        {/* Top Section: Logo/Description and Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-16">
          
          {/* 1. Logo and Description Column (Takes 1-2 columns on wider screens) */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <img className='h-12' src="/Images/BlogNest.png" alt="logo-blognest" />
            </div>
            <p className="max-w-xs text-base text-gray-600">
              A modern platform for sharing knowledge and connecting with writers worldwide.
            </p>
          </div>

          {/* 2. Navigation Link Columns */}
          {footerColumns.map((column, index) => (
            <div key={index} className="col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-base text-gray-600 transition duration-150 hover:text-indigo-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator Line */}
        <div className="my-10 border-t border-gray-200"></div>

        {/* Bottom Section: Copyright and Social Icons */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          
          {/* Copyright */}
          <p className="text-gray-500">
            &copy; 2025 BlogNest. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-5 text-gray-500">
            <a href="#" aria-label="Twitter" className="hover:text-indigo-600 transition duration-150">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600 transition duration-150">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-indigo-600 transition duration-150">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Email" className="hover:text-indigo-600 transition duration-150">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;