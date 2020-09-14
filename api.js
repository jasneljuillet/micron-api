import { createLambda, post, match } from '@yotie/micron';
import cloudinary from 'cloudinary';
import multiparty from 'multiparty';

cloudinary.config({
    cloud_name: '',
    api_key: ,
    api_secret: ''
});

export default createLambda(
  post(async ({ req, ok, error }) => {
    const form = new multiparty.Form();
    const getForm = await form.parse(req, (err, fields, files) => {
      const typesImage = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/bmp",
        "image/tiff",
      ];
      if (typesImage.includes(files.upload[0].headers["content-type"])) {
        const uploader = cloudinary.v2.uploader.upload(
          files.upload[0].path,
          { folder: "niouz/images/", use_filename: true },
          (err, result) => {
            if (err) {
              error(err);
            } else {
              ok({ success: true });
            }
          }
        );
      }
    });
  })
);
