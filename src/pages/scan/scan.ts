import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerService } from "../../services/barcode.scanner.service";
import JsBarcode from 'jsbarcode';
import { Card } from "../../models/card";
import { Barcode } from "../../models/barcode";

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    card: Card;
    cardNumber: string;

    private barcodeOptions = null;

    constructor(public navCtrl: NavController, public params: NavParams, public barcodeService: BarcodeScannerService) {
        this.card = params.data;

        if (this.card && this.card.barcode && this.card.barcode.number) {
            this.cardNumber = this.card.barcode.number;
        }
    }

    ionViewWillEnter() {
        this.scanBarcode();
    }

    scanBarcode() {
        this.barcodeService.scanBarcode()
            .then((barcodeData) => {
                this.barcodeOptions = barcodeData.options;
                this.cardNumber = barcodeData.text;
                this.generateBarcode(barcodeData.text, barcodeData.options);
            })
            .catch(err => console.log);
    }

    cardNumberChanged(newCardNumber) {
        if (newCardNumber) {
            var defaultBarcodeOptions = {
                format: "UPC",
                flat: true
            };
            var options = this.barcodeOptions || defaultBarcodeOptions;

            this.generateBarcode(newCardNumber, options);
        }
    }

    generateBarcode(text, opt) {
        if (text && opt) {
            try {
                JsBarcode("#barcode", text, opt);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    save() {
        //todo: do an actual save
        this.navCtrl.pop();
    }

    cancel() {
        this.navCtrl.pop();
    }
}