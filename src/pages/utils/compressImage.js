import EXIF from 'exif-js';

export const compressImage = (file) => {

    return new Promise((resolve, reject) => {

        EXIF.getData(file, function() {
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const image = new Image();
                image.onload = function() {

                    const width = 600;
                    const height = width / image.width * image.height;
                    let canvas = document.createElement('canvas');
                    const quality = .8;
                    let ctx = canvas.getContext('2d');

                    canvas.width = width;
                    canvas.height = height;

                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(image, 0, 0, width, height);

                    let data = canvas.toDataURL('image/jpeg', quality);
                    ctx = canvas = null;

                    resolve([data, image.src, width / height]);
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        });
    });
}
