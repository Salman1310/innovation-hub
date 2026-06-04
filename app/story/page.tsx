'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Rocket, PartyPopper } from 'lucide-react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const PARALLAX_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Innovation team brainstorming POC ideas across 8 markets',
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'SLGS Innovation driving the portfolio from exploration to production',
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
    alt: 'Audio Analytics, E-KYC, CSR Automation — 12 POCs in production',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Real-time dashboards tracking POC pipeline from exploration to production',
  },
  {
    src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'SLGS Innovation — Gen AI, AI/ML, NLP, Blockchain, Computer Vision',
  },
];

const CULTURE_NOTES = [
  {
    icon: Lightbulb,
    title: 'Ideas Get Airtime',
    text: 'The team creates visible space for employees to pitch, prototype, and pressure-test ideas before they disappear into slide decks.',
  },
  {
    icon: Rocket,
    title: 'Outside Energy Matters',
    text: 'Startup demos, founder conversations, and expert sessions keep the portfolio connected to how innovation is moving in the real world.',
  },
  {
    icon: PartyPopper,
    title: 'Momentum Gets Celebrated',
    text: 'Innovation Month turns experimentation into a shared culture signal with recognition, challenge finales, and visible wins across teams.',
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
          border: '1px solid rgba(236,171,35,0.2)',
          color: '#002855',
        }}
      >
        Back to Hub
      </Link>

      <FlowArt aria-label="Story of SLGS Innovation">
        {/* Chapter 1 — Origin */}
        <FlowSection
          aria-label="The Beginning"
          style={{ backgroundColor: '#ECAB23', color: '#fff' }}
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
            In 2020, the SLGS Innovation team started with a simple question — what if we could
            move promising ideas from discussion to proof faster, with the right design discipline?
          </p>
        </FlowSection>

        {/* Chapter 2 — First POCs */}
        <FlowSection
          aria-label="First Proofs of Concept"
          style={{ backgroundColor: '#1F2A2E', color: '#fff' }}
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
            Our first proof-of-concepts explored AI/ML, computer vision, and conversational platforms
            — validating that innovation could deliver real enterprise value fast.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">E-KYC (Onfido)</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Electronic customer verification with automated identity document processing.
                Now live across Asia — faster onboarding, reduced manual checks.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Audio Analytics</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                AI-powered call analytics for advisor coaching and quality assurance.
                From idea to production in under 12 weeks — live in US Pinnacle Care.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Asset Tokenization</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Blockchain experiment with Vertalo — validating new business models
                for asset tokenization in the Canada market.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Chapter 3 — Scale */}
        <FlowSection
          aria-label="Scaling Up"
          style={{ backgroundColor: '#f8f9fc', color: '#1F2A2E' }}
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
            From that 2020 foundation, the team built its operating rhythm: discover the
            right problem, design a practical solution, prototype quickly, then scale what works.
          </p>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">51+ Total POCs</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Delivered across Gen AI, AI/ML, NLP, Computer Vision, Blockchain,
                and automation — spanning multiple tech streams.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">8 Markets</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS.
                Global reach from the start.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">13 Startup Partners</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Onfido, Denodo, Synthesia, Binah.Ai, Staple.Ai, Wiz.Ai, MootUp,
                and more — external innovation at scale.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none border-t border-black/15" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">CSR Automation</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Automates customer service request handling — 60% less manual work.
                Live in production across Canada operations.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Fastrack BI (Denodo)</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Data virtualization unifying siloed sources for real-time business intelligence
                across Asia markets.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Gen AI Interviewer</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                AI-powered interviewer for knowledge extraction — scaling into production
                for the Canada market.
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Chapter 4 — Impact */}
        <FlowSection
          aria-label="The Impact"
          style={{ backgroundColor: '#0E5665', color: '#fff' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The Impact</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(2.25rem,6.5vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-tight">
              Numbers
              <br />
              Don&apos;t
              <br />
              Lie.
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">51+ Total POCs</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Tracked across the full pipeline — from exploration to production. 12 live in production today.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">8 Markets</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Asia, Canada, US, Philippines, Singapore, HK, Indonesia, and SLGS. Global reach from day one.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">16 Gen AI POCs</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Gen AI is the single biggest tech stream — from document summarization to agentic workflows.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(0.9rem,1.8vw,1.35rem)] font-normal leading-relaxed">
            Every metric maps back to one thing — real problems solved for real teams.
          </p>
        </FlowSection>

        {/* Chapter 5 — Future */}
        <FlowSection
          aria-label="What's Next"
          style={{ backgroundColor: '#1F2A2E', color: '#fff' }}
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
            2026 and beyond — we&apos;re expanding into agentic AI, scaling Gen AI across all markets,
            and building the next generation of intelligent automation.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Agentic AI</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Autonomous AI agents handling end-to-end workflows — compliance audit preparation
                already in exploration.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Advisor Bots</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Gen AI chatbots for dealer ops and retail advisory — currently prototyping
                for the Canada market.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Financial Report Gen AI</p>
              <p className="text-[clamp(0.8rem,1.1vw,0.95rem)] leading-relaxed opacity-75">
                Automated financial report generation using Gen AI — scaling into production for SLGS.
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
      <div className="relative bg-[#1F2A2E]">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <p
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'rgba(236,171,35,0.2)',
                color: '#F8D56A',
                border: '1px solid rgba(236,171,35,0.3)',
              }}
            >
              The Innovation Portfolio
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              51+ POCs. 5 Markets. 40+ Partners.
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto text-sm">
              From Gen AI to Blockchain, from Asia to Canada — building what&apos;s next for Sun Life across every market and tech stream.
            </p>
          </div>
        </div>
        <ZoomParallax images={PARALLAX_IMAGES} />
        <section className="border-t border-white/10 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p
                className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{
                  background: 'rgba(236,171,35,0.2)',
                  color: '#F8D56A',
                  border: '1px solid rgba(236,171,35,0.3)',
                }}
              >
                The Culture Behind It
              </p>
              <h3
                className="mt-6 text-3xl font-bold text-white md:text-5xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Innovation here is not just a portfolio. It is a working culture.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                The team&apos;s operating rhythm is built around experimentation, external learning, and visible celebration of progress. That is what keeps ideas moving from curiosity to proof to real adoption.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {CULTURE_NOTES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-sm"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: 'rgba(255,205,0,0.14)' }}
                  >
                    <item.icon className="h-5 w-5 text-[#FFCD00]" />
                  </div>
                  <h4 className="mt-5 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/culture"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#002855] transition-all hover:scale-105"
                style={{
                  background: '#FFCD00',
                  boxShadow: '0 4px 24px rgba(255,205,0,0.25)',
                }}
              >
                Explore Innovation Culture
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        <div className="h-[30vh] flex items-center justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-full text-lg font-semibold text-[#002855] transition-all hover:scale-105"
            style={{
              background: '#FFCD00',
              boxShadow: '0 4px 24px rgba(255,205,0,0.4)',
            }}
          >
            Back to SLGS Innovation
          </Link>
        </div>
      </div>
    </>
  );
}
