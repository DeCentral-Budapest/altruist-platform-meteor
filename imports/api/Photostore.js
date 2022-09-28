import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { GridFSStore } from 'meteor/jalik:ufs-gridfs';
import { UploadFS } from 'meteor/jalik:ufs';
import { Photos } from '../api/collections/Photos.js';

export const PhotoStore = new GridFSStore({
  collection: Photos,
  name: 'photoStore',
  chunkSize: 1024 * 255,
  filter: new UploadFS.Filter({
    contentTypes: ['image/*'],
    maxSize: 2000000, // 2MB,
  }),
});

PhotoStore.setPermissions(new UploadFS.StorePermissions({
  insert(userId, doc) {
    return !!userId;
  },
  update(userId, doc) {
    return !!userId;
  },
  remove(userId, doc) {
    return !!userId;
  },
}));
