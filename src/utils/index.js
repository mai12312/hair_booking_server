
export const formartOneIdDataMongoDb= (data) => {
    const {_id, ...rest} = data;
    return {id: data._id, ...rest}
}

export const formartIdResponseDataMongoDb = (data) => {
    if(Array.isArray(data)) {
        return data.map((item) => formartOneIdDataMongoDb(item));
    }
    return formartOneIdDataMongoDb(data);
}

export const getUrl = () => {
    const url = process.env.APP_HOST;
    if(!url) {
        throw new Error("APP_HOST chưa được định nghĩa");
    }
    return url;
}