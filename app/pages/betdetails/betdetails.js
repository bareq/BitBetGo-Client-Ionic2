import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {Clipboard, Toast} from 'ionic-native';

/*
  Generated class for the BetdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/betdetails/betdetails.html',
})
export class BetdetailsPage {
  static get parameters() {
    return [[NavController], [NavParams], [Http]];
  }

  constructor(nav, navParams, http) {
    this.nav = nav;
    this.navParams = navParams;
    this.http = http;

  }

  placeBet(bet, address, item) {
    this.http.post("https://192.168.0.100:8443/api/getAddress?match_id=" + item.id + "&bet=" + bet + "&player_address=" + address).subscribe(data => {
      this.betInfo = data._body;
      new QRCode(document.getElementById("qrcode"), this.betInfo);
    }, error => {
      Toast.show(error.status, 5000, "center").subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  onPageLoaded() {
    this.placeBet(this.navParams.get("bet"), this.navParams.get("address"), this.navParams.get("betObject"));
  }

  copyToClipboard() {
    Clipboard.copy(this.betInfo);
    Toast.show("Skopiowano adres do schowka", 5000, "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
