import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function RewardCard({ reward, onRedeem }) {
  return (
    <View style={styles.card}>
      <View style={[styles.imagePlaceholder, { backgroundColor: reward.placeholderColor }]}>
        <Text style={styles.partnerInitial}>{reward.partner[0]}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={2}>{reward.name}</Text>
        <View style={styles.costRow}>
          <Ionicons name="leaf" size={12} color={colors.primary} />
          <Text style={styles.cost}>{reward.tokenCost.toLocaleString()} tokens</Text>
        </View>
        <TouchableOpacity
          style={styles.redeemBtn}
          onPress={() => onRedeem(reward.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.redeemText}>Redeem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerInitial: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    opacity: 0.3,
  },
  cardBody: {
    padding: 10,
    gap: 6,
  },
  name: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cost: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontWeight: typography.weight.medium,
  },
  redeemBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 2,
  },
  redeemText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});