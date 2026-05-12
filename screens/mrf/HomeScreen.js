import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFUser, mockMRFLocations, mockPartnerAds } from '../../mock/data';
import MRFMapCard from '../../components/MRFMapCard';
import AdCard from '../../components/AdCard';

export default function HomeScreen() {
  const availableCount = mockMRFLocations.filter((m) => m.status === 'available').length;
  const fullCount      = mockMRFLocations.filter((m) => m.status === 'full').length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {mockMRFUser.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>{mockMRFUser.facility}</Text>
        </View>
        <View style={styles.bellWrapper}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          <View style={styles.bellDot} />
        </View>
      </View>

      {/* Quick stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="scan-outline" size={20} color={colors.primary} />
          <Text style={styles.statValue}>{mockMRFUser.scansToday}</Text>
          <Text style={styles.statLabel}>Scans Today</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="people-outline" size={20} color={colors.primary} />
          <Text style={styles.statValue}>{mockMRFUser.residentsServed}</Text>
          <Text style={styles.statLabel}>Residents Served</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="leaf-outline" size={20} color={colors.primary} />
          <Text style={styles.statValue}>{mockMRFUser.tokensIssued.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Tokens Issued</Text>
        </View>
      </View>

      {/* MRF status summary */}
      <View style={styles.statusBar}>
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
          <Text style={styles.statusText}>{availableCount} MRF Available</Text>
        </View>
        <View style={styles.statusDivider} />
        <View style={styles.statusItem}>
          <View style={[styles.statusDot, { backgroundColor: colors.error }]} />
          <Text style={styles.statusText}>{fullCount} MRF Full</Text>
        </View>
      </View>

      {/* MRF Map */}
      <MRFMapCard mrfLocations={mockMRFLocations} />

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
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 60, gap: 18, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  subtitle: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: 2 },
  bellWrapper: { position: 'relative' },
  bellDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 9999, backgroundColor: colors.accent, borderWidth: 1, borderColor: colors.secondary },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.secondary, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  statValue: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary },
  statLabel: { fontSize: typography.size.xs, color: colors.textSecondary, textAlign: 'center' },
  statusBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.cardBorder, gap: 12 },
  statusItem: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'center' },
  statusDot: { width: 10, height: 10, borderRadius: 9999 },
  statusText: { fontSize: typography.size.sm, color: colors.textPrimary, fontWeight: typography.weight.medium },
  statusDivider: { width: 1, height: 18, backgroundColor: colors.cardBorder },
  sectionLabel: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.textPrimary },
});
