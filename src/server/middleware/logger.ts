import winston from 'winston';
import morgan from 'morgan';

const { format } = winston;
const { combine, timestamp, colorize } = format;

// logger
export const logger: any = winston.createLogger({
    level: 'info',
    format: combine(winston.format.json(), timestamp(), colorize()),
    defaultMeta: { service: 'ssr-react' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// custom logger method
logger.stream = {
    write: (message: any) => logger.info(message)
};

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

// accessLogger
export const accessLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: logger.stream
    }
);
