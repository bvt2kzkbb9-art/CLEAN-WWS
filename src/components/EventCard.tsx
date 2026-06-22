import { memo } from 'react'
import { Event } from '@/types'
import './EventCard.css'

interface EventCardProps {
  event: Event
  onViewClick?: () => void
  onJoinClick?: () => void
  variant?: 'compact' | 'detailed'
  showActions?: boolean
}

function EventCardComponent({
  event,
  onViewClick,
  onJoinClick,
  variant = 'compact',
  showActions = true,
}: EventCardProps) {
  return (
    <div className={`event-card event-card-${variant}`}>
      <div className="event-card-image">
        {event.image ? (
          <img src={event.image} alt={event.title} />
        ) : (
          <div className="image-placeholder"></div>
        )}
        <div className="category-badge">{event.category}</div>
      </div>

      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>

        {variant === 'detailed' && (
          <p className="event-card-description">{event.description}</p>
        )}

        <div className="event-card-meta">
          <span className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="meta-text">{event.location}</span>
          </span>
          <span className="meta-item">
            <span className="meta-icon">👥</span>
            <span className="meta-text">{event.participants} joining</span>
          </span>
        </div>

        {showActions && (
          <div className="event-card-actions">
            <button
              className="btn-primary btn-sm"
              onClick={onViewClick}
            >
              View
            </button>
            <button
              className="btn-secondary btn-sm"
              onClick={onJoinClick}
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const EventCard = memo(EventCardComponent)
