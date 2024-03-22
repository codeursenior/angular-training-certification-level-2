import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const minutes = Number(value);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const result = `${hours}h ${remainingMinutes}min`;

    return result;
  }
}
