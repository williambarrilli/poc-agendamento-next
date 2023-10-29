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
      method: "popup" | "email";
      minutes: number;
    }[];
  };
}

export interface IcreateCalendar {
  description?: string | null;
  etag?: string | null;
  id?: string | null;
  kind?: string | null;
  location?: string | null;
  summary?: string | null;
  timeZone?: string | null;
}

export interface ConfigApiCalendar {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
  hosted_domain?: string;
}
