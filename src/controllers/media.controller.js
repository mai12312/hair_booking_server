import { MediaService } from "../services/media.service";
import { getUrl } from "../utils";
import fs from "fs";
import path from "path";

const mediaService = new MediaService();

export class MediaController {
    /**
     * Add image
     */
    async uploadImage(req, res, next) {
        try{
            const url = getUrl();
            const filename = await mediaService.uploadImage(req.file);
            console.log("filename", filename);
            return res.json({
                status: 201,
                messsage: "Upload hình ảnh thành công!",
                datas: {
                    imageUrl: `${url}/api/media/${filename}`
                }
            });
        } catch (error) {
            next(error);
        }
    }
    /**
     * get image
     */
    async getImage(req, res, next) {
        try{
            const { filename } = req.params;
            return res.sendFile("media/" + filename, {root: "public"});
        } catch (error) {
            next(error);
        }
    }
    /**
     * get getAllImages
     */
    async getAllImages(req, res, next) {
        try {
            const url = getUrl();
            const mediaDir = path.join(process.cwd(), "public", "media");
            console.log("mediaDir", mediaDir);
            let files = [];
            if (fs.existsSync(mediaDir)) {
                files = fs.readdirSync(mediaDir)
                    .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
                    .map(file => `${url}/api/media/${file}`);
            }
            console.log("files", files);
            return res.json({
                status: 200,
                message: "Lấy danh sách hình ảnh thành công!",
                images: files
            });
        } catch (error) {
            next(error);
        }
    }
}
