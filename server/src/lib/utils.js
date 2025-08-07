import jwt from 'jsonwebtoken';


export const generateToken = (userID, res) => {
    const toket = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "24h"
    })

    res.cookie("jwt", toket, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return toket;
}