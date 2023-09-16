const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tsw_hris';
const CONNECT_WITH_NO_PRIMARY = false;

export = {
  native: {
    uri: MONGO_URI,
    connectWithNoPrimary: CONNECT_WITH_NO_PRIMARY
  }
};
