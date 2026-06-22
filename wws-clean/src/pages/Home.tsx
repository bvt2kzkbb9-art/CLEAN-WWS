export function Home() {
  return (
    <div className="page-container home-page">
      <div className="page-header">
        <h1>Upcoming Events</h1>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search events..." />
        <button>🔍</button>
      </div>

      <div className="cards-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card-placeholder">
            <div className="card-image-skeleton"></div>
            <div className="card-content">
              <h3 className="card-title">Event {i}</h3>
              <p className="card-location">📍 Location</p>
              <p className="card-category">Category</p>
              <div className="card-meta">
                <span>👥 0 participants</span>
              </div>
              <div className="card-actions">
                <button className="btn-primary">View</button>
                <button className="btn-secondary">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
