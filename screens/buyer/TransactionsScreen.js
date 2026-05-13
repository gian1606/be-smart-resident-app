import {
  View, Text, FlatList, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockBuyerTransactions, mockBuyerUser } from '../../mock/data';

function BuyerTransactionRow({ transaction }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name="business-outline" size={20} color={colors.buyerPrimary} />
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>{transaction.mrfName}</Text>
        <Text style={styles.rowMeta}>
          {transaction.material} · {transaction.weight}
        </Text>
        <Text style={styles.rowDate}>{transaction.dateTime}</Text>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.rowAmount}>{transaction.amount}</Text>
        <View style={styles.completedPill}>
          <Text style={styles.completedPillText}>Completed</Text>
        </View>
      </View>
    </View>
  );
}

export default function TransactionsScreen() {
  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      {/* Summary rows */}
      <View style={styles.summaryWrapper}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Purchases</Text>
            <Text style={styles.summaryValue}>{mockBuyerUser.totalPurchases}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={styles.summaryValue}>{mockBuyerUser.totalSpent}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryValue}>{mockBuyerTransactions.length} txns</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={mockBuyerTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BuyerTransactionRow transaction={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.buyerPrimary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.secondary,
  },
  summaryWrapper: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    flexShrink: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryDivider: { width: 1, backgroundColor: colors.cardBorder, marginVertical: 4 },
  summaryLabel: { fontSize: typography.size.xs, color: colors.textSecondary, textAlign: 'center' },
  summaryValue: { fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: colors.buyerPrimary, textAlign: 'center' },
  summaryIcon: {},
  flatList: { flex: 1 },
  list: { padding: 16, paddingBottom: 40, gap: 10 },
  row: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: colors.buyerLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowInfo: { flex: 1, gap: 2 },
  rowTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  rowMeta: { fontSize: typography.size.xs, color: colors.textSecondary },
  rowDate: { fontSize: typography.size.xs, color: colors.textMuted },
  rowRight: { alignItems: 'flex-end', gap: 4 },
  rowAmount: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  completedPill: {
    backgroundColor: colors.buyerLight,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedPillText: {
    fontSize: typography.size.xs,
    color: colors.buyerPrimary,
    fontWeight: typography.weight.semibold,
  },
  emptyState: { alignItems: 'center', gap: 12, paddingTop: 60 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },
});
