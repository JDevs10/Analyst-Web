import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const currentdate = new Date();
    const datetime = currentdate.getDate() + '/'
                    + (currentdate.getMonth() + 1)  + '/'
                    + currentdate.getFullYear() + ' @ '
                    + currentdate.getHours() + ':'
                    + currentdate.getMinutes() + ':'
                    + currentdate.getSeconds();
    document.getElementById('footer-sync-info-time').innerText = datetime;
  }

}
