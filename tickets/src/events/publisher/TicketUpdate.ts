import {
   BasePublisher,
   Subjects,
   TicketUpdatedEvent,
} from '@xyz-common/common';

export class TicketUpdatePublisher extends BasePublisher<TicketUpdatedEvent> {
   subject: TicketUpdatedEvent['subject'] = Subjects.TicketUpdated;
}
