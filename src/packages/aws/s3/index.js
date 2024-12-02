const {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectsCommand
} = require('@aws-sdk/client-s3');

const getClient = () => {
    return new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
};

const upload = async (body, contentType, path, options = {}) => {
    const s3 = getClient();

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

const removeFolder = async (folder) => {
    const s3 = getClient();

    async function recursiveDelete(token) {
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.AWS_S3_BUCKET,
            Prefix: folder,
            ContinuationToken: token
        });

        let list = await s3.send(listCommand);
        if (list.KeyCount) {
            const deleteCommand = new DeleteObjectsCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Delete: {
                    Objects: list.Contents.map((item) => ({ Key: item.Key })),
                    Quiet: false,
                },
            });
            let deleted = await s3.send(deleteCommand);
            
            if (deleted.Errors) {
                deleted.Errors.map((error) => console.log(`${error.Key} could not be deleted - ${error.Code}`));
            }
        }

        if (list.NextContinuationToken) {
            recursiveDelete(list.NextContinuationToken);
        }

        return `ok`;
    };
    
    return recursiveDelete();
};

module.exports = {
    uploadFile,
    uploadFileFromBase64,
    removeFolder,
};
