import {Duration, parse} from "iso8601-duration";

export function formatDuration(durationString: string): string {
  const duration = parse(durationString) as Duration;

  let years = duration!.years!
  let months = duration!.months!

  let result = '';

  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
  }

  if (months > 0 || (result.length === 0 && years === 0)) {
    result += `${months} month${months > 1 ? 's' : ''}`;
  }

  return result.trim();
}

export function computeMonthsFromDuration(durationString: string): number {
  const duration = parse(durationString) as Duration;
  return duration!.years! * 12 + duration!.months!;
}

export function createTextDocument(response: ArrayBuffer): void {
  const blob = new Blob([response], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
