import {
   BasePublisher,
   Subjects,
   TicketCreatedEvent,
} from '@xyz-common/common';

export class TicketCreatePublisher extends BasePublisher<TicketCreatedEvent> {
   subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated;
}
