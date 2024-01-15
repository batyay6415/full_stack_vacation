import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";
import session from 'express-session';


interface ExtendedRequest extends Request {
    session: session.Session;
}


declare module 'express-session' {
    interface SessionData {
        userId?: string; // Add your custom properties here
    }
}

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

   

// Extend Request type to include express-session types


    try {

           // בדיקה אם יש משתמש מחובר
           if (request.session && request.session.userId) {
            // אם כן, מפנה לדף ראשי או לנתיב אחר
            return response.redirect('/vacations');
        }

        await cyber.verifyToken(request);
        next();

        
    }
    catch(err: any){
        next(err);
    }
}

export default verifyLoggedIn;