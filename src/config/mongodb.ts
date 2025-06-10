import mongoose from 'mongoose';
import { appLogger } from './logger';
import { config } from './config';

export default (async () => {
  try {
    await mongoose.connect(config.mongoDbUrl);
    appLogger.info('Mongodb Connected!!!');
  } catch (error) {
    appLogger.error('error :>> ', error);
    process.exit(1);
  }
})();
