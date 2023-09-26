
const jwtmiddleware = require('./jwtmiddleware');

const User = require('../models/User');



const showleaderboard = async (req, res) => {
  try {
    const { jwttoken } = req.body;
    const jwttokendecoded = jwtmiddleware.jwt_decode(jwttoken);
    const userid = jwttokendecoded.userId;

    const leaderboardData = await User.findAll({
      attributes: ['name', 'totalexpense'],
    });

    if (!leaderboardData) {
      console.error('No leaderboard data found');
      return res.status(404).json({ error: 'No leaderboard data found' });
    }

    return res.status(200).json({ leaderboardData });
  } catch (error) {
    console.error('Error fetching leaderboard data: ', error);
    return res.status(500).json({ error: 'Error fetching leaderboard data' });
  }
};



module.exports = {
  showleaderboard,

}