
import './Dashboard.css'
import { useState, useEffect } from 'react'

import SourceDocuments from './SourceDocuments'
import AnalysisReview from './AnalysisReview'
import EvidenceVerification from './EvidenceVerification'
import ReviewApproval from './ReviewApproval'
import HandoverReports from './HandoverReports'

function Dashboard() {
  const [activePage, setActivePage] = useState('overview')

  // Load previously saved documents from localStorage
  const [documents, setDocuments] = useState(() => {
    try {
      const savedDocuments = localStorage.getItem('knowbridge_documents')
      return savedDocuments ? JSON.parse(savedDocuments) : []
    } catch (error) {
      console.error('Error loading saved documents:', error)
      return []
    }
  })

  // Automatically save documents whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        'knowbridge_documents',
        JSON.stringify(documents)
      )
    } catch (error) {
      console.error('Error saving documents:', error)
    }
  }, [documents])

  const [items, setItems] = useState([
    {
      id: 1,
      category: 'Key Decision',
      title: 'Technology selection',
      description: 'The team decided to use React for frontend development.',
      status: 'Pending'
    },
    {
      id: 2,
      category: 'Task & Action',
      title: 'Frontend development',
      description: 'Complete the dashboard and document upload interface.',
      status: 'Pending'
    },
    {
      id: 3,
      category: 'Project Risk',
      title: 'API integration delay',
      description: 'Backend AI integration is pending due to API availability issues.',
      status: 'Pending'
    }
  ])

  // Rename an uploaded document
  const handleRenameDocument = (index) => {
    const document = documents[index]

    const newName = window.prompt(
      'Enter the new document name:',
      document.filename
    )

    if (newName === null || newName.trim() === '') {
      return
    }

    setDocuments(previousDocuments =>
      previousDocuments.map((doc, i) =>
        i === index
          ? { ...doc, filename: newName.trim() }
          : doc
      )
    )
  }

  // Delete an uploaded document
  const handleDeleteDocument = (index) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this document?'
    )

    if (confirmDelete) {
      setDocuments(previousDocuments =>
        previousDocuments.filter((_, i) => i !== index)
      )
    }
  }

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <button
          className="back-home-btn"
          onClick={() => window.location.reload()}
        >
          ← Back to Home
        </button>

        <h2>
          KnowBridge <span>AI</span>
        </h2>

        <p className="menu-title">WORKSPACE</p>

        <a
          href="#overview"
          className={activePage === 'overview' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('overview')
          }}
        >
          ▦ Overview
        </a>

        <a
          href="#sources"
          className={activePage === 'sources' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('sources')
          }}
        >
          ▤ Source Documents
        </a>

        <a
          href="#analysis"
          className={activePage === 'analysis' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('analysis')
          }}
        >
          📊 AI Knowledge Analysis
        </a>

        <a
          href="#verification"
          className={activePage === 'verification' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('verification')
          }}
        >
          🔍 Evidence Verification
        </a>

        <a
          href="#review"
          className={activePage === 'review' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('review')
          }}
        >
          ✓ Review & Approval
        </a>

        <a
          href="#handover"
          className={activePage === 'handover' ? 'active' : ''}
          onClick={(event) => {
            event.preventDefault()
            setActivePage('handover')
          }}
        >
          ⇧ Handover Reports
        </a>

      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Overview Page */}
        {activePage === 'overview' && (
          <>

            <header className="dashboard-header">
              <div>
                <h1>Project Overview</h1>
                <p>
                  Manage your uploaded documents and project knowledge.
                </p>
              </div>
            </header>

            {/* Welcome Card */}
            <section className="welcome-card">
              <div>
                <h2>Welcome to KnowBridge AI</h2>
                <p>
                  Preserve important project knowledge and make
                  team handovers easier with AI.
                </p>
              </div>

              <span className="welcome-icon">✦</span>
            </section>

            {/* Dashboard Statistics */}
            <section className="stats-grid">

              <div className="stat-card">
                <p>Documents Uploaded</p>
                <h2>{documents.length}</h2>
              </div>

              <div className="stat-card">
                <p>Pending Tasks</p>
                <h2>08</h2>
              </div>

              <div className="stat-card">
                <p>Handovers Generated</p>
                <h2>02</h2>
              </div>

            </section>

            {/* Uploaded Documents */}
            <section className="project-section">

              <h2>Uploaded Documents</h2>

              {documents.length === 0 ? (
                <p>
                  No processed documents available yet.
                  Visit Source Documents to upload and process your files.
                </p>
              ) : (

                documents.map((document, index) => (

                  <div
                    className="project-card"
                    key={`${document.filename}-${index}`}
                  >

                    <div>
                      <h3>📄 {document.filename}</h3>

                      <p>
                        {document.characters} characters extracted
                      </p>

                      <small>Document successfully processed</small>
                    </div>

                    <div className="document-actions">

                      <button
                        type="button"
                        onClick={() => handleRenameDocument(index)}
                      >
                        Edit Name
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(index)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))
              )}

            </section>

          </>
        )}

        {/* Source Documents Page */}
        {activePage === 'sources' && (
          <SourceDocuments
            onDocumentsProcessed={setDocuments}
          />
        )}

        {/* AI Knowledge Analysis Page */}
        {activePage === 'analysis' && (
          <AnalysisReview
            documents={documents}
            setItems={setItems}
          />
        )}

        {/* Evidence Verification Page */}
        {activePage === 'verification' && (
          <EvidenceVerification
            items={items}
            setItems={setItems}
          />
        )}

        {/* Review & Approval Page */}
        {activePage === 'review' && (
          <ReviewApproval
            items={items}
            setItems={setItems}
          />
        )}

        {/* Handover Reports Page */}
        {activePage === 'handover' && (
          <HandoverReports
            items={items}
          />
        )}

      </main>

    </div>
  )
}

export default Dashboard
