import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ic_bronze, ic_diamond, ic_gold, ic_platinum, ic_silver } from '../assets';
import { SCREEN_WIDTH } from '../styles/MainStyle';
import { colors } from '../styles/Colors';

// Icons cho các mức hạng
const icons = {
  bronze: ic_bronze,
  silver: ic_silver,
  gold: ic_gold,
  platinum: ic_platinum,
  diamond: ic_diamond,
};

const ranks = [
  { name: 'Hạng Đồng', icon: icons.bronze, minPoints: 0, maxPoints: 999 },
  { name: 'Hạng Bạc', icon: icons.silver, minPoints: 1000, maxPoints: 4999 },
  { name: 'Hạng Vàng', icon: icons.gold, minPoints: 5000, maxPoints: 9999 },
  { name: 'Bạch Kim', icon: icons.platinum, minPoints: 10000, maxPoints: Infinity },
  // { name: 'Kim Cương', icon: icons.diamond, minPoints: 10000, maxPoints: Infinity },
];

const getRankInfo = (points) => {
  return ranks?.find(rank => points >= rank?.minPoints && points <= rank?.maxPoints);
};

const RankProgress = ({ points }) => {
  const currentRankInfo = getRankInfo(points);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        {ranks?.map((rank, index) => {
          const isCurrentRank = rank?.name === currentRankInfo?.name;
          const isAchieved = points >= rank?.minPoints;
          let progress = 0;

          if (isAchieved) {
            if (isCurrentRank) {
              progress = (points - rank?.minPoints) / (rank?.maxPoints - rank?.minPoints);
            } else {
              progress = 1;
            }
          }

          return (
            <View key={index} style={styles.progressSegment}>
              <View style={[styles.progress, { width: `${progress * 100}%`, backgroundColor: isCurrentRank ? colors.MAIN_COLOR_CLIENT : '#3b82f6' }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.ranksContainer}>
        {ranks.map((rank, index) => {
          const isCurrentRank = rank?.name === currentRankInfo?.name;
          const iconSize = isCurrentRank ? styles.currentIcon : styles.icon;

          return (
            <View key={index} style={styles.rankItem}>
              <Image source={rank?.icon} style={iconSize} />
              <Text style={isCurrentRank ? styles.currentRankText : styles.rankText}>{rank?.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressSegment: {
    flex: 1,
    marginRight: 2,
  },
  progress: {
    height: '100%',
  },
  ranksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  rankItem: {
    alignItems: 'center',
  },
  icon: {
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_WIDTH * 0.06,
    marginBottom: 4,
  },
  currentIcon: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    marginBottom: 4,
  },
  rankText: {
    fontSize: 12,
    color: colors.MAIN_COLOR_CLIENT,
  },
  currentRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.MAIN_COLOR_CLIENT,
  },
});

export default RankProgress;
