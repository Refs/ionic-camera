import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { LoadingController } from 'ionic-angular';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myphoto: any;

  constructor(
    public navCtrl: NavController,
    private camera : Camera,
    private filetransfer: FileTransfer,
    private file : File,
    private loadingCtrl: LoadingController
  ) {

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

  getImage () {
    const options : CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options)
        .then(
          (imageData) => {
            this.myphoto = 'data:image/jpeg;base64,' + imageData
          }
        )
        .catch(
          (err) => {
            console.log(err)
          }
        )
  }


  cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetHeight: 200,
      targetWidth: 200

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

  uploadImage() {

    // show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading picture ..."
    })
    loader.present();

    // create file transfer object
    const filetransfer: FileTransferObject = this.filetransfer.create();

    // random init
    var random = Math.floor(Math.random()*1000);

    // transfer option
    let options: FileUploadOptions = {
      fileKey: 'productImage',
      fileName: "myImage_" + random + '.jpg',
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: 'image/jpeg',
      params: {
        name : 'R7 plus',
        price: '1999'
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxoeDEwMTAzMzk4MDhAb3V0bG9vay5jb20iLCJ1c2VySWQiOiI1YWRlZDdiMjMyOTBmYzE3MzA1NzY1OTEiLCJpYXQiOjE1MjQ1NjA0MDMsImV4cCI6MTUyNDU2NDAwM30.2krI2ZV1sVwtZIIXZz6tkY5xS7_jrtNXIDdzsvgW99s'
      }
    }

    filetransfer.upload(this.myphoto, 'http://192.170.1.38:3000/products', options)
                .then(
                  (result) => {
                    alert('upload success!')
                    console.log(result);
                    loader.dismiss();
                  }
                )
                .catch(
                  (err) => {
                    alert('upload failed!');
                    console.log(err);
                    loader.dismiss();
                  }
                )

  console.log('uploading ...')



  }

}
