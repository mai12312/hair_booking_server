import multer from 'multer';

const storage = multer.diskStorage({
    // destination to save file
    destination: function (req, file, cb) {
        cb(null, './public/media')
    },
    //  filename
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

export const upload = multer({ storage: storage });
