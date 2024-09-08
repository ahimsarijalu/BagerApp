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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {leaderboard.map((user, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>{index + 1}</Text>
              {index === 0 && (
                <MaterialCommunityIcons name="crown" size={24} color="gold" />
              )}
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
    paddingTop: 60,
    backgroundColor: '#E7F6F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
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
  icon: {
    marginTop: 5,
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
