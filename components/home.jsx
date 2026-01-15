"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  Heart, 
  Users, 
  BarChart3, 
  CheckCircle, 
  X, 
  FileText, 
  CreditCard, 
  Globe 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Add this import

export function RuditHomepage() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo - Update with your actual image */}
            <div className="h-10 w-32  flex items-center justify-center">
              <img src="images/rudit-logo.png" className="h-20 w-auto"/>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-cyan-400 transition">Features</a>
            <a href="#benefits" className="text-sm hover:text-cyan-400 transition">Benefits</a>
            <Link href="/sign-up" className="text-sm hover:text-cyan-400 transition">Get Started</Link>
          </div>
          <Link 
            href="/app/auth/sign-up"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold text-sm transition transform hover:scale-105"
          >
            Sign Up Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Gradient orbs background */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-96 left-0 w-80 h-80 bg-gradient-radial from-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-slate-800 border border-cyan-500/30">
              <p className="text-sm text-cyan-400 font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Launching Soon
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Launch Your School's Complete System in{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                10 Minutes
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Rudit gives Nigerian schools everything: professional websites, online fee collection, 
              digital results, automated attendance - all set up instantly. No technical skills needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/signup"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-lg transition transform hover:scale-105 shadow-lg text-center"
              >
                Start Free Trial - Get 1 Academic Term Free
              </Link>
              <button className="px-8 py-4 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 transition font-semibold flex items-center justify-center gap-2">
                Watch Demo <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span>10-minute setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span>First 10 schools get 50% off</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-16 mt-16 pt-16 border-t border-slate-700">
              <div>
                <p className="text-3xl font-bold text-cyan-400">10min</p>
                <p className="text-slate-400 text-sm mt-2">Setup Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">1 Term</p>
                <p className="text-slate-400 text-sm mt-2">Free Trial</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">50%</p>
                <p className="text-slate-400 text-sm mt-2">OFF Early Bird</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Is Your School Still Doing This?
            </h2>
            <p className="text-xl text-slate-400">
              You're not alone. Most Nigerian schools struggle with outdated manual processes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-12 h-12" />,
                title: "Manual Processes",
                description: "Spreadsheets for student records. Paper-based attendance. Hours spent on data entry every week."
              },
              {
                icon: <CreditCard className="w-12 h-12" />,
                title: "Payment Chaos",
                description: "Chasing parents for school fees. Manual receipts. No clear records of who's paid and who hasn't."
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "No Online Presence",
                description: "Parents can't find you on Google. You look outdated compared to competitors. Losing students."
              }
            ].map((problem, idx) => (
              <div key={idx} className="bg-slate-900 p-8 rounded-2xl border-2 border-red-500/20 hover:border-red-500/40 transition group">
                <div className="text-red-400 mb-4 group-hover:scale-110 transition-transform">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                <p className="text-slate-400 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything Your School Needs in One Platform
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Stop juggling multiple tools. Rudit brings everything together in one simple system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Professional School Website",
                description: "Beautiful templates. Your logo and colors. Live in minutes. Mobile-friendly and modern."
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Online Fee Collection",
                description: "Parents pay with cards or bank transfer. Instant verification. Automatic receipts."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Digital Results Portal",
                description: "Publish results online. Parents check anytime. No more printing or queues."
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Automated Attendance",
                description: "Digital attendance tracking. Generate reports instantly. SMS alerts to parents."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Parent Portal",
                description: "Parents see fees, results, attendance in one place. Better engagement."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure & Reliable",
                description: "Bank-level encryption. Daily backups. You own your data, always."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 px-6 bg-gradient-to-br from-cyan-900/20 via-slate-800 to-teal-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold">Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join forward-thinking schools that are going digital. Get 1 academic term free trial.
          </p>

          <Link 
            href="/signup"
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-xl transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2 justify-center"
          >
            Start Free Trial Now
            <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-sm text-slate-400 mt-6">
            No credit card required â¢ Cancel anytime â¢ 10-minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="h-12 w-40 bg-gradient-to-r from-cyan-500 to-teal-500 rounded flex items-center justify-center mb-4">
              <span className="font-bold text-xl">RUDIT</span>
            </div>
            
            <p className="text-slate-400">Smart School Management for Nigeria</p>
            <div className="mt-4 text-slate-400 flex flex-col justify-center items-center">
              <p className="font-semibold text-white">ruditnigeria@gmail.com</p>
              <p className="font-semibold text-white">+234 907 339 1780</p>
              <p className="mt-2">Rivers, Nigeria</p>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>© 2026 Rudit. All rights reserved. Built with <Heart className="inline w-4 h-4 text-red-500" /> for Nigerian schools.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}