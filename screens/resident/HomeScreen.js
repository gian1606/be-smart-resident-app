import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockUser, mockPartnerAds, mockMapData } from '../../mock/data';
import MapCard from '../../components/MapCard';
import EcoTokenBadge from '../../components/EcoTokenBadge';
import AdCard from '../../components/AdCard';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {mockUser.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>Batangas City Waste Tracker</Text>
        </View>
        <View style={styles.bellWrapper}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          <View style={styles.bellDot} />
        </View>
      </View>

      {/* Live Map */}
      <MapCard mapData={mockMapData} />

      {/* Eco Token Badge */}
      <EcoTokenBadge
        variant="card"
        balance={mockUser.ecoTokenBalance}
        onViewRewards={() => navigation.navigate('Rewards')}
      />

      {/* Partner Offers */}
      <Text style={styles.sectionLabel}>Partner Offers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockPartnerAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 18,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  bellWrapper: {
    position: 'relative',
  },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  sectionLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
});
