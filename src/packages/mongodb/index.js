const mongoose = require('mongoose');

const connect = async (url) => {
    try {
        await mongoose.connect(url);

        console.log('MongoDB Connected.');
     } catch (error) {
        console.log('MongoDB Error:', error);
     }
};

module.exports = {
    mongoose,
    connect,
};
