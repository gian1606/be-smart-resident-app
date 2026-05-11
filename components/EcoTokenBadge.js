import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function EcoTokenBadge({ balance, onViewRewards, variant = 'card' }) {
  if (variant === 'pill') {
    return (
      <View style={styles.pill}>
        <Ionicons name="leaf" size={14} color={colors.secondary} />
        <Text style={styles.pillText}>You have {balance.toLocaleString()} tokens</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Ionicons name="leaf-outline" size={28} color={colors.primary} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>Eco-Tokens</Text>
          <Text style={styles.cardBalance}>{balance.toLocaleString()}</Text>
        </View>
      </View>
      {onViewRewards && (
        <TouchableOpacity onPress={onViewRewards} activeOpacity={0.7}>
          <Text style={styles.cardLink}>View Rewards →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    gap: 6,
  },
  pillText: {
    color: colors.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  card: {
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardInfo: {
    gap: 2,
  },
  cardLabel: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  cardBalance: {
    fontSize: typography.size.xl,
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
  cardLink: {
    fontSize: typography.size.sm,
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});