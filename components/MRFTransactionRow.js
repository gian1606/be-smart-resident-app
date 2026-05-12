import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function MRFTransactionRow({ transaction }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name="leaf" size={18} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.residentName}>{transaction.residentName}</Text>
        <Text style={styles.meta}>{transaction.wasteType} · {transaction.weight}</Text>
        <Text style={styles.meta}>{transaction.dateTime}</Text>
      </View>
      <View style={styles.tokenBadge}>
        <Ionicons name="leaf" size={11} color={colors.primary} />
        <Text style={styles.tokenText}>+{transaction.tokensAwarded}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.cardBorder, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  iconCircle: { width: 40, height: 40, borderRadius: 9999, backgroundColor: colors.successLight, justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, gap: 2 },
  residentName: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  meta: { fontSize: typography.size.xs, color: colors.textSecondary },
  tokenBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.successLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, borderWidth: 1, borderColor: '#A5D6A7' },
  tokenText: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.primary },
});
