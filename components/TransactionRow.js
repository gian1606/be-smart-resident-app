import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function TransactionRow({ transaction }) {
  const isEarned = transaction.type === 'earned';

  return (
    <View style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: isEarned ? colors.successLight : '#FFF3E0' }]}>
        <Ionicons
          name={isEarned ? 'leaf' : 'gift'}
          size={18}
          color={isEarned ? colors.primary : colors.warning}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.meta}>{transaction.dateTime}</Text>
        <Text style={styles.meta}>{transaction.description}</Text>
      </View>
      <Text style={[styles.amount, { color: isEarned ? colors.primary : colors.error }]}>
        {isEarned ? '+' : '−'}{transaction.amount} tokens
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  meta: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
  amount: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },
});