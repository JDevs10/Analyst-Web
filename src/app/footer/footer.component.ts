import { Component, OnInit } from '@angular/core';
import { DateServiceService } from '../service/date-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dateService: DateServiceService) { }

  ngOnInit() {
    const currentdate = new Date();
    const datetime = this.dateService.getCurrentDateString(currentdate.getTime(), 'simpleDate');
    document.getElementById('footer-sync-info-time').innerText = datetime;
  }

}
