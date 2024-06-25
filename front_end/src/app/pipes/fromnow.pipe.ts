import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/ar-tn'

@Pipe({
  name: 'fromnow',
  standalone: true
})
export class FromnowPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    console.log(value);
moment.locale('ar-tn');

    return moment(value).fromNow();
  }

}
