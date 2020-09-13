import { createLambda, post, match } from '@yotie/micron';
import cloudinary from 'cloudinary';
import multiparty from 'multiparty';

cloudinary.config({
    cloud_name: 'dtoxfmz86',
    api_key: 234177866619418,
    api_secret: 'e_Y2MlfDz62e8vZq0Yjmhf5qr1U'
});


export default createLambda(
    post(async ({ req, ok, error }) => {
        var form = new multiparty.Form();
        form.parse(req, (err, fields, files)=>{
             const path = files.upload[0].path
             const type = files.upload[0].headers['content-type']
             const typesImage = ['image/png','image/jpg','image/jpeg','image/gif','image/bmp','image/tiff']
            if(typesImage.includes(type)){
                cloudinary.uploader.upload(path, (err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        ok({success: true})
                    }
                })
            }else{
               ok('Choose image file')
            }
            
        })
         
    })
  );
