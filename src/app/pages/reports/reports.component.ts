import { Component, OnInit } from '@angular/core';
import {ROUTE_TRANSITION} from '../../app.animation';

@Component({
  selector: 'elastic-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollTo(elem) {
    elem.scrollIntoView({
      behavior: 'smooth', // or "auto" or "instant"
      block: 'start', // or "end"
      inline: 'nearest'
    });
  }

}
