import { createLambda, post } from '@yotie/micron';
import cloudinary from 'cloudinary';
import multiparty from 'multiparty';

cloudinary.config({
    cloud_name: '',
    api_key: ,
    api_secret: ''
});


export default createLambda(
    post(({ req, ok, error }) => {
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
