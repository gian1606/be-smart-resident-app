import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockBuyerUser, mockMRFLocations, mockPartnerAds } from '../../mock/data';
import MRFMapCard from '../../components/MRFMapCard';
import AdCard from '../../components/AdCard';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>

      {/* Colored header banner */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {mockBuyerUser.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>Batangas City MRF Buyer</Text>
        </View>
        <View style={styles.bellWrapper}>
          <Ionicons name="notifications-outline" size={24} color={colors.secondary} />
          <View style={styles.bellDot} />
        </View>
      </View>

    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

      {/* MRF Map — shows only MRF icons and their status */}
      <MRFMapCard mrfLocations={mockMRFLocations} />

      {/* Make a Reservation action */}
      <TouchableOpacity
        style={styles.reservationCard}
        onPress={() => navigation.navigate('Reservations')}
        activeOpacity={0.85}
      >
        <View style={styles.reservationLeft}>
          <View style={styles.reservationIconWrapper}>
            <Ionicons name="calendar-outline" size={22} color={colors.secondary} />
          </View>
          <View style={styles.reservationInfo}>
            <Text style={styles.reservationLabel}>Reservations</Text>
            <Text style={styles.reservationCount}>
              {mockBuyerUser.completedReservations} completed
            </Text>
          </View>
        </View>
        <View style={styles.reservationAction}>
          <Text style={styles.reservationActionText}>Reserve</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.buyerPrimary} />
        </View>
      </TouchableOpacity>

      {/* Advertisement banner */}
      <Text style={styles.sectionLabel}>Partner Offers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockPartnerAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </ScrollView>

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.buyerPrimary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: 'rgba(255,255,255,0.75)',
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
    borderColor: colors.buyerPrimary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  reservationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reservationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reservationIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: colors.buyerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationInfo: {
    gap: 2,
  },
  reservationLabel: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  reservationCount: {
    fontSize: typography.size.lg,
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
  reservationAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.buyerLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  reservationActionText: {
    fontSize: typography.size.sm,
    color: colors.buyerPrimary,
    fontWeight: typography.weight.semibold,
  },
  sectionLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
});
