import { EventCard } from '../components/EventCard'
import { MOCK_EVENTS } from '../utils/mockData'

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
        {MOCK_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewClick={() => {}}
            onJoinClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
