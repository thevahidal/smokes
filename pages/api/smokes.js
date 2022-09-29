import { getAllPlatformSmokesCountQuery, getSmokesCountQuery, lightACigaretteQuery } from '../../db/queries/smokes';
import { authMiddleware } from '../../middlewares';

export default async function handler(req, res) {
  const { user, userCreated } = await authMiddleware(req);

  if (req.method === 'POST') {
    const query = await lightACigaretteQuery(user.id)
    res.status(200).json({ 
      message: 'Cigarette lit',
      data: {
        ...query,
        userId: user.id,
        userCreated,
        userCreatedAt: user.createdAt,
      }
    })
  } else if (req.method === 'GET') {
    const today = await getSmokesCountQuery(user.id, new Date().setHours(0, 0, 0, 0))
    const yesterday = await getSmokesCountQuery(user.id, new Date().setHours(0, 0, 0, 0) - 86400000, new Date().setHours(0, 0, 0, 0))
    // since the beginning of the user
    const total = await getSmokesCountQuery(user.id, user.createdAt)


    const allUsersToday = await getAllPlatformSmokesCountQuery(new Date().setHours(0, 0, 0, 0))
    const allUsersYesterday = await getAllPlatformSmokesCountQuery(new Date().setHours(0, 0, 0, 0) - 86400000, new Date().setHours(0, 0, 0, 0))
    
    res.status(200).json({
      message: 'Smokes count',
      data: {
        total: total.count,
        today: today.count,
        yesterday: yesterday.count,

        allUsersToday: allUsersToday.count,
        allUsersYesterday: allUsersYesterday.count,

        userId: user.id,
        userCreated,
        userCreatedAt: user.createdAt,
      }
    })
  }
}
