'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Node } from '@tiptap/core'
import { Globe, Layout, Loader2, CheckCircle, X, Save, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// --- CUSTOM TIPTAP EXTENSION TO ALLOW INLINE STYLES ---
const GlobalStyleExtension = Node.create({
  name: 'div',
  group: 'block',
  content: 'block*',
  parseHTML() { return [{ tag: 'div' }] },
  renderHTML({ HTMLAttributes }) { return ['div', HTMLAttributes, 0] },
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => (attributes.style ? { style: attributes.style } : {}),
      },
    }
  },
})

// Add these to your TEMPLATES array in the website builder

const TEMPLATES = [
  // Template 1: Elite Modern
  {
    id: 'elite-modern',
    name: 'Elite Modern',
    preview: 'Premium design with gradient hero',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <!-- Hero Section -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); text-align: center; position: relative; overflow: hidden;">
          <div style="position: relative; z-index: 10;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 12px 30px; border-radius: 50px; margin-bottom: clamp(20px, 4vw, 30px); font-weight: 600; font-size: clamp(12px, 2vw, 14px); letter-spacing: 1px;">
              🎓 RANKED #1 IN ACADEMIC EXCELLENCE
            </div>
            <h1 style="font-size: clamp(32px, 8vw, 64px); font-weight: 900; margin: 0 0 clamp(20px, 4vw, 30px) 0; line-height: 1.1; letter-spacing: -2px;">
              Shaping Tomorrow's<br/>Leaders Today
            </h1>
            <p style="font-size: clamp(16px, 3vw, 22px); margin: 0 auto clamp(30px, 6vw, 50px); max-width: 700px; opacity: 0.95; line-height: 1.6;">
              Join a community where excellence meets innovation. Our world-class education prepares students for success in an ever-changing world.
            </p>
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
              <a href="#apply" style="background: white; color: #667eea; padding: clamp(12px, 3vw, 18px) clamp(25px, 6vw, 45px); border-radius: 50px; text-decoration: none; font-weight: 700; font-size: clamp(14px, 2.5vw, 18px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); transition: transform 0.3s;">
                Apply Now
              </a>
              <a href="#tour" style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); color: white; padding: clamp(12px, 3vw, 18px) clamp(25px, 6vw, 45px); border-radius: 50px; text-decoration: none; font-weight: 700; font-size: clamp(14px, 2.5vw, 18px); border: 2px solid rgba(255,255,255,0.3);">
                Schedule Tour
              </a>
            </div>
          </div>
          
          <!-- Stats Bar -->
          <div style="margin-top: clamp(40px, 8vw, 80px); display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: clamp(20px, 4vw, 40px); max-width: 1000px; margin-left: auto; margin-right: auto;">
            <div style="text-align: center;">
              <div style="font-size: clamp(32px, 6vw, 48px); font-weight: 900; margin-bottom: 8px;">98%</div>
              <div style="font-size: 14px; opacity: 0.9;">University Acceptance</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: clamp(32px, 6vw, 48px); font-weight: 900; margin-bottom: 8px;">50+</div>
              <div style="font-size: 14px; opacity: 0.9;">Expert Teachers</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: clamp(32px, 6vw, 48px); font-weight: 900; margin-bottom: 8px;">1200+</div>
              <div style="font-size: 14px; opacity: 0.9;">Active Students</div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); background: #f8fafc;">
          <div style="text-align: center; margin-bottom: clamp(40px, 8vw, 80px);">
            <h2 style="font-size: clamp(28px, 6vw, 48px); font-weight: 900; color: #1e293b; margin: 0 0 20px 0; letter-spacing: -1px;">
              Why Choose Us?
            </h2>
            <p style="font-size: clamp(16px, 3vw, 20px); color: #64748b; max-width: 700px; margin: 0 auto;">
              Excellence in every aspect of education
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: clamp(20px, 4vw, 40px); max-width: 1200px; margin: 0 auto;">
            <div style="background: white; padding: clamp(30px, 6vw, 50px) clamp(20px, 4vw, 40px); border-radius: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); text-align: center;">
              <div style="width: clamp(60px, 12vw, 80px); height: clamp(60px, 12vw, 80px); background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 20px; margin: 0 auto clamp(20px, 4vw, 30px); display: flex; align-items: center; justify-content: center; font-size: clamp(24px, 5vw, 36px);">
                📚
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #1e293b; margin: 0 0 15px 0;">
                Academic Excellence
              </h3>
              <p style="font-size: 14px; color: #64748b; line-height: 1.7; margin: 0;">
                Rigorous curriculum designed to challenge and inspire students to reach their full potential.
              </p>
            </div>

            <div style="background: white; padding: clamp(30px, 6vw, 50px) clamp(20px, 4vw, 40px); border-radius: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); text-align: center;">
              <div style="width: clamp(60px, 12vw, 80px); height: clamp(60px, 12vw, 80px); background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 20px; margin: 0 auto clamp(20px, 4vw, 30px); display: flex; align-items: center; justify-content: center; font-size: clamp(24px, 5vw, 36px);">
                👥
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #1e293b; margin: 0 0 15px 0;">
                Expert Faculty
              </h3>
              <p style="font-size: 14px; color: #64748b; line-height: 1.7; margin: 0;">
                Learn from passionate educators with advanced degrees and real-world experience.
              </p>
            </div>

            <div style="background: white; padding: clamp(30px, 6vw, 50px) clamp(20px, 4vw, 40px); border-radius: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); text-align: center;">
              <div style="width: clamp(60px, 12vw, 80px); height: clamp(60px, 12vw, 80px); background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 20px; margin: 0 auto clamp(20px, 4vw, 30px); display: flex; align-items: center; justify-content: center; font-size: clamp(24px, 5vw, 36px);">
                🌍
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #1e293b; margin: 0 0 15px 0;">
                Global Perspective
              </h3>
              <p style="font-size: 14px; color: #64748b; line-height: 1.7; margin: 0;">
                International programs and cultural exchanges prepare students for a connected world.
              </p>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); text-align: center;">
          <h2 style="font-size: clamp(28px, 6vw, 52px); font-weight: 900; margin: 0 0 25px 0; letter-spacing: -1px;">
            Ready to Join Our Community?
          </h2>
          <p style="font-size: clamp(16px, 3vw, 22px); margin: 0 0 clamp(30px, 6vw, 50px) 0; opacity: 0.9; max-width: 800px; margin-left: auto; margin-right: auto;">
            Applications for 2025-2026 are now open. Begin your journey with us today.
          </p>
          <a href="#apply" style="display: inline-block; background: white; color: #1e293b; padding: clamp(12px, 3vw, 20px) clamp(30px, 8vw, 60px); border-radius: 50px; text-decoration: none; font-weight: 800; font-size: clamp(14px, 3vw, 20px); box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
            Start Application →
          </a>
        </div>
      </div>
    `
  },

  // Template 2: Classic Prestige
  {
    id: 'classic-prestige',
    name: 'Classic Prestige',
    preview: 'Traditional elegant design',
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif;">
        <!-- Hero with Overlay -->
        <div style="background: linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.9)), url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22><rect fill=%22%23334155%22 width=%221200%22 height=%22800%22/></svg>'); background-size: cover; background-position: center; color: white; padding: clamp(40px, 10vw, 120px) clamp(20px, 4vw, 60px); text-align: center; border-bottom: 5px solid #c19a6b;">
          <div style="max-width: 900px; margin: 0 auto;">
            <div style="width: clamp(60px, 12vw, 100px); height: clamp(60px, 12vw, 100px); margin: 0 auto clamp(20px, 4vw, 30px); background: rgba(193, 154, 107, 0.2); border: 3px solid #c19a6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: clamp(24px, 5vw, 48px); font-weight: bold; letter-spacing: 2px;">
              EA
            </div>
            <h1 style="font-size: clamp(24px, 6vw, 58px); font-weight: 400; margin: 0 0 clamp(15px, 3vw, 25px) 0; letter-spacing: clamp(1px, 3px, 3px); line-height: 1.2;">
              EXCELLENCE ACADEMY
            </h1>
            <div style="width: clamp(60px, 12vw, 120px); height: 3px; background: #c19a6b; margin: 0 auto clamp(20px, 4vw, 30px);"></div>
            <p style="font-size: clamp(16px, 3vw, 24px); font-style: italic; margin: 0 0 15px 0; color: #c19a6b;">
              "Tradition. Excellence. Character."
            </p>
            <p style="font-size: clamp(14px, 2.5vw, 18px); margin: 0 0 clamp(30px, 6vw, 50px) 0; opacity: 0.9; line-height: 1.8;">
              Established 1985 • Preparing Leaders for Over Three Decades
            </p>
            <a href="#inquire" style="display: inline-block; background: transparent; color: white; padding: clamp(12px, 3vw, 18px) clamp(30px, 6vw, 50px); border: 2px solid #c19a6b; text-decoration: none; font-weight: 600; font-size: clamp(12px, 2vw, 16px); letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s;">
              Inquire Now
            </a>
          </div>
        </div>

        <!-- Mission Statement -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); background: white; text-align: center;">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #c19a6b; margin: 0 0 20px 0; font-weight: 600;">
              Our Mission
            </h2>
            <p style="font-size: clamp(20px, 4vw, 32px); line-height: 1.6; color: #1e293b; font-style: italic; margin: 0;">
              "To cultivate intellectual curiosity, moral integrity, and a lifelong commitment to excellence in our students."
            </p>
          </div>
        </div>

        <!-- Three Pillars -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); background: #f8f7f4;">
          <div style="text-align: center; margin-bottom: clamp(40px, 8vw, 80px);">
            <h2 style="font-size: clamp(24px, 5vw, 48px); font-weight: 400; color: #1e293b; margin: 0 0 15px 0; letter-spacing: 1px;">
              Our Three Pillars
            </h2>
            <div style="width: clamp(40px, 8vw, 80px); height: 3px; background: #c19a6b; margin: 0 auto;"></div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: clamp(30px, 6vw, 60px); max-width: 1100px; margin: 0 auto;">
            <div style="text-align: center;">
              <div style="width: clamp(60px, 12vw, 100px); height: clamp(60px, 12vw, 100px); margin: 0 auto clamp(20px, 4vw, 30px); background: white; border: 2px solid #c19a6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <span style="font-size: clamp(24px, 5vw, 48px);">🎓</span>
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 28px); font-weight: 400; color: #1e293b; margin: 0 0 20px 0; letter-spacing: 1px;">
                Academic Rigor
              </h3>
              <p style="font-size: 14px; color: #475569; line-height: 1.8; margin: 0;">
                Our challenging curriculum combines classical education with modern innovation, preparing students for the finest universities worldwide.
              </p>
            </div>

            <div style="text-align: center;">
              <div style="width: clamp(60px, 12vw, 100px); height: clamp(60px, 12vw, 100px); margin: 0 auto clamp(20px, 4vw, 30px); background: white; border: 2px solid #c19a6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <span style="font-size: clamp(24px, 5vw, 48px);">⚖️</span>
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 28px); font-weight: 400; color: #1e293b; margin: 0 0 20px 0; letter-spacing: 1px;">
                Character Building
              </h3>
              <p style="font-size: 14px; color: #475569; line-height: 1.8; margin: 0;">
                We instill values of integrity, responsibility, and compassion, developing not just scholars but principled leaders.
              </p>
            </div>

            <div style="text-align: center;">
              <div style="width: clamp(60px, 12vw, 100px); height: clamp(60px, 12vw, 100px); margin: 0 auto clamp(20px, 4vw, 30px); background: white; border: 2px solid #c19a6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <span style="font-size: clamp(24px, 5vw, 48px);">🌟</span>
              </div>
              <h3 style="font-size: clamp(18px, 4vw, 28px); font-weight: 400; color: #1e293b; margin: 0 0 20px 0; letter-spacing: 1px;">
                Individual Growth
              </h3>
              <p style="font-size: 14px; color: #475569; line-height: 1.8; margin: 0;">
                Small class sizes ensure personalized attention, allowing each student to discover and develop their unique talents.
              </p>
            </div>
          </div>
        </div>

        <!-- Testimonial -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); background: #1e293b; color: white; text-align: center;">
          <div style="max-width: 900px; margin: 0 auto;">
            <div style="font-size: clamp(32px, 8vw, 64px); opacity: 0.3; margin-bottom: 20px;">"</div>
            <p style="font-size: clamp(16px, 4vw, 28px); line-height: 1.7; font-style: italic; margin: 0 0 clamp(20px, 5vw, 40px) 0;">
              Excellence Academy didn't just prepare me for university—it taught me how to think critically, lead with integrity, and make a difference in the world.
            </p>
            <div style="width: clamp(40px, 8vw, 60px); height: 2px; background: #c19a6b; margin: 0 auto clamp(15px, 3vw, 25px);"></div>
            <p style="font-size: clamp(14px, 2.5vw, 18px); font-weight: 600; margin: 0; letter-spacing: 1px;">
              Sarah Johnson, Class of 2020
            </p>
            <p style="font-size: 12px; opacity: 0.7; margin: 5px 0 0 0;">
              Harvard University '24
            </p>
          </div>
        </div>

        <!-- Final CTA -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 60px); background: white; text-align: center;">
          <h2 style="font-size: clamp(24px, 5vw, 42px); font-weight: 400; color: #1e293b; margin: 0 0 30px 0; letter-spacing: 1px;">
            Begin Your Journey
          </h2>
          <p style="font-size: 16px; color: #64748b; margin: 0 0 clamp(30px, 6vw, 50px) 0; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.7;">
            Discover how Excellence Academy can shape your child's future. Schedule a private tour or request our comprehensive prospectus.
          </p>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="#tour" style="display: inline-block; background: #1e293b; color: white; padding: clamp(12px, 3vw, 18px) clamp(25px, 6vw, 45px); text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
              Schedule Tour
            </a>
            <a href="#prospectus" style="display: inline-block; background: white; color: #1e293b; padding: clamp(12px, 3vw, 18px) clamp(25px, 6vw, 45px); border: 2px solid #1e293b; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">
              Get Prospectus
            </a>
          </div>
        </div>
      </div>
    `
  },

  // Template 3: Tech Forward
  {
    id: 'tech-forward',
    name: 'Tech Forward',
    preview: 'Modern STEM-focused design',
    html: `
      <div style="font-family: -apple-system, system-ui, sans-serif;">
        <!-- Animated Hero -->
        <div style="background: #0f172a; color: white; padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 40px); position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1)); opacity: 0.5;"></div>
          
          <div style="position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center;">
            <div>
              <div style="display: inline-block; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.3); padding: 8px 20px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: clamp(15px, 3vw, 25px); letter-spacing: 1px;">
                🚀 STEM EXCELLENCE CERTIFIED
              </div>
              <h1 style="font-size: clamp(32px, 8vw, 60px); font-weight: 900; margin: 0 0 clamp(15px, 3vw, 25px) 0; line-height: 1.1; background: linear-gradient(135deg, #3b82f6, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                Code the Future
              </h1>
              <p style="font-size: clamp(14px, 3vw, 20px); margin: 0 0 clamp(25px, 5vw, 40px) 0; color: #94a3b8; line-height: 1.7;">
                Where innovation meets education. Specialized programs in AI, Robotics, Data Science, and Sustainable Engineering.
              </p>
              <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <a href="#programs" style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: clamp(12px, 3vw, 16px) clamp(25px, 5vw, 40px); border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);">
                  Explore Programs
                </a>
                <a href="#demo" style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); color: white; padding: clamp(12px, 3vw, 16px) clamp(25px, 5vw, 40px); border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px; border: 1px solid rgba(255, 255, 255, 0.1);">
                  Watch Demo
                </a>
              </div>

              <!-- Tech Stats -->
              <div style="margin-top: clamp(30px, 6vw, 60px); display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(15px, 3vw, 30px);">
                <div>
                  <div style="font-size: clamp(24px, 5vw, 36px); font-weight: 900; color: #3b82f6; margin-bottom: 5px;">100+</div>
                  <div style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Projects Built</div>
                </div>
                <div>
                  <div style="font-size: clamp(24px, 5vw, 36px); font-weight: 900; color: #a855f7; margin-bottom: 5px;">15</div>
                  <div style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Tech Labs</div>
                </div>
                <div>
                  <div style="font-size: clamp(24px, 5vw, 36px); font-weight: 900; color: #10b981; margin-bottom: 5px;">24/7</div>
                  <div style="font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Lab Access</div>
                </div>
              </div>
            </div>

            <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 20px; padding: clamp(20px, 4vw, 40px); backdrop-filter: blur(10px);">
              <div style="background: linear-gradient(135deg, #1e293b, #334155); border-radius: 15px; padding: clamp(20px, 4vw, 30px); margin-bottom: 15px;">
                <div style="color: #3b82f6; font-size: 12px; font-weight: 600; margin-bottom: 10px; letter-spacing: 1px;">// STUDENT SPOTLIGHT</div>
                <div style="font-family: 'Courier New', monospace; color: #94a3b8; font-size: 14px; line-height: 1.6;">
                  <div><span style="color: #a855f7;">const</span> achievement = {</div>
                  <div style="margin-left: 15px;">name: <span style="color: #10b981;">"AI Chess Bot"</span>,</div>
                  <div style="margin-left: 15px;">creator: <span style="color: #10b981;">"Grade 10 Team"</span>,</div>
                  <div style="margin-left: 15px;">achievement: <span style="color: #10b981;">"National Winner"</span></div>
                  <div>}</div>
                </div>
              </div>
              <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.6;">
                Our students don't just learn technology—they create it. From award-winning apps to innovative hardware projects, they're building tomorrow's solutions today.
              </p>
            </div>
          </div>
        </div>

        <!-- Programs Grid -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 40px); background: white;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: clamp(40px, 8vw, 70px);">
              <h2 style="font-size: clamp(28px, 6vw, 48px); font-weight: 900; color: #0f172a; margin: 0 0 20px 0;">
                Future-Ready Programs
              </h2>
              <p style="font-size: clamp(16px, 3vw, 20px); color: #64748b;">
                Cutting-edge curriculum designed by industry experts
              </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: clamp(15px, 3vw, 25px);">
              <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px solid #3b82f6; border-radius: 20px; padding: clamp(25px, 5vw, 40px); position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; background: rgba(59, 130, 246, 0.1); border-radius: 50%;"></div>
                <div style="font-size: clamp(32px, 6vw, 42px); margin-bottom: 15px; position: relative;">🤖</div>
                <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #1e40af; margin: 0 0 10px 0;">
                  AI & Machine Learning
                </h3>
                <p style="font-size: 14px; color: #1e40af; line-height: 1.6; margin: 0;">
                  Build neural networks, train models, and create intelligent systems from scratch.
                </p>
              </div>

              <div style="background: linear-gradient(135deg, #faf5ff, #f3e8ff); border: 2px solid #a855f7; border-radius: 20px; padding: clamp(25px, 5vw, 40px); position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; background: rgba(168, 85, 247, 0.1); border-radius: 50%;"></div>
                <div style="font-size: clamp(32px, 6vw, 42px); margin-bottom: 15px; position: relative;">⚡</div>
                <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #7e22ce; margin: 0 0 10px 0;">
                  Robotics Engineering
                </h3>
                <p style="font-size: 14px; color: #7e22ce; line-height: 1.6; margin: 0;">
                  Design, build, and program robots for real-world applications and competitions.
                </p>
              </div>

              <div style="background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 2px solid #10b981; border-radius: 20px; padding: clamp(25px, 5vw, 40px); position: relative; overflow: hidden;">
                <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; background: rgba(16, 185, 129, 0.1); border-radius: 50%;"></div>
                <div style="font-size: clamp(32px, 6vw, 42px); margin-bottom: 15px; position: relative;">🌱</div>
                <h3 style="font-size: clamp(18px, 4vw, 24px); font-weight: 800; color: #047857; margin: 0 0 10px 0;">
                  Sustainable Tech
                </h3>
                <p style="font-size: 14px; color: #047857; line-height: 1.6; margin: 0;">
                  Develop green technologies and solutions for environmental challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Industry Partners -->
        <div style="padding: clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px); background: #f8fafc; text-align: center;">
          <div style="max-width: 1000px; margin: 0 auto;">
            <h3 style="font-size: 14px; font-weight: 700; color: #64748b; margin: 0 0 clamp(25px, 5vw, 40px) 0; letter-spacing: 2px; text-transform: uppercase;">
              Powered By Industry Leaders
            </h3>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(25px, 5vw, 50px); align-items: center;">
              <div style="font-size: clamp(18px, 4vw, 28px); font-weight: 900; color: #cbd5e1;">Google</div>
              <div style="font-size: clamp(18px, 4vw, 28px); font-weight: 900; color: #cbd5e1;">Microsoft</div>
              <div style="font-size: clamp(18px, 4vw, 28px); font-weight: 900; color: #cbd5e1;">Tesla</div>
              <div style="font-size: clamp(18px, 4vw, 28px); font-weight: 900; color: #cbd5e1;">MIT</div>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div style="padding: clamp(40px, 8vw, 100px) clamp(20px, 4vw, 40px); background: linear-gradient(135deg, #0f172a, #1e293b); color: white; text-align: center;">
          <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-size: clamp(28px, 6vw, 42px); font-weight: 900; margin: 0 0 20px 0;">Ready to Build the Future?</h2>
            <p style="font-size: clamp(14px, 3vw, 18px); margin: 0 0 30px 0; opacity: 0.9;">Apply now for the 2025-2026 school year</p>
            <a href="#apply" style="display: inline-block; background: #3b82f6; color: white; padding: clamp(12px, 3vw, 16px) clamp(25px, 6vw, 40px); border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Apply Now →</a>
          </div>
        </div>
      </div>
    `
  },
]

export default function WebsiteBuilder() {
  const [mounted, setMounted] = useState(false)
  const [school, setSchool] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [published, setPublished] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { HTMLAttributes: { style: '' } } }),
      GlobalStyleExtension, // Load our custom "div with styles" extension
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor focus:outline-none min-h-[600px] p-4 md:p-10 bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-700 shadow-2xl rounded-3xl',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    setMounted(true)
    fetchData()
  }, [editor])

  async function fetchData() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('school_id, schools(*)')
      .eq('id', user.id)
      .single()

    if (profile?.schools) {
      const s = profile.schools as any
      setSchool(s)
      setPublished(s.is_published)
      if (editor && s.html_content) {
        editor.commands.setContent(s.html_content)
      } else {
        setShowLibrary(true)
      }
    }
  }

  async function handlePublish() {
    if (!editor || !school) return
    setIsSaving(true)
    const { error } = await supabase
      .from('schools')
      .update({ html_content: editor.getHTML(), is_published: true })
      .eq('id', school.id)

    setIsSaving(false)
    if (!error) {
      setPublished(true)
      alert("Published! congrats your site is live.")
      router.refresh()
    }
  }

  function handleBack() {
    router.push('/protected/dashboard')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 p-4 md:p-8 font-sans">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-10">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl md:rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm transition-all"
          >
            <ArrowLeft size={18} className="text-gray-900 dark:text-gray-100" />
            <span className="hidden md:inline text-gray-900 dark:text-gray-100">
              Back to Dashboard
            </span>
          </button>
          <div>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Website Builder
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm md:text-base font-medium italic">
              Powered by Rudit
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowLibrary(true)} 
            className="flex items-center gap-2 px-4 md:px-6 py-2 bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-xl md:rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm transition-all flex-1 md:flex-none justify-center"
          >
            <Layout size={18} className="text-gray-900 dark:text-gray-100" />
            <span className="hidden md:inline text-gray-900 dark:text-gray-100">
              Templates
            </span>
            <span className="md:hidden text-gray-900 dark:text-gray-100">
              Templates
            </span>
          </button>
          <button 
            onClick={handlePublish} 
            disabled={isSaving} 
            className="flex items-center gap-2 px-4 md:px-8 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-black rounded-xl md:rounded-2xl shadow-xl disabled:opacity-50 transition-all flex-1 md:flex-none justify-center"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Globe size={18} />
            )}
            <span className="hidden md:inline">
              {published ? "Update Site" : "Go Live"}
            </span>
            <span className="md:hidden">
              {published ? "Update" : "Publish"}
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="bg-slate-200/40 dark:bg-gray-800/40 p-2 md:p-4 rounded-2xl md:rounded-[2.5rem] border-4 border-dashed border-slate-300 dark:border-gray-700">
          <EditorContent editor={editor} />
        </div>

        {showLibrary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 dark:bg-gray-950/90 backdrop-blur-md p-2 md:p-6">
            <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl max-h-[100vh] flex flex-col border border-gray-200 dark:border-gray-800">
              <div className="p-4 md:p-8 border-b dark:border-gray-800 flex justify-between items-center bg-slate-50 dark:bg-gray-800">
                <h2 className="text-lg md:text-3xl font-black text-gray-900 dark:text-white">
                  Choose a Template
                </h2>
                <X 
                  className="cursor-pointer hover:rotate-90 transition-transform text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" 
                  onClick={() => setShowLibrary(false)} 
                  size={24}
                />
              </div>
              <div className="p-4 md:h-full md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 overflow-y-auto flex-1">
                {TEMPLATES.map(t => (
                  <div 
                    key={t.id} 
                    onClick={() => { 
                      editor?.commands.setContent(t.html); 
                      setShowLibrary(false); 
                    }} 
                    className="group md:h-full cursor-pointer border-4 border-slate-100 dark:border-gray-800 rounded-xl md:rounded-3xl overflow-hidden hover:border-cyan-500 dark:hover:border-cyan-400 transition-all bg-slate-50 dark:bg-gray-800"
                  >
                    <div className="h-32 md:h-[50%] overflow-hidden relative">
                      <div className="scale-[0.3] md:scale-[0.35] origin-top-left w-[280%]" dangerouslySetInnerHTML={{ __html: t.html }} />
                      <div className="absolute inset-0 bg-transparent group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-400/10 transition-colors" />
                    </div>
                    <div className="p-4 md:p-6 bg-white dark:bg-gray-900">
                      <h3 className="font-black text-base md:text-xl text-gray-900 dark:text-white">
                        {t.name}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 mt-1">
                        {t.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}