
import './App.css'
import Dashboard from './Dashboard'
import { useState } from 'react'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  const exploreFeatures = () => {
    document.getElementById('features')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  if (showDashboard) {
    return <Dashboard />
  }

  const aboutPoints = [
    {
      icon: '🛡️',
      title: 'Prevent Knowledge Loss',
      description:
        'Preserve important project decisions, responsibilities, discussions and progress beyond individual employee transitions.'
    },
    {
      icon: '🧠',
      title: 'AI-Powered Knowledge Extraction',
      description:
        'Convert unstructured project information into meaningful insights, including tasks, decisions, risks and dependencies.'
    },
    {
      icon: '🔍',
      title: 'Evidence-Based Information',
      description:
        'Link extracted insights to their original source documents, making information easier to trace and verify.'
    },
    {
      icon: '👥',
      title: 'Human-Centred Validation',
      description:
        'Keep teams in control by allowing users to review, edit, verify and approve AI-generated knowledge before handover.'
    },
    {
      icon: '🔄',
      title: 'Seamless Project Continuity',
      description:
        'Help incoming team members understand project history, current status and pending responsibilities without depending entirely on outgoing employees.'
    }
  ]

  const features = [
    {
      icon: '📂',
      title: 'Source Upload',
      description:
        'Import project documents, meeting notes and activity records.'
    },
    {
      icon: '⚙️',
      title: 'Activity Extraction',
      description:
        'Extract structured project information from uploaded sources.'
    },
    {
      icon: '🤖',
      title: 'AI Knowledge Reconstruction',
      description:
        'Identify project decisions, tasks, responsibilities and current status.',
      featured: true
    },
    {
      icon: '🔗',
      title: 'Evidence-Linked Summaries',
      description:
        'Connect AI-generated information to its original source references.'
    },
    {
      icon: '📑',
      title: 'Automated Handover Generator',
      description:
        'Generate structured project handover reports automatically.'
    },
    {
      icon: '👥',
      title: 'Human Approval',
      description:
        'Allow users to review, edit, reject and approve generated reports.'
    },
    {
      icon: '🧠',
      title: 'Project Knowledge Graph',
      description:
        'Connect tasks, people, decisions and dependencies into a unified knowledge map.'
    }
  ]

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">K</span>
          <span>KnowBridge <b>AI</b></span>
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
        </div>

        <button
          className="login-btn"
          onClick={() => setShowDashboard(true)}
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <span className="tag">✦ INTELLIGENT KNOWLEDGE HANDOVER</span>

          <h1>
            Knowledge stays.
            <br />
            <span>Even when people leave.</span>
          </h1>

          <p>
            Transform scattered project information into structured,
            actionable knowledge. Help your team preserve decisions,
            responsibilities and project context with AI.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setShowDashboard(true)}
            >
              Get Started →
            </button>

            <button
              className="secondary-btn"
              onClick={exploreFeatures}
            >
              Explore Features
            </button>
          </div>

          <div className="trust-text">
            Built for smarter project continuity.
          </div>
        </div>

        {/* Project Knowledge Workflow */}
        <div className="hero-visual">
          <div className="visual-card">
            <div className="card-header">
              <span>Project Knowledge Workflow</span>
              <span className="status">● Active</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">📂</span>
              <div>
                <b>01. Connect</b>
                <small>Collect project documents and information</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">⚙️</span>
              <div>
                <b>02. Data Processing</b>
                <small>Extract and prepare document content</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">🤖</span>
              <div>
                <b>03. AI Extraction & Reconstruction</b>
                <small>Identify decisions, tasks, risks and responsibilities</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">🔍</span>
              <div>
                <b>04. Evidence Verification</b>
                <small>Link findings to supporting document evidence</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">👥</span>
              <div>
                <b>05. Human Review & Approval</b>
                <small>Review, edit and approve extracted knowledge</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="knowledge-item">
              <span className="item-icon">📑</span>
              <div>
                <b>06. Knowledge Handover</b>
                <small>Generate an organised project handover report</small>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="ai-note">
              <span>✦ AI-Powered Knowledge Continuity</span>
              <p>
                Convert scattered project information into
                structured knowledge for a smoother team handover.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section className="about-section" id="about">

        <div className="about-heading">
          <span className="tag">ABOUT KNOWBRIDGE AI</span>

          <h2>Preserving Knowledge. Empowering Continuity.</h2>

          <p>
            KnowBridge AI is an intelligent project knowledge handover
            platform designed to prevent critical organisational knowledge
            from being lost when team members leave, change roles, or
            transition between projects.
          </p>

          <p>
            It transforms scattered project documents and activity records
            into structured, evidence-backed knowledge, helping organisations
            maintain continuity, reduce information gaps, and make
            better-informed decisions.
          </p>
        </div>

        <div className="about-grid">
          {aboutPoints.map((point, index) => (
            <div className="about-card" key={index}>
              <div className="about-icon">{point.icon}</div>

              <h3>{point.title}</h3>

              <p>{point.description}</p>
            </div>
          ))}
        </div>

        <div className="vision-card">
          <span>OUR VISION</span>

          <h3>
            A future where knowledge never leaves with people.
          </h3>

          <p>
            To build a future where organisational knowledge remains
            accessible, traceable and actionable, regardless of changes
            in team structure.
          </p>
        </div>

      </section>

      {/* Features Section */}
      <section className="features" id="features">

        <div className="features-heading">
          <span className="tag">WHAT KNOWBRIDGE AI OFFERS</span>

          <h2>Features</h2>

          <p>
            Everything you need to preserve, understand and transfer
            valuable project knowledge.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className={`feature-card ${feature.featured ? 'feature-card-highlight' : ''}`}
              key={index}
            >
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-number">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

      </section>

    </div>
  )
}

export default App
