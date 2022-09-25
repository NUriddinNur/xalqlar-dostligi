import ApiError from '../error/ApiError.js'
import date from 'date-and-time'
import fs from 'fs'

export default function (err, req, res, next) {
    if (err instanceof ApiError ) {
        return res.status(err.status).json({status: err.status, message: err.message})
    }

    const now = new Date()
    const DataTime = date.format(now, 'YYYY/MM/DD HH:mm:ss')

    fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${DataTime}__${err.name}__${err.message}\n`)
    return res.status(500).json({ message: 'Unexpected error'})
}