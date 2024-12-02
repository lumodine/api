const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const upload = async (body, contentType, path, options = {}) => {
    const s3 = new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: path,
        Body: body,
        ContentType: contentType,
        ...options,
    });

    await s3.send(putObjectCommand);

    return `${process.env.CDN_URL}/${path}`;
};

const uploadFile = async (body, contentType, path) => {
    return await upload(body, contentType, path);
};

const uploadFileFromBase64 = async (base64, contentType, path) => {
    var body = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    return await upload(body, contentType, path, {
        ContentEncoding: 'base64',
    });
};

module.exports = {
    uploadFile,
    uploadFileFromBase64,
};
