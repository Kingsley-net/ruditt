import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mfhzlokchyvfkxwkfmkl.supabase.co',
        port: '',
       pathname: '/storage/v1/object/public/avatars/**',
     },
     {
      protocol: 'https',
      hostname: 'mfhzlokchyvfkxwkfmkl.supabase.co',
      port: '',
     pathname: '/storage/v1/object/public/school_logos/**',
   },
   ],
 }, 
};

export default nextConfig;
