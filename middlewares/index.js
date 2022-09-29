import { getUserQuery, registerUserQuery } from "../db/queries/users";


export const authMiddleware = async (req) => {
    const { authorization } = req.headers;
    let user = null
    let userCreated = false

    try {
        const [_, userId] = authorization.split(' ');
        user = await getUserQuery(userId);

        if (!user) {
            throw new Error('User not found')
        }
    } catch (e) {
        const userId = await registerUserQuery()
        user = await getUserQuery(userId)
        userCreated = true
    }

    req.user = user
    req.userCreated = userCreated

    return req
}