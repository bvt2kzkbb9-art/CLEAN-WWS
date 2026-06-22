export function Search() {
  return (
    <div className="page-container search-page">
      <div className="page-header">
        <h1>Search</h1>
      </div>

      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search events, people, locations..."
          className="search-input-large"
        />
      </div>

      <div className="search-tabs">
        <button className="tab-btn active">Events</button>
        <button className="tab-btn">People</button>
        <button className="tab-btn">Locations</button>
      </div>

      <div className="search-results">
        <p className="empty-state">Start typing to search...</p>
      </div>
    </div>
  )
}
