import {Request, Response, NextFunction} from 'express';

export const validatorSignup = (req: Request, res: Response, next: NextFunction) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must contain from 3 to 32 characters").matches(/.+\@.+\..+/)
                .withMessage("Email is wrong").isLength({min: 4, max:100});

    req.check("password", "La contraseña es requirida").notEmpty();
    req.check("password").isLength({min: 6}).withMessage("Password must contain more than 6 characters")
                        .matches(/\d/).withMessage("Password must contain a number");

    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error: { msg: string; }) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
        next();
}

