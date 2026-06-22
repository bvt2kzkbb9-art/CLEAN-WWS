import { EventCard } from '../components/EventCard'
import { Event } from '../types'

export function Home() {
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
    {
      id: '5',
      title: 'Beach Volleyball',
      description: 'Fun weekend beach volleyball',
      location: 'Sandy Beach',
      category: 'Sports',
      image: '',
      participants: 16,
      date: new Date(),
      creator: 'user5',
    },
    {
      id: '6',
      title: 'Running Club Meetup',
      description: '5K running session',
      location: 'Downtown Start',
      category: 'Running',
      image: '',
      participants: 18,
      date: new Date(),
      creator: 'user6',
    },
  ]

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
        {mockEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onViewClick={() => console.log('View event:', event.id)}
            onJoinClick={() => console.log('Join event:', event.id)}
          />
        ))}
      </div>
    </div>
  )
}
