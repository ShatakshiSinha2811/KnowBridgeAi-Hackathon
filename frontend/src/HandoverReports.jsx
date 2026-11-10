
import './HandoverReports.css'

function HandoverReports({ items }) {

  const approvedItems = items.filter(
    item => item.status === 'Approved'
  )

  const pendingItems = items.filter(
    item => item.status === 'Pending'
  )

  // Safely format text for the generated HTML report
  const escapeHTML = (value = '') => {
    return String(value).replace(/[&<>"']/g, character => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }

      return entities[character]
    })
  }

  // Generate and print the handover report
  const handleGenerateReport = () => {

    if (approvedItems.length === 0) {
      window.alert(
        'There are no approved knowledge items. Please approve items in Review & Approval first.'
      )
      return
    }

    const reportDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    const groupedItems = approvedItems.reduce((groups, item) => {
      const category = item.category || 'Other Findings'

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(item)
      return groups
    }, {})

    const categorySections = Object.entries(groupedItems)
      .map(([category, categoryItems]) => `
        <section class="category-section">
          <h2>${escapeHTML(category)}</h2>

          ${categoryItems.map((item, index) => `
            <article class="knowledge-item">
              <h3>${index + 1}. ${escapeHTML(item.title)}</h3>

              <p>${escapeHTML(item.description)}</p>

              ${item.source_filename ? `
                <p class="detail">
                  <strong>Source Document:</strong>
                  ${escapeHTML(item.source_filename)}
                </p>
              ` : ''}

              ${item.evidence ? `
                <div class="evidence">
                  <strong>Supporting Evidence:</strong>
                  <p>${escapeHTML(item.evidence)}</p>
                </div>
              ` : ''}

              <p class="approved">Status: Approved</p>
            </article>
          `).join('')}

        </section>
      `)
      .join('')

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>KnowBridge AI - Handover Report</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            color: #263442;
            margin: 40px;
            line-height: 1.6;
          }

          .report-header {
            border-bottom: 3px solid #27866e;
            padding-bottom: 18px;
            margin-bottom: 25px;
          }

          h1 {
            color: #176b58;
            margin-bottom: 5px;
          }

          .report-meta {
            color: #667085;
            font-size: 14px;
          }

          .summary {
            background: #f1f7f5;
            padding: 18px;
            border-radius: 8px;
            margin-bottom: 25px;
          }

          .category-section {
            margin-top: 28px;
          }

          .category-section h2 {
            color: #176b58;
            border-bottom: 1px solid #dce6e2;
            padding-bottom: 8px;
          }

          .knowledge-item {
            padding: 14px;
            margin: 14px 0;
            border: 1px solid #dce6e2;
            border-radius: 8px;
            page-break-inside: avoid;
          }

          .knowledge-item h3 {
            margin-top: 0;
          }

          .detail {
            font-size: 13px;
            color: #52616b;
          }

          .evidence {
            background: #f7f9fc;
            padding: 12px;
            border-left: 3px solid #27866e;
            margin-top: 12px;
          }

          .approved {
            color: #176b58;
            font-weight: bold;
            font-size: 13px;
          }

          .footer {
            margin-top: 35px;
            padding-top: 12px;
            border-top: 1px solid #dce6e2;
            color: #667085;
            font-size: 12px;
          }

          @media print {
            body {
              margin: 20mm;
            }
          }
        </style>
      </head>

      <body>

        <header class="report-header">
          <h1>KnowBridge AI</h1>
          <h2>Project Knowledge Handover Report</h2>
          <p class="report-meta">
            Generated on: ${escapeHTML(reportDate)}
          </p>
        </header>

        <section class="summary">
          <h2>Handover Summary</h2>
          <p>
            This report consolidates project knowledge reviewed
            and approved for handover.
          </p>
          <p>
            <strong>Approved Knowledge Items:</strong>
            ${approvedItems.length}
          </p>
          <p>
            <strong>Pending Items Not Included:</strong>
            ${pendingItems.length}
          </p>
        </section>

        <main>
          ${categorySections}
        </main>

        <footer class="footer">
          Generated by KnowBridge AI –
          Intelligent Project Knowledge Handover Platform.
        </footer>

      </body>
      </html>
    `

    const reportWindow = window.open('', '_blank')

    if (!reportWindow) {
      window.alert(
        'Please allow pop-ups for this website to generate your report.'
      )
      return
    }

    reportWindow.document.open()
    reportWindow.document.write(reportHTML)
    reportWindow.document.close()

    reportWindow.focus()
    reportWindow.print()
  }

  return (
    <div className="handover-page">

      <div className="handover-header">
        <div>
          <h1>Handover Reports</h1>
          <p>
            Generate and manage project knowledge handover reports.
          </p>
        </div>

        <button
          className="generate-report-btn"
          onClick={handleGenerateReport}
        >
          + Generate Report
        </button>
      </div>

      <div className="handover-welcome">
        <h2>Project Knowledge Handover</h2>
        <p>
          Bring together important project decisions, tasks,
          responsibilities and risks in one organised report.
        </p>
      </div>

      <div className="handover-stats">

        <div className="handover-stat-card">
          <h3>{approvedItems.length}</h3>
          <p>Approved Knowledge Items</p>
        </div>

        <div className="handover-stat-card">
          <h3>{pendingItems.length}</h3>
          <p>Pending Items</p>
        </div>

        <div className="handover-stat-card">
          <h3>{approvedItems.length > 0 ? 'Ready' : 'Not Ready'}</h3>
          <p>Handover Status</p>
        </div>

      </div>

      <div className="report-section">
        <h2>Approved Knowledge Items</h2>

        {approvedItems.length === 0 ? (
          <p>
            No approved knowledge items yet.
            Please approve items in Review & Approval first.
          </p>
        ) : (
          approvedItems.map(item => (
            <div className="report-card" key={item.id}>
              <div>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>Approved</span>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default HandoverReports
