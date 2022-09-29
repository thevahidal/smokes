import db from '..'

export const lightACigaretteQuery = (userId) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`
                insert into smokes (userId) values ('${userId}')
            `, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve(row)
            })
        })
    })
}

export const getSmokesCountQuery = (userId, from, to) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`
                select count(*) as count from smokes where userId = '${userId}' and createdAt between '${from}' and '${to}'
            `, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve(row)
            })
        })
    })
}

export const getAllPlatformSmokesCountQuery = (from, to) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(`
                select count(*) as count from smokes where createdAt between '${from}' and '${to}'
            `, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve(row)
            })
        })
    })
}