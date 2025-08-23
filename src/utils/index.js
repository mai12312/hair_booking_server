
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
    const urlDev = process.env.DEV_URL + ":" + process.env.PORT;
    return process.env.NODE_ENV !== 'production' ? urlDev : ""
}