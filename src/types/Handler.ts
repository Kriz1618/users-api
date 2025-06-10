import { NextFunction, Request, Response } from 'express';

export type Handler = (req: Request, res: Response) => Promise<void>;

export type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
