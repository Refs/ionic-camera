import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myphoto: any;

  constructor(public navCtrl: NavController, private camera : Camera) {

  }

  openCamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
        .then(
          (imageData) => {
            this.myphoto = 'data:image/jpeg;base64,' + imageData
          }
        )
        .catch(
          (err) => {
            console.log(err);
          }
        )

  }

}
