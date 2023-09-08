import { Subjects } from './ISubjects';
import { TicketCreatedEvent } from './TicketCreatedEvent';
import { BasePublisher } from './base-publisher';

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
   subject: Subjects = Subjects['TicketCreated'];
}
