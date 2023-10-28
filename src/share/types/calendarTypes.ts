export interface CalendarEvent {
  accessRole: string;
  description: string;
  items: CalendarEventItem[];
  summary: string;
  timeZone: string;
  updated: string;
}

interface CalendarEventItem {
  created: string;
  creator: {
    email: string;
    displayName: string;
    self: boolean;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  htmlLink: string;
  id: string;
  sequence: number;
  status: string;
  summary: string;
  updated: string;
}

export interface IrequestGetCalendar {
  body: string;
  headers: Object;
  result: CalendarEvent;
  status: number;
  statusText: string | null;
}

export interface IcreateEvent {
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurrence?: string[];
  attendees?: {
    email: string;
  }[];
  reminders?: {
    useDefault: boolean;
    overrides?: {
      method: string;
      minutes: number;
    }[];
  };
}

export interface IcreateCalendar {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  location: string;
  timeZone: string;
  conferenceProperties: {
    allowedConferenceSolutionTypes: [string];
  };
}
