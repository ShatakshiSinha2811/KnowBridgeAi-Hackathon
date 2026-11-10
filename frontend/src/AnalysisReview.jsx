
import { useState } from 'react'
import './AnalysisReview.css'

function AnalysisReview({ documents, setItems }) {
  const [activeCategory, setActiveCategory] = useState('summary')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { id: 'summary', name: 'Project Summary', icon: '📋' },
    { id: 'decisions', name: 'Key Decisions', icon: '⚖️' },
    { id: 'tasks', name: 'Tasks & Actions', icon: '✅' },
    { id: 'responsibilities', name: 'Responsibilities', icon: '👥' },
    { id: 'risks', name: 'Project Risks', icon: '⚠️' },
    { id: 'dependencies', name: 'Dependencies & Questions', icon: '🔗' }
  ]

  const handleAnalyze = async () => {
    if (!documents || documents.length === 0) {
      setError('Please upload and process documents first.')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          documents: documents.map(document => ({
            filename: document.filename,
            extracted_text: document.extracted_text
          }))
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'AI analysis failed.')
      }

      const result = data.analysis
      setAnalysis(result)

      const categoriesToItems = [
        { key: 'decisions', label: 'Key Decisions' },
        { key: 'tasks', label: 'Tasks & Actions' },
        { key: 'responsibilities', label: 'Responsibilities' },
        { key: 'risks', label: 'Project Risks' },
        { key: 'dependencies', label: 'Dependencies' },
        { key: 'unresolved_questions', label: 'Unresolved Questions' }
      ]

      const extractedItems = categoriesToItems.flatMap(category =>
        (result[category.key] || []).map((item, index) => ({
          id: `${category.key}-${Date.now()}-${index}`,
          category: category.label,
          title: item.title,
          description: item.description,
          source_filename: item.source_filename,
          evidence: item.evidence,
          status: 'Pending',
          verificationStatus: 'Needs Verification'
        }))
      )

      if (setItems) {
        setItems(extractedItems)
      }

    } catch (err) {
      setError(err.message || 'Unable to connect to the backend.')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryItems = () => {
    if (activeCategory === 'dependencies') {
      return [
        ...(analysis?.dependencies || []),
        ...(analysis?.unresolved_questions || [])
      ]
    }

    return analysis?.[activeCategory] || []
  }

  return (
    <div className="analysis-page">

      <div className="analysis-header">
        <h1>AI Knowledge Analysis</h1>
        <p>
          Extract and reconstruct important project knowledge using AI.
        </p>
      </div>

      <div className="analysis-notice">
        <strong>AI Analysis Workspace</strong>
        <p>
          Upload project documents and let KnowBridge AI identify
          decisions, tasks, responsibilities, risks and dependencies.
        </p>
      </div>

      <div className="analysis-action">
        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={loading || !documents?.length}
        >
          {loading ? 'Analysing Documents...' : '✦ Analyse Documents with AI'}
        </button>

        {error && (
          <p className="error-message">{error}</p>
        )}

        {analysis && (
          <p className="success-message">
            AI knowledge extraction completed successfully!
          </p>
        )}
      </div>

      <div className="analysis-layout">

        <div className="analysis-sidebar">
          <h3>Knowledge Categories</h3>

          {categories.map(category => (
            <button
              key={category.id}
              className={activeCategory === category.id ? 'active' : ''}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        <div className="analysis-content">

          <h2>
            {categories.find(item => item.id === activeCategory)?.name}
          </h2>

          <p>
            {documents?.length || 0} document(s) available for analysis.
          </p>

          {activeCategory === 'summary' ? (

            <div className="analysis-document">

              <h3>Uploaded Source Documents</h3>

              {documents?.length > 0 ? (
                documents.map((document, index) => (
                  <div key={index}>
                    <p>
                      <strong>{document.filename}</strong>
                    </p>

                    <p>
                      {document.characters} characters extracted
                    </p>

                    <details>
                      <summary>View Extracted Content</summary>
                      <pre>{document.extracted_text}</pre>
                    </details>
                  </div>
                ))
              ) : (
                <p>No documents uploaded yet.</p>
              )}

              <h3>AI-Generated Project Summary</h3>

              {analysis ? (
                <p>
                  {analysis.summary || 'No reliable summary available.'}
                </p>
              ) : (
                <p>
                  AI summary will appear here after successful
                  knowledge extraction.
                </p>
              )}

            </div>

          ) : !analysis ? (

            <div className="analysis-placeholder">
              <h3>Ready for AI Knowledge Extraction</h3>
              <p>
                Upload your project documents and click
                Analyse Documents with AI to extract project knowledge.
              </p>
            </div>

          ) : (

            getCategoryItems().length > 0 ? (

              getCategoryItems().map((item, index) => (
                <div className="analysis-document" key={index}>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <p>
                    <strong>Source:</strong>{' '}
                    {item.source_filename || 'Not available'}
                  </p>

                  <details>
                    <summary>View Supporting Evidence</summary>
                    <blockquote>
                      {item.evidence || 'No supporting evidence available.'}
                    </blockquote>
                  </details>

                </div>
              ))

            ) : (

              <div className="analysis-placeholder">
                <h3>No Findings Available</h3>
                <p>
                  AI did not identify any supported findings in this category.
                </p>
              </div>

            )
          )}

        </div>
      </div>
    </div>
  )
}

export default AnalysisReview
