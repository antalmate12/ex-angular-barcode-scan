/// <reference types="w3c-web-usb" />

import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'barcode-scanner',
  templateUrl: './scan-barcode.component.html',
  styleUrls: ['./scan-barcode.component.css'],
})
export class ScanBarcodeComponent implements OnInit {
  barcode: string = '';
  values: string[] = [];
  constructor() {}

  ngOnInit(): void {
    navigator.usb.addEventListener('connect', (event) => {
      console.log('USB device CONNECTED');
      console.log(event);
    });

    navigator.usb.addEventListener('disconnect', (event) => {
      console.log('USB device DISCONNECTED');
      console.log(event);
    });
  }

  onKey(event: any) {
    console.log('EVENT!!!!!!!!!!!!!!' + JSON.stringify(event));
    this.barcode = event.target.value;
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    console.log(event);
  }

  async getUSBDevices(): Promise<void> {
    let devices = await navigator.usb.getDevices();
    let device: USBDevice = await navigator.usb.requestDevice({
      filters: [],
    } as USBDeviceRequestOptions);

    if (!device) return;

    console.log('device', device);

    await device.open();

    if (device.configuration === null) {
      await device.selectConfiguration(1);
    } else {
      await device.claimInterface(0);
    }

    let result = await device.transferIn(1, 64);
    console.log('result', result);

    debugger;

    let decoder = new TextDecoder();
    console.log('decoder', decoder);

    debugger;

    let data = decoder.decode(result.data);
    console.log('data', data);

    debugger;

    // const setup: USBControlTransferParameters = {
    //   requestType: 'class',
    //   recipient: 'interface',
    //   request: 1,
    //   value: 1,
    //   index: 1,
    // };
    // const result = await device.controlTransferIn(setup, 1);
    // console.log(result);
    // debugger;

    // Get all connected USB devices the website has been granted access to.
    // @ts-ignore

    // devices.forEach((device) => {
    //   console.log(device.productName); // "Arduino Micro"
    //   console.log(device.manufacturerName); // "Arduino LLC"
    // });
  }
}
// declare global {
//   interface Navigator {
//     usb: {
//       requestDevice(): any;
//       getDevices(): any[];
//     };
//   }
// }
