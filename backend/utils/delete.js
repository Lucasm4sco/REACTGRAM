const path = require('path');
const fs = require('fs');

const deletePhotoByPatch = (pathImage) => {
    const image = path.join(__dirname, '..', '/uploads', pathImage)

    if (fs.existsSync(image))
        fs.unlink(image, (err) => {
            if (err) {
                console.error(err);
            }
        })
}

module.exports = deletePhotoByPatch