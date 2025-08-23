import { StorageService } from "../services/storage.service";
import { getUrl } from "../utils";

const storageService = new StorageService();

export class StorageController {
    /**
     * Add image
     */
    async uploadImage(req, res, next) {
        try{
            const url = getUrl();
            const filename = await storageService.uploadImage(req.file);
            return res.json({
                status: 201,
                messsage: "Upload image success!",
                data: {
                    imageUrl: `${url}/images/${filename}`
                }
            });
        } catch (error) {
            next(error);
        }
    }
    /**
     * Add image
     */
    async getImage(req, res, next) {
        try{
            // req.headers.referer = "no-referrer";
            // req.headers["sec-fetch-site"] = "none";
            // console.log(req.headers);
            const {filename} = req.params;
            return res.sendFile("img/" + filename, {root: "public"});
        } catch (error) {
            next(error);
        }
    }
}
