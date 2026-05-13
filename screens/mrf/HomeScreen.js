import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFUser, mockMRFLocations, mockPartnerAds } from '../../mock/data';
import MRFMapCard from '../../components/MRFMapCard';
import AdCard from '../../components/AdCard';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>

      {/* Colored header banner */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {mockMRFUser.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>{mockMRFUser.facility}</Text>
        </View>
        <View style={styles.bellWrapper}>
          <Ionicons name="notifications-outline" size={24} color={colors.secondary} />
          <View style={styles.bellDot} />
        </View>
      </View>

    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  greeting: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.secondary },
  subtitle: { fontSize: typography.size.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  bellWrapper: { position: 'relative' },
  bellDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 9999, backgroundColor: colors.accent, borderWidth: 1, borderColor: colors.primary },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 18, paddingBottom: 40 },
  sectionLabel: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.textPrimary },
});
