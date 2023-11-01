"use server";
import { GoogleApis } from "googleapis";
import { IcreateCalendar, IcreateEvent } from "../types/calendarTypes";
import moment from "moment";
import { Reserved } from "../types/reserved";

const google = new GoogleApis();
const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_G_CLIENT_ID,
  process.env.NEXT_PUBLIC_G_SECRET,
  process.env.NEXTAUTH_URL
);

google.options({
  auth: oauth2Client,
});

/**
 * Creates a new calendar with the given title using the provided access token.
 * @param accessToken The access token to use for authentication.
 * @param title The title of the new calendar.
 * @returns A Promise that resolves to the newly created calendar object.
 */
export const createCalendar = async (
  accessToken: string,
  title = "Minha Reserva PF"
): Promise<IcreateCalendar> => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const calendar = google.calendar({
    version: "v3",
  });
  const { data } = await calendar.calendars.insert({
    requestBody: { summary: title },
  });
  return data;
};

/**
 * Retrieves the calendar data for the specified calendar ID using the provided access token.
 * @param accessToken The access token to use for authentication.
 * @param calendarId The ID of the calendar to retrieve data for.
 * @returns The calendar data for the specified calendar ID.
 */
export const getCalendars = async (accessToken: string, calendarId: string) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const calendar = google.calendar({
    version: "v3",
  });
  const { data } = await calendar.calendars.get({ calendarId });
  return data;
};

/**
 * Retrieves a list of events from the specified calendar using the provided access token.
 * @param accessToken The access token to use for authentication.
 * @param calendarId The ID of the calendar to retrieve events from.
 * @returns A Promise that resolves to the list of events.
 */
export const getEvents = async (accessToken: string, calendarId: string) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const calendar = google.calendar({
    version: "v3",
  });
  const { data } = await calendar.events.list({ calendarId });
  const events = data.items?.map((evento) => {
    const reserved = {
      name: evento.summary || "",
      hour: moment(evento?.start?.dateTime).format("HH:mm"),
      phone: "",
      date: moment(evento?.start?.dateTime).format("DD/MM/YYYY"),
      start: moment(evento?.start?.dateTime).format("DD/MM/YYYY"),
      end: moment(evento?.end?.dateTime).format("DD/MM/YYYY"),
    };
    return reserved;
  });
  return events || [];
};
interface ICreateEventBody {
  title: string;
  start: string;
  end: string;
}
/**
 * Creates a new event on the specified calendar using the provided access token.
 * @param event - The event details to create.
 * @param accessToken - The access token to use for authentication.
 * @param calendarId - The ID of the calendar to create the event on.
 * @returns The created event data.
 */
export const createEvent = async (
  event: ICreateEventBody,
  accessToken: string,
  calendarId: string
) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  const calendar = google.calendar({
    version: "v3",
  });
  const eventBody: IcreateEvent = {
    summary: event.title,
    description: "Agendado por Minha Reserva PF",
    start: {
      // dateTime: "2023-10-31T09:00:00-01:00",
      dateTime: moment(event.start).format("YYYY-MM-DDTHH:mm:ss"),
      timeZone: "UTC+00:00",
    },
    end: {
      // dateTime: "2023-10-31T010:00:00-01:00",
      dateTime: moment(event.end).format("YYYY-MM-DDTHH:mm:ss"),
      timeZone: "UTC+00:00",
    },
    location: "Passo Fundo",
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 30 }],
    },
  };

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    requestBody: eventBody,
  });

  return data;
};
