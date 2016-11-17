import {Injectable} from "@angular/core";
import {SqlStorage, Storage} from 'ionic-angular';

@Injectable()
export class SettingsService {
    constructor() {
        this.storage = new Storage(SqlStorage, {name: "bitbetgodata"});
    }

    getValue(key) {
        return this.storage.get(key);
    }

    elo(){
        console.log("elo");
    }

    setValue(key, value) {
        this.storage.set(key, value);
    }
}