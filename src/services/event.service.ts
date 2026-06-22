import { BaseService } from './base.service'
import { Event, EventStatus, createEvent } from '@/models/firestore'

export class EventService extends BaseService<Event> {
  protected collectionName = 'events'

  private static instance: EventService

  private constructor() {
    super()
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService()
    }
    return EventService.instance
  }

  async createEvent(
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    organizerId: string,
    category: string = 'OTHER',
  ): Promise<Event> {
    const eventData = createEvent(title, description, location, startDate, endDate, organizerId, category)
    return this.create(eventData)
  }

  async publishEvent(eventId: string): Promise<Event> {
    return this.update(eventId, { eventStatus: EventStatus.PUBLISHED } as Partial<Event>)
  }

  async updateEventStatus(eventId: string, status: EventStatus): Promise<Event> {
    return this.update(eventId, { eventStatus: status } as Partial<Event>)
  }

  async updateEventDetails(
    eventId: string,
    details: Partial<{
      title: string
      description: string
      image: string
      location: string
      category: string
      tags: string[]
      maxParticipants: number | null
    }>,
  ): Promise<Event> {
    return this.update(eventId, details as Partial<Event>)
  }

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    return this.findBy('organizerId', organizerId)
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    return this.findBy('category', category)
  }

  async getPublishedEvents(): Promise<Event[]> {
    return this.findBy('eventStatus', EventStatus.PUBLISHED)
  }

  async incrementParticipantCount(eventId: string): Promise<void> {
    const event = await this.read(eventId)
    if (event) {
      await this.update(eventId, { currentParticipants: event.currentParticipants + 1 } as Partial<Event>)
    }
  }

  async decrementParticipantCount(eventId: string): Promise<void> {
    const event = await this.read(eventId)
    if (event && event.currentParticipants > 0) {
      await this.update(eventId, { currentParticipants: event.currentParticipants - 1 } as Partial<Event>)
    }
  }

  async incrementCommentCount(eventId: string): Promise<void> {
    const event = await this.read(eventId)
    if (event) {
      await this.update(eventId, { commentsCount: event.commentsCount + 1 } as Partial<Event>)
    }
  }

  async decrementCommentCount(eventId: string): Promise<void> {
    const event = await this.read(eventId)
    if (event && event.commentsCount > 0) {
      await this.update(eventId, { commentsCount: event.commentsCount - 1 } as Partial<Event>)
    }
  }
}

export const eventService = EventService.getInstance()
