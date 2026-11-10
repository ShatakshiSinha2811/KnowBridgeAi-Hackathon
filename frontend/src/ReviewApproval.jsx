
import './ReviewApproval.css'

function ReviewApproval({ items, setItems }) {

  const updateStatus = (id, status) => {
    setItems(previous =>
      previous.map(item =>
        item.id === id ? { ...item, status } : item
      )
    )
  }

  const deleteItem = (id) => {
    setItems(previous =>
      previous.filter(item => item.id !== id)
    )
  }

  const editItem = (id) => {
    const selectedItem = items.find(item => item.id === id)

    const newTitle = window.prompt(
      'Edit title:',
      selectedItem.title
    )

    if (newTitle === null || newTitle.trim() === '') {
      return
    }

    const newDescription = window.prompt(
      'Edit description:',
      selectedItem.description
    )

    if (newDescription === null || newDescription.trim() === '') {
      return
    }

    setItems(previous =>
      previous.map(item =>
        item.id === id
          ? {
              ...item,
              title: newTitle.trim(),
              description: newDescription.trim()
            }
          : item
      )
    )
  }

  return (
    <div className="review-page">

      <header className="review-header">
        <h1>Review & Approval</h1>
        <p>
          Verify project knowledge before generating the handover report.
        </p>
      </header>

      <div className="review-summary">
        <div>
          <h3>{items.length}</h3>
          <p>Total Items</p>
        </div>

        <div>
          <h3>{items.filter(item => item.status === 'Pending').length}</h3>
          <p>Pending</p>
        </div>

        <div>
          <h3>{items.filter(item => item.status === 'Approved').length}</h3>
          <p>Approved</p>
        </div>

        <div>
          <h3>{items.filter(item => item.status === 'Rejected').length}</h3>
          <p>Rejected</p>
        </div>
      </div>

      <div className="review-list">
        <h2>Knowledge Items</h2>

        {items.length === 0 ? (
          <p>No knowledge items available for review.</p>
        ) : (
          items.map(item => (
            <div className="review-card" key={item.id}>

              <div className="review-card-top">
                <span className="review-category">
                  {item.category}
                </span>

                <span className={`review-status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="review-actions">
                <button onClick={() => editItem(item.id)}>
                  Edit
                </button>

                <button onClick={() => updateStatus(item.id, 'Approved')}>
                  Approve
                </button>

                <button onClick={() => updateStatus(item.id, 'Rejected')}>
                  Reject
                </button>

                <button onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default ReviewApproval
