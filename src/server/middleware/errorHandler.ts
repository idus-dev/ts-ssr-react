import { logger } from './logger';

/* eslint-disable no-unused-vars */
export default (err: any, req: any, res: any, next: any) => {
    logger.error(err.message, err);
    res.status(500).send('someting went wrong from SERVER');
};
