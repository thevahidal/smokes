import db from '..'
import { generateUUID } from '../../utils'

export const getUserQuery = (userId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`
                select * from users where id = '${userId}' limit 1
            `, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve(row)
            })
        })
    })
}


export const registerUserQuery = (name, email) => {
    return new Promise((resolve, reject) => {
        const id = generateUUID()

        db.serialize(() => {
            db.run(`
                insert into users (id, name, email) values ('${id}', '${name}', '${email}')
            `, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve(id)
            })
        })
    })
}