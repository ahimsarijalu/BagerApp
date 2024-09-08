import { createSlice } from '@reduxjs/toolkit';
import { dummyLeaderboard } from '../constants/dummy_leaderboard';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: [],
  reducers: {
    fetchLeaderboard: (state) => {
        return dummyLeaderboard
        .sort((a, b) => b.points - a.points) // Sort by points
        .slice(0, 10); // Take only the top 10 users
    },
  },
});

export const { fetchLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
