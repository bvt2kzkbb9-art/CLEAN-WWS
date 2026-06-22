import { useCallback } from 'react'
import { eventService, Event, EventStatus } from '@/services'
import { useFirestore, UseFirestoreReturn } from './useFirestore'

export interface UseEventsReturn extends UseFirestoreReturn<Event> {
  createEvent: (
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    organizerId: string,
    category?: string,
  ) => Promise<Event>
  publishEvent: (eventId: string) => Promise<Event>
  updateEventStatus: (eventId: string, status: EventStatus) => Promise<Event>
  getEventsByOrganizer: (organizerId: string) => Promise<Event[]>
  getPublishedEvents: () => Promise<Event[]>
}

export const useEvents = (): UseEventsReturn => {
  const firestoreReturn = useFirestore(eventService)

  const createEvent = useCallback(
    async (
      title: string,
      description: string,
      location: string,
      startDate: Date,
      endDate: Date,
      organizerId: string,
      category = 'OTHER',
    ) => {
      return eventService.createEvent(title, description, location, startDate, endDate, organizerId, category)
    },
    [],
  )

  const publishEvent = useCallback(
    async (eventId: string) => {
      return eventService.publishEvent(eventId)
    },
    [],
  )

  const updateEventStatus = useCallback(
    async (eventId: string, status: EventStatus) => {
      return eventService.updateEventStatus(eventId, status)
    },
    [],
  )

  const getEventsByOrganizer = useCallback(
    async (organizerId: string) => {
      return eventService.getEventsByOrganizer(organizerId)
    },
    [],
  )

  const getPublishedEvents = useCallback(
    async () => {
      return eventService.getPublishedEvents()
    },
    [],
  )

  return {
    ...firestoreReturn,
    createEvent,
    publishEvent,
    updateEventStatus,
    getEventsByOrganizer,
    getPublishedEvents,
  }
}
