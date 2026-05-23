import React from 'react';
import {
  ArrowRight,
  Check,
  Download,
  FileTerminal,
  LockKeyhole,
  MonitorDown,
  Play,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap
} from 'lucide-react';

const gumroadUrl = import.meta.env.VITE_GUMROAD_URL || 'https://gumroad.com/l/openclaw-setup';

const features = [
  {
    icon: MonitorDown,
    title: 'Mac-native setup',
    body: 'A double-click app wraps the OpenClaw install flow in a calm interface built for macOS.'
  },
  {
    icon: TerminalSquare,
    title: 'Terminal work handled',
    body: 'Dependency checks, setup commands, and script output are managed from one guided tool.'
  },
  {
    icon: ShieldCheck,
    title: 'Visible progress',
    body: 'Install output stays readable, so users can see what happened and recover faster if anything fails.'
  }
];

const steps = ['Download the installer', 'Open the macOS app', 'Click Run Setup', 'Follow the final onboarding notes'];

function GumroadButton({ children, variant = 'primary' }) {
  return (
    <a className={`button ${variant}`} href={gumroadUrl} data-gumroad-single-product>
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

function App() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="OpenClaw Mac Setup home">
            <span className="brand-mark">OC</span>
            <span>OpenClaw Mac Setup</span>
          </a>
          <div className="nav-actions">
            <a href="#how-it-works">How it works</a>
            <a href="#included">Included</a>
            <GumroadButton variant="nav">Buy</GumroadButton>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              One-click OpenClaw setup for macOS
            </p>
            <h1>OpenClaw Mac Setup</h1>
            <p className="lede">
              A polished installer app for people who want OpenClaw running without copy-pasting shell commands,
              hunting down dependencies, or guessing what went wrong.
            </p>
            <div className="hero-actions">
              <GumroadButton>Buy on Gumroad</GumroadButton>
              <a className="button secondary" href="#included">
                <Play size={18} aria-hidden="true" />
                See what it does
              </a>
            </div>
            <div className="trust-row" aria-label="Highlights">
              <span>
                <Check size={16} aria-hidden="true" />
                macOS focused
              </span>
              <span>
                <Check size={16} aria-hidden="true" />
                Guided output
              </span>
              <span>
                <Check size={16} aria-hidden="true" />
                No manual script digging
              </span>
            </div>
          </div>

          <div className="product-visual" aria-label="Preview of the OpenClaw setup app">
            <div className="window">
              <div className="window-bar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="window-body">
                <div className="setup-header">
                  <div className="app-icon">
                    <Download size={28} aria-hidden="true" />
                  </div>
                  <div>
                    <p>OpenClaw Setup</p>
                    <strong>Ready to install</strong>
                  </div>
                </div>
                <button className="run-button" type="button">
                  <Zap size={18} aria-hidden="true" />
                  Run Setup
                </button>
                <div className="terminal">
                  <div>$ checking macOS environment</div>
                  <div>$ installing required packages</div>
                  <div>$ preparing OpenClaw workspace</div>
                  <div className="success">setup completed successfully</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section feature-band" id="included">
        <div className="section-heading">
          <p className="eyebrow">
            <FileTerminal size={16} aria-hidden="true" />
            What the tool does
          </p>
          <h2>Turns setup into a simple app workflow.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <feature.icon size={24} aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="how-it-works">
        <div>
          <p className="eyebrow">
            <LockKeyhole size={16} aria-hidden="true" />
            Purchase flow
          </p>
          <h2>Buy once on Gumroad, download, and run the installer.</h2>
          <p>
            The page sends customers directly into Gumroad checkout, then the installer handles the OpenClaw setup
            experience locally on their Mac.
          </p>
          <GumroadButton>Get the installer</GumroadButton>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default App;
