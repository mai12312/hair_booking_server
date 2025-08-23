const Joi = require('joi');


// Validate data of schema
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validateUserSignUp = Joi.object({
    // firstname: Joi.string().max(50).required(),
    // lastname: Joi.string().max(50).required(),
    email: Joi.string().email(new RegExp(`${emailRegex}`)).min(3).max(30).required().messages({
        "string.pattern.base": "Email không hợp lệ",
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min" : "Mật khẩu phải dài hơn 8 ký tự",
        "string.empty": "Email không được để trống"
    }),
})

export const validateUserSignIn = Joi.object({
    email: Joi.string().email(new RegExp(`${emailRegex}`)).min(3).max(30).required().messages({
        "string.pattern.base": "Email không hợp lệ",
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Mật khẩu phải dài hơn 8 ký tự",
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu là bắt buộc"
    }),
})