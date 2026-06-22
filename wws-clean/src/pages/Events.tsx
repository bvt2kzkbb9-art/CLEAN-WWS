export function Events() {
  return (
    <div className="page-container events-page">
      <div className="page-header">
        <h1>All Events</h1>
        <button className="btn-primary">+ Create Event</button>
      </div>

      <div className="filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Upcoming</button>
        <button className="filter-btn">This Week</button>
        <button className="filter-btn">My Events</button>
      </div>

      <div className="events-list">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="event-item">
            <div className="event-image"></div>
            <div className="event-info">
              <h3>Event {i} Title</h3>
              <p className="event-date">📅 June {22 + i}, 2026 - 2:00 PM</p>
              <p className="event-location">📍 Location City</p>
              <div className="event-footer">
                <span className="event-category">Sports</span>
                <span className="event-participants">👥 24 joining</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
