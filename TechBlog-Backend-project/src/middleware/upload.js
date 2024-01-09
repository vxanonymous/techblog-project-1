const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

const storage = new GridFsStorage({
    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.oxwca.mongodb.net/techblog?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg", "image.jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "images",
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
