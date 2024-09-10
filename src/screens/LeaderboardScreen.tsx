import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderboard } from '@/redux/leaderboardSlice';
import { RootState } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const top3Leaderboard = leaderboard.slice(0, 3); // Top 3 users
  const remainingLeaderboard = leaderboard.slice(3, 10); // Remaining 4-10 users

  return (
    <View style={styles.container}>
      {/* User Rank Banner */}
      <View style={styles.userRankContainer}>
        <Text style={styles.userRankText}>You're ranked #209!</Text>
        <Text style={styles.userPoints}>40 Points</Text>
        <Text style={styles.userMessage}>
          Play again and climb your way to the top!
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Top 3 Leaderboard */}
        <View style={styles.top3Container}>
          {top3Leaderboard.map((user, index) => {
            const rankColor = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? '#CD7F32' : 'transparent';
            
            return (
              <View key={index} style={styles.topUserContainer}>
                <MaterialCommunityIcons
                  name="crown"
                  size={24}
                  color={rankColor}
                />
                <Image
                  source={{ uri: user.image }}
                  style={[styles.topAvatar, { borderColor: rankColor }]}
                />
                <Text style={[styles.topRank, { color: rankColor }]}>{index + 1}</Text>
                <Text style={styles.topName}>{user.name}</Text>
                <Text style={styles.topPoints}>{user.points} Points</Text>
              </View>
            );
          })}
        </View>



        {/* Remaining Leaderboard */}
        {remainingLeaderboard.map((user, index) => (
          <View key={index + 3} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 4}</Text>
            </View>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.points}>{user.points} Points</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFBFC',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userRankContainer: {
    alignItems: 'center',
    backgroundColor: '#5BD1DE',
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    elevation: 3,
  },
  userRankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userPoints: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#37FD12',
    marginTop: 5,
  },
  userMessage: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  topUserContainer: {
    alignItems: 'center',
  },
  topAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3, // Adds the border
  },
  topRank: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  topName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topPoints: {
    fontSize: 14,
    color: '#888',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rankContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    color: '#888',
  },
});

export default LeaderboardScreen;
