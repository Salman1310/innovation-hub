'use client';

import React from 'react';
import Link from 'next/link';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const PARALLAX_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'IH team brainstorming POC ideas across 8 markets',
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Sachin, Prashant, Shelza, Karthik, and Chandan driving the Innovation Hub portfolio',
  },
  {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Gen AI & Agentic AI — powering next-gen POCs',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Cross-market collaboration — Asia, Canada, US, Philippines, Singapore',
  },
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Audio Analytics, E-KYC, CSR Automation — 11 POCs in production',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Real-time dashboards tracking POC pipeline from exploration to production',
  },
  {
    src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Innovation Hub — 8+ tech streams including AI/ML, NLP, Blockchain, Computer Vision',
  },
];

export default function StoryPage() {

  return (
    <>
      {/* Back nav */}
      <Link
        href="/"
        className="fixed top-6 left-8 z-50 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(108,92,231,0.2)',
          color: '#6c5ce7',
        }}
      >
        Back to Hub
      </Link>

      <FlowArt aria-label="Story of Innovation Hub">
        {/* Chapter 1 — Origin */}
        <FlowSection
          aria-label="The Beginning"
          style={{ backgroundColor: '#6c5ce7', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — The Beginning</p>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <div>
            <h1 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              It
              <br />
              Started
              <br />
              Here.
            </h1>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/30" />
          <p className="mt-auto max-w-[50ch] text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            In 2020, the Innovation Hub team started with a simple question — what if we could
            move promising ideas from discussion to proof faster, with the right leadership and design discipline?
          </p>
        </FlowSection>

        {/* Chapter 2 — First POCs */}
        <FlowSection
          aria-label="First Proofs of Concept"
          style={{ backgroundColor: '#1a1a2e', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — First Sparks</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              From
              <br />
              Zero
              <br />
              To POC
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            Our first three proof-of-concepts shipped in under 8 weeks. AI-powered document
            classification, automated field reporting, and a real-time safety dashboard.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Doc Classifier</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                ML model that auto-categorises 50+ document types with 97% accuracy. Saved 200+
                hours/month for operations teams.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Field Reporter</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Mobile-first app for field engineers to submit structured reports with photo AI
                analysis. Cut reporting time by 60%.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Safety Dashboard</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Live incident tracking across 120+ construction sites. Reduced response time from
                hours to minutes.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Chapter 3 — Scale */}
        <FlowSection
          aria-label="Scaling Up"
          style={{ backgroundColor: '#f8f9fc', color: '#1a1a2e' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — Scaling Up</p>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <div>
            <h2 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Build.
              <br />
              Ship.
              <br />
              Repeat.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <p className="max-w-[50ch] text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            From that 2020 foundation, the team kept building its operating rhythm: discover the
            right problem, design a practical solution path, prototype quickly, then scale what works.
          </p>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">28 POCs</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Delivered across AI/ML, data engineering, process automation, and customer-facing
                tools.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">8 Business Units</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                From logistics to R&D, every major division now has at least one Innovation Hub
                solution in production.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">$1.8M Saved</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Measurable cost savings from automation, process optimisation, and reduced manual
                work.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">LLM Pipeline</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Internal GPT-powered assistant for technical documentation search and Q&A.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Data Mesh</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Decentralised data platform connecting siloed datasets across departments.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Vision API</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Computer vision for quality inspection on manufacturing lines. 99.2% defect
                detection.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Chapter 4 — Impact */}
        <FlowSection
          aria-label="The Impact"
          style={{ backgroundColor: '#00cec9', color: '#1a1a2e' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The Impact</p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div>
            <h2 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Numbers
              <br />
              Don&apos;t
              <br />
              Lie.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">78 POCs</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Tracked across the full pipeline — from exploration to production. 11 live in production today.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">8 Markets</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS. Global reach from day one.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">8+ Tech Streams</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Gen AI, AI/ML, NLP, Computer Vision, Blockchain, Agentic AI, Python, Java — and growing.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            Every metric maps back to one thing — real problems solved for real teams.
          </p>
        </FlowSection>

        {/* Chapter 5 — Future */}
        <FlowSection
          aria-label="What's Next"
          style={{ backgroundColor: '#1a1a2e', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">05 — What&apos;s Next</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              The
              <br />
              Best
              <br />
              Is
              <br />
              Ahead.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            2026 and beyond — we&apos;re expanding into agentic AI, edge computing for field ops,
            and building the next generation of internal tools.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Agentic AI</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Autonomous AI agents that handle end-to-end workflows without human intervention.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Edge Computing</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                On-device ML for field operations — works offline, syncs when connected.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Open Innovation</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Opening our platform for cross-company collaboration and external partnerships.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="mt-auto max-w-[50ch] text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            Got an idea? We build what doesn&apos;t exist yet. Let&apos;s make it happen.
          </p>
        </FlowSection>
      </FlowArt>

      {/* Zoom Parallax — POC Showcase */}
      <div className="relative bg-[#1a1a2e]">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <p
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'rgba(108,92,231,0.2)',
                color: '#a29bfe',
                border: '1px solid rgba(108,92,231,0.3)',
              }}
            >
              ✦ The Team Behind The Innovation
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              78 POCs. 8 Markets. One Team.
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto text-sm">
              Led by Sachin Mathur with solution design from Prashant Agarwal, and delivered with Shelza Jindal, Karthik Ramadurai, and Chandan Singh across Gen AI, Computer Vision, NLP, and beyond.
            </p>
          </div>
        </div>
        <ZoomParallax images={PARALLAX_IMAGES} />
        <div className="h-[30vh] flex items-center justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full text-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6c5ce7, #00cec9)',
              boxShadow: '0 4px 24px rgba(108,92,231,0.4)',
            }}
          >
            Back to Innovation Hub
          </Link>
        </div>
      </div>
    </>
  );
}
