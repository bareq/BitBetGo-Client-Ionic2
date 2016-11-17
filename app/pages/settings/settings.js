import {Page, NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {SettingsService} from '../../services/settings.service';

@
Page({
    templateUrl: 'build/pages/settings/settings.html',
    providers: [SettingsService]
})
export class SettingsPage {

    static get parameters() {
        return [[NavController], [Http], [SettingsService]];
    }

    constructor(nav, http, service) {
        this.nav = nav;
        this.http = http;
        this.service = service;
        this.port = 8080;
        this.setFields();

    }

    setFields() {
        this.service.getValue("address").then((result) => {
                this.ipAddress = result;
            });
        this.service.getValue("port").then((result) => {
            this.port = result;
    });
    }

    ionViewWillLeave() {
        console.log("Looks like I'm about to leave :(");
    }

    ionViewDidLoad() {
        console.log("I'm alive!");
    }

    save(){
        this.service.setValue("address", this.ipAddress);
        this.service.setValue("port", this.port);
    }


}
