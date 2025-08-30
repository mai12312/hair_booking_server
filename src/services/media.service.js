
export class MediaService {
    async uploadImage(file) {
        if (file.fieldname !== "image") throw new Error("Hình ảnh không tồn tại!")
        return file.filename;
    }
}