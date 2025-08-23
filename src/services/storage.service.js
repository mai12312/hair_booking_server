
export class StorageService {
    async uploadImage(file) {
        if (file.fieldname !== "thumbnail") throw new Error("Image not found!")
        return file.filename;
    }
}