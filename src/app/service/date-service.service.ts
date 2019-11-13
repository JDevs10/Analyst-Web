import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  Date;
  Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  getCurrentDateString(timeStamp, format) {
    const d = new Date();
    d.setTime(timeStamp);

    if (format == 'fullDate') {
      return this.Months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' at '
            + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
    if (format == 'simpleDate') {
      return d.getDate() + '/' + (d.getMonth() + 1)  + '/' + d.getFullYear() + ' @ '
            + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
  }

  getCurrentDateYear(timeStamp) {
    const d = new Date();
    d.setTime(timeStamp);
    return d.getFullYear();
  }

  getCurrentDate() {
    return new Date();
  }

  setDate(timeStamp) {
    this.Date = new this.Date();
    this.Date.setTime(timeStamp);
  }
}
