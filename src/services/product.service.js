import { Types } from "mongoose";
import { ProductModel } from "../models/Products.model";
import createError from "http-errors";
import { MysqlQuery } from "../utils/mysql.query.util";

const {findAll} = new MysqlQuery();
export class ProductService {
    /**
     * 
     */
    async addProduct(data) {
        await ProductModel.create(data);
    }

    /**
     * 
     */
    async deleteProduct(productId) {
        await ProductModel.deleteOne({_id: productId});
    }

    /**
     * Get one category
     */
    async getOneProduct(data) {
        const products = await ProductModel.findOne({_id: data.id}).lean();
        if(!products) {
            throw createError.Conflict("Get all products failed!")
        };
        return products;
    }

    /**
     * Get all categories
     */
    async getAllProducts() {
        const products = await ProductModel.find({}, {"__v": 0}).lean();
        if(!products) throw createError.Conflict("Get All Product error!");
        return products;
    }
    /**
     * update product
     */
    async updateProduct(product, productId) {
        const updateSet = {
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            productionDate: product.productionDate,
            price: {
                current: {
                    value: Number(product.price.current.value),
                    text: String(product.price.current.text)
                }
            },
            genre: "",
            brandName: product.brandName,
            imageUrl: product.imageUrl,
            additionalImageUrls: product.additionalImageUrls 
        }
        const options = {upsert: true, new: true};
        await ProductModel.updateOne({_id: productId}, {$set: updateSet}, options);
    }

    async getAllProductsMysql() {
        const data = await findAll("products");
        if(!data) throw new Error("No products found!") ;
        return data;
    }
}