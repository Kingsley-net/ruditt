"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Heart,
  Users,
  BarChart3,
  CheckCircle,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

/* -------------------- THEME -------------------- */
function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else if (systemDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { theme, toggleTheme };
}

export default function RuditHomepage() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0B1220] dark:text-white transition-colors">

      {/* -------------------- NAVBAR -------------------- */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-[#0B1220]/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" className="h-8 w-auto" alt="Rudit Logo" />
                <span className="text-cyan-500 font-bold text-lg">Rudit</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#platform" className="hover:text-cyan-500 transition-colors">Platform</a>
              <a href="#how" className="hover:text-cyan-500 transition-colors">How it works</a>
              <a href="#security" className="hover:text-cyan-500 transition-colors">Security</a>
            </div>

            <div className="flex items-center gap-2">
               <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Start Free
                </Link>
              </div>

              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(true)} className="p-2">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* -------------------- MOBILE MENU -------------------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#0B1220] p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-5 right-5 text-slate-500 dark:text-slate-400">
              <X className="w-6 h-6" />
            </button>
            
            <nav className="flex flex-col gap-6 mt-10 text-lg font-medium">
              <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-500 transition-colors">Platform</a>
              <a href="#how" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-500 transition-colors">How it works</a>
              <a href="#security" onClick={() => setMobileMenuOpen(false)} className="hover:text-cyan-500 transition-colors">Security</a>
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-4 py-3 rounded-md text-base font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center px-4 py-3 rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- HERO -------------------- */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border
                            border-cyan-500/30 bg-slate-100 dark:bg-slate-800 mb-6">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                Infrastructure for Modern Schools
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Run Your Entire School on{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                One Platform
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-8">
              Rudit powers websites, payments, results, attendance, and parent engagement
              for schools across Nigeria — all in one secure system.
            </p>

            <div className="flex gap-4">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500
                           text-white font-bold"
              >
                Launch Your School
              </Link>

              <button className="px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-700">
                View Demo
              </button>
            </div>
          </div>

          {/* Preview grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              "Admin Dashboard",
              "Online Payments",
              "Results Portal",
              "Attendance",
              "Parent Access",
              "School Website",
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-100 dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700"
              >
                <CheckCircle className="w-4 h-4 text-cyan-500 mb-2" />
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- METRICS -------------------- */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="text-3xl font-bold text-cyan-500">10 mins</p><p className="text-sm text-slate-500">Setup time</p></div>
          <div><p className="text-3xl font-bold text-cyan-500">100%</p><p className="text-sm text-slate-500">Digital operations</p></div>
          <div><p className="text-3xl font-bold text-cyan-500">24/7</p><p className="text-sm text-slate-500">Availability</p></div>
          <div><p className="text-3xl font-bold text-cyan-500">1 Term</p><p className="text-sm text-slate-500">Free trial</p></div>
        </div>
      </section>

      {/* -------------------- PLATFORM -------------------- */}
      <section id="platform" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            A Complete School Platform
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Globe, title: "School Websites" },
              { icon: CreditCard, title: "Fee Collection" },
              { icon: BarChart3, title: "Results & Analytics" },
              { icon: Clock, title: "Attendance Tracking" },
              { icon: Users, title: "Parent & Student Portals" },
              { icon: Shield, title: "Secure Infrastructure" },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800
                           border border-slate-200 dark:border-slate-700"
              >
                <f.icon className="w-8 h-8 text-cyan-500 mb-4" />
                <h3 className="font-semibold text-xl">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Fully integrated, reliable, and built for long-term use.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- HOW IT WORKS -------------------- */}
      <section id="how" className="py-24 px-6 bg-slate-50 dark:bg-[#0E1628]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How Rudit Works</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              ["01", "Create Your School", "Enter your details. Rudit generates your full system automatically."],
              ["02", "Configure Operations", "Set classes, fees, staff, and academics in minutes."],
              ["03", "Go Live", "Parents, students, and teachers access the platform instantly."],
            ].map(([step, title, desc]) => (
              <div key={step}>
                <p className="text-cyan-500 font-bold">{step}</p>
                <h3 className="text-xl font-semibold mt-2 mb-3">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- SECURITY -------------------- */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Shield className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">
            Built for Reliability and Trust
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Encrypted data, daily backups, and full ownership — your school data
            remains safe and accessible at all times.
          </p>
        </div>
      </section>

      {/* -------------------- ROADMAP -------------------- */}
      <section className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Built to Scale</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div><h3 className="font-semibold mb-2">Today</h3><p className="text-slate-400">Core school operations</p></div>
            <div><h3 className="font-semibold mb-2">Next</h3><p className="text-slate-400">CBT exams & analytics</p></div>
            <div><h3 className="font-semibold mb-2">Future</h3><p className="text-slate-400">AI tutors & adaptive learning</p></div>
          </div>
        </div>
      </section>

      {/* -------------------- CTA -------------------- */}
      <section id="cta" className="py-24 px-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Digital School Today
          </h2>
          <p className="text-xl mb-8">
            No credit card required. Free for one academic term.
          </p>

          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl
                       bg-white text-slate-900 font-bold text-xl"
          >
            Get Started
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 text-center">
        <p className="font-semibold">Rudit</p>
        <p className="text-slate-500">Smart School Infrastructure for Africa</p>
        <p className="mt-4 text-slate-500">
          © {new Date().getFullYear()} Rudit. Built with{" "}
          <Heart className="inline w-4 h-4 text-red-500" /> in Nigeria.
        </p>
      </footer>
    </div>
  );
}
