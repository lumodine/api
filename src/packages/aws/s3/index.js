const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const uploadFile = async (body, contentType, path, options = {}) => {
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

    return {
        url: `${process.env.CDN_URL}/${path}`,
    };
};

module.exports = {
    uploadFile,
};
