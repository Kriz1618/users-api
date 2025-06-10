import 'module-alias/register';
import app from '@server/server';
import '@config/mongodb';
import { config } from '@config/config';
import { appLogger } from '@config/logger';

app.listen(config.port, () => {
  appLogger.info(`Server is running on port:${config.port}`);
});
