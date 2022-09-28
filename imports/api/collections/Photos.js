import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

export const Photos = new Mongo.Collection('photos');

function uploadFile(file, extraFields, callbackFn) {
  const doc = {
    name: file.name,
    size: file.size,
    type: file.type,
    ...extraFields,
  };
  const uploader = new UploadFS.Uploader({
    store: 'photoStore',
    adaptive: true,
    capacity: 0.8, // 80%
    chunkSize: 8 * 1024, // 8k
    maxChunkSize: 128 * 1024, // 128k
    maxTries: 5,
    data: file,
    file: doc,
    onError(err, file) {
      alert(err);
      console.error(err);
    },
    onAbort(file) {
      console.log(file.name + ' upload has been aborted');
    },
    onComplete(file) {
      console.log(file.name + ' has been uploaded');
      callbackFn(file);
    },
    onCreate(file) {
      console.log(file.name + ' has been created with ID ' + file._id);
    },
    onProgress(file, progress) {
      console.log(file.name + ' ' + (progress*100) + '% uploaded');
    },
    onStart(file) {
      console.log(file.name + ' started');
    },
    onStop(file) {
      console.log(file.name + ' stopped');
    },
  });
  uploader.start();
}

Photos.upload = function upload(extraFields, callbackFn) {
  UploadFS.selectFiles(function (file) {
    uploadFile(file, extraFields, callbackFn);
  });
};
