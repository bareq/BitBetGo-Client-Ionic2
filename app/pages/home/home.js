import {Page, NavController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import {BetdetailsPage} from '../betdetails/betdetails';
import {SettingsPage} from '../settings/settings';
import {SettingsService} from '../../services/settings.service';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [SettingsService]
})
export class HomePage {

  static get parameters() {
    return [[NavController], [Http], [SettingsService]];
  }

  constructor(nav, http, service) {
    this.nav = nav;
    this.http = http;
    this.service = service;
    this.address = "192.168.0.100";
    this.service.getValue("address").then((result) => {
      this.address = result;
  });
    this.downloadMatches();
  }

  downloadMatches() {
    this.http.get("https://"+this.address+":8443/api/getMatchesList/all").subscribe(data => {
      this.items = JSON.parse(data._body);
      if (typeof this.refresher != 'undefined') {
        this.refresher.complete();
      }
    }, error => {
      console.log("error receiving data");
      if (typeof this.refresher != 'undefined') {
        this.refresher.complete();
      }
    });
  }

  doAlert(bet, item) {
    let prompt = Alert.create({
      title: "Podaj adres",
      message: "Proszę podać swój adres odbiorczy Bitcoin, na który zostaną wypłacone wygrane środki",
      inputs: [
        {
          name: 'Adres',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Anuluj',
          handler: data => {
          }
        },
        {
          text: 'Dalej',
          handler: data => {
            this.nav.push(BetdetailsPage, { bet: bet, address: data.Adres, betObject: item });
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.downloadMatches();
  }

  goToSettings(){
    this.nav.push(SettingsPage);
  }

}
