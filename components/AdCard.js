import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function AdCard({ ad }) {
  return (
    <View style={styles.card}>
      <View style={[styles.imagePlaceholder, { backgroundColor: ad.placeholderColor }]}>
        <Text style={styles.partnerInitial}>{ad.partner[0]}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.partnerName}>{ad.partner}</Text>
        <Text style={styles.tagline}>{ad.tagline}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Eco Partner</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerInitial: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    opacity: 0.4,
  },
  cardBody: {
    padding: 10,
    gap: 3,
  },
  partnerName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  tagline: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
  badge: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.successLight,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});