"use client";

import GoogleCalendarApi from "react-google-calendar-api";
import {
  CalendarEvent,
  IcreateCalendar,
  IcreateEvent,
  IrequestGetCalendar,
} from "@/share/types/calendarTypes";

const config = {
  clientId: process.env.NEXT_PUBLIC_G_CLIENT_ID as string,
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

export const client = new GoogleCalendarApi(config);

const calendarId =
  "7fe145c393520624a693e5cbb8a67f14c548375ff88509d7da2d1090d755c24c@group.calendar.google.com";

export async function statusLogin() {
  console.log(client.sign);
}

export async function loginCalendar() {
  const request = await client.handleAuthClick();
  console.log(request);
  return request;
}

export async function createCalendar(
  NameCalendar: string
): Promise<IcreateCalendar> {
  const request = await client.createCalendar(NameCalendar);
  console.log(request);
  return request;
}

export async function createEvent(
  event: IcreateEvent,
  calendarId: string
): Promise<void> {
  const request = await client.createEvent(event, calendarId);
  return request;
}

export async function getCalendar(calendarId: string): Promise<CalendarEvent> {
  const { result }: IrequestGetCalendar = await client.listEvents({
    calendarId,
  });
  return result;
}

//     <div className={styles.container}>
//       <div className={styles.modalContent}>
//         <Button
//           onClick={() => client.handleAuthClick()}
//           text="Entrar com a Conta Google"
//         />
//       </div>
//       <button onClick={() => handleSubmit()}>Criar evento</button>
//       <button
//         onClick={() =>
//           client
//             .listEvents({ calendarId })

//         }
//       >
//         List evento
//       </button>
//       <button
//         onClick={() =>
//           client.listCalendars()
//         }
//       >
//         List calendar
//       </button>
//       <button onClick={() => getCalendar()}>List calendar</button>
//     </div>
//   );

{
  /* <button onClick={()=>client.createCalendar('will').then((response)=> console.log(response))}>create calendar</button> */
}

// const config = {
//     clientId:
//       "364606736652-lhmul2ue4j45t4t2ud1rchmj6f5ph6fc.apps.googleusercontent.com",
//     apiKey: "AIzaSyAlGX4ZzvO_KgOAQ9k_8_qqTKUJyBgFggA",
//     scope: "https://www.googleapis.com/auth/calendar",
//     discoveryDocs: [
//       "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//     ],
//   };
