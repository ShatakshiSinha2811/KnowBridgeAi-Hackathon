
import { useState } from 'react'
import './SourceDocuments.css'

function SourceDocuments({ onDocumentsProcessed }) {
  const [files, setFiles] = useState([])
  const [processing, setProcessing] = useState(false)
  const [processedDocuments, setProcessedDocuments] = useState([])
  const [error, setError] = useState('')

  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files)
    setFiles((previousFiles) => [...previousFiles, ...selectedFiles])
    setProcessedDocuments([])
    setError('')
    event.target.value = ''
  }

  const removeFile = (indexToRemove) => {
    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== indexToRemove)
    )
    setProcessedDocuments([])
  }

  const handleProcessDocuments = async () => {
    if (files.length === 0) return

    setProcessing(true)
    setError('')
    setProcessedDocuments([])

    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Document processing failed.')
      }

      setProcessedDocuments(data.documents)
      console.log('Documents sent to Dashboard:', data.documents)
      if (onDocumentsProcessed) {
  onDocumentsProcessed(data.documents)
}
    } catch (err) {
      setError(err.message || 'Unable to connect to the backend.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="source-page">
      <div className="source-header">
        <h1>Source Documents</h1>
        <p>Upload and manage your project documents.</p>
      </div>

      <div className="upload-box">
        <div className="upload-icon">📁</div>
        <h2>Upload Project Documents</h2>
        <p>Select PDF, Word or text files from your computer.</p>

        <label className="upload-btn">
          + Choose Files
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            multiple
            onChange={handleFileUpload}
            hidden
          />
        </label>
      </div>

      <div className="uploaded-section">
        <h2>Uploaded Documents ({files.length})</h2>

        {files.length === 0 ? (
          <p className="empty-message">
            No documents uploaded yet. Choose files to get started.
          </p>
        ) : (
          files.map((file, index) => (
            <div className="file-item" key={`${file.name}-${index}`}>
              <span>📄</span>
              <div className="file-info">
                <b>{file.name}</b>
                <small>{(file.size / 1024).toFixed(1)} KB</small>
              </div>
              <button onClick={() => removeFile(index)}>
                Remove
              </button>
            </div>
          ))
        )}

        {files.length > 0 && (
          <button
            className="process-btn"
            onClick={handleProcessDocuments}
            disabled={processing}
          >
            {processing ? 'Processing...' : '✦ Process Documents'}
          </button>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      {processedDocuments.length > 0 && (
        <div className="processed-section">
          <h2>Extracted Document Content</h2>

          {processedDocuments.map((document, index) => (
            <div className="extracted-card" key={index}>
              <h3>{document.filename}</h3>
              <p>{document.characters} characters extracted</p>
              <pre>{document.extracted_text || 'No readable text found.'}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SourceDocuments
