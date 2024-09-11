import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaderboard } from '@/redux/leaderboardSlice';
import { RootState } from '../redux/store';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const top3Leaderboard = leaderboard.length >= 3 
  ? [leaderboard[1], leaderboard[0], leaderboard[2]] 
  : [];
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
            // Adjust podium heights: 1st in the middle is highest, 2nd on left, 3rd on right
            const podiumHeight = index === 1 ? 220 : index === 0 ? 180 : 140; // Left podium (2nd), Middle podium (1st), Right podium (3rd)
            const rankColor = index === 1 ? 'gold' : index === 0 ? 'silver' : '#CD7F32';

            return (
              <LinearGradient
                key={index}
                colors={['#5BD1DE', '#5BD1DE', 'white']}
                locations={[0, 0.7, 1]}
                style={[styles.top3ContainerUpper, { height: podiumHeight }]}
              >
                <View style={{ alignItems: 'center', position: 'absolute', top: -90 }}>
                  <MaterialCommunityIcons
                    name="crown"
                    size={30}
                    color={rankColor}
                    style={{ marginBottom: 5 }}
                  />
                  <Image
                    source={{ uri: user.image }}
                    style={[styles.topAvatar, { borderColor: rankColor }]}
                  />
                  <Text style={styles.topName}>{user.name}</Text>
                  <Text style={styles.topPoints}>{user.points} Points</Text>
                </View>

                {/* Rank Number (centered in the podium) */}
                <Text style={[styles.topRank, { top: podiumHeight / 2 - 16 }]}>
                  {index === 1 ? 1 : index === 0 ? 2 : 3}
                </Text>
              </LinearGradient>
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
    paddingHorizontal: 10, // Responsive padding for mobile
  },
  scrollView: {
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
    color: '#ffffff',
    marginTop: 5,
  },
  userMessage: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    textAlign: 'center', // Ensure readability on all screens
  },
  top3Container: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Ensure podiums are spaced evenly
    alignItems: 'flex-end',
    height: 250,
    marginTop: 50,
  },
  top3ContainerUpper: {
    width: '28%',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginBottom: 5,
  },
  topName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 3,
  },
  topPoints: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 50
  },
  topRank: {
    fontSize: 50,
    fontWeight: 'bold',
    position: 'absolute',
    color: 'white',
    marginTop: 20
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
