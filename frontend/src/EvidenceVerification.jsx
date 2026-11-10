
import './EvidenceVerification.css'

function EvidenceVerification({ items, setItems }) {

  const updateVerification = (id, verificationStatus) => {
    setItems(previousItems =>
      previousItems.map(item =>
        item.id === id
          ? { ...item, verificationStatus }
          : item
      )
    )
  }

  return (
    <div className="verification-page">

      <div className="verification-header">
        <h1>Evidence Verification</h1>
        <p>
          Verify AI-extracted project knowledge using
          supporting evidence from the original documents.
        </p>
      </div>

      <div className="verification-summary">

        <div className="verification-stat">
          <h3>{items.length}</h3>
          <p>Total Findings</p>
        </div>

        <div className="verification-stat">
          <h3>
            {items.filter(
              item => item.verificationStatus === 'Verified'
            ).length}
          </h3>
          <p>Verified</p>
        </div>

        <div className="verification-stat">
          <h3>
            {items.filter(
              item => item.verificationStatus === 'Needs Verification'
            ).length}
          </h3>
          <p>Needs Verification</p>
        </div>

        <div className="verification-stat">
          <h3>
            {items.filter(
              item =>
                !item.evidence || !item.source_filename
            ).length}
          </h3>
          <p>Missing Evidence</p>
        </div>

      </div>

      <div className="verification-list">

        <h2>Extracted Knowledge Findings</h2>

        {items.length === 0 ? (
          <p className="verification-empty">
            No findings available yet. Analyse your documents
            using AI to see knowledge findings here.
          </p>
        ) : (

          items.map(item => {

            const hasEvidence =
              Boolean(item.evidence && item.source_filename)

            const currentStatus =
              item.verificationStatus ||
              (hasEvidence ? 'Needs Verification' : 'Missing Evidence')

            return (
              <div className="verification-card" key={item.id}>

                <div className="verification-card-top">

                  <span className="verification-category">
                    {item.category}
                  </span>

                  <span className={`verification-status ${
                    currentStatus.toLowerCase().replaceAll(' ', '-')
                  }`}>
                    {currentStatus}
                  </span>

                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="evidence-details">

                  <h4>Source Document</h4>

                  <p>
                    {item.source_filename || 'Source document not available'}
                  </p>

                  <h4>Supporting Evidence</h4>

                  <blockquote>
                    {item.evidence || 'No supporting quotation available.'}
                  </blockquote>

                </div>

                <div className="verification-actions">

                  <button
                    onClick={() =>
                      updateVerification(item.id, 'Verified')
                    }
                    disabled={!hasEvidence}
                  >
                    Verify Evidence
                  </button>

                  <button
                    onClick={() =>
                      updateVerification(item.id, 'Needs Verification')
                    }
                  >
                    Needs Verification
                  </button>

                </div>

              </div>
            )
          })

        )}

      </div>

    </div>
  )
}

export default EvidenceVerification

