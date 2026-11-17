/** Minimal RFC 5545 calendar file so phones add institution events with their own reminders. */
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
export function icsEvent(e: { uid: string; title: string; description?: string; start: Date; minutes?: number; location?: string }, now = new Date()) {
  const end = new Date(e.start.getTime() + (e.minutes ?? 60) * 60000);
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GICM//pracTICAtecnica.com//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', `UID:${e.uid}@practicatecnica.com`, `DTSTAMP:${stamp(now)}`, `DTSTART:${stamp(e.start)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(e.title)}`, ...(e.description ? [`DESCRIPTION:${esc(e.description.slice(0, 900))}`] : []), ...(e.location ? [`LOCATION:${esc(e.location)}`] : []),
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.title)}`, 'TRIGGER:-P1D', 'END:VALARM',
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.title)}`, 'TRIGGER:-PT1H', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}
export function downloadIcs(name: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url; a.download = `${name.replace(/[^\w-]+/g, '-').slice(0, 60) || 'evento'}.ics`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
