import { EventCard } from '../components/EventCard'
import { Event } from '../types'

export function Events() {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Sunday Football Game',
      description: 'Casual football match in the park',
      location: 'Central Park',
      category: 'Sports',
      image: '',
      participants: 12,
      date: new Date(),
      creator: 'user1',
    },
    {
      id: '2',
      title: 'Basketball Tournament',
      description: 'Competitive 3v3 basketball',
      location: 'Gym Downtown',
      category: 'Sports',
      image: '',
      participants: 24,
      date: new Date(),
      creator: 'user2',
    },
    {
      id: '3',
      title: 'Hiking Adventure',
      description: 'Mountain hiking with friends',
      location: 'Mountain Trail',
      category: 'Outdoor',
      image: '',
      participants: 8,
      date: new Date(),
      creator: 'user3',
    },
    {
      id: '4',
      title: 'Tennis Match',
      description: 'Doubles tennis tournament',
      location: 'Tennis Court',
      category: 'Sports',
      image: '',
      participants: 4,
      date: new Date(),
      creator: 'user4',
    },
  ]

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
        {mockEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            variant="detailed"
            onViewClick={() => console.log('View:', event.id)}
            onJoinClick={() => console.log('Join:', event.id)}
          />
        ))}
      </div>
    </div>
  )
}
