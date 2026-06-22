import { EventCard } from '@/components/EventCard'
import { MOCK_EVENTS } from '@/utils/mockData'

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

      <div className="cards-list">
        {MOCK_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            variant="detailed"
            onViewClick={() => {}}
            onJoinClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
