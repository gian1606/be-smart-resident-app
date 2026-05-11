import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { mockTransactions } from '../mock/data';
import TransactionRow from '../components/TransactionRow';

export default function TransactionsScreen() {
  const [activeTab, setActiveTab] = useState('earned');

  const filtered = mockTransactions.filter((t) => t.type === activeTab);

  return (
    <View style={styles.screen}>

      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>

        {/* Toggle pills */}
        <View style={styles.toggleRow}>
          {['earned', 'redeemed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.togglePill, activeTab === tab && styles.togglePillActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.toggleText, activeTab === tab && styles.toggleTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Earned</Text>
            <Text style={[styles.summaryValue, { color: colors.primary }]}>1,560 tokens</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Redeemed</Text>
            <Text style={[styles.summaryValue, { color: colors.error }]}>320 tokens</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Net Balance</Text>
            <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>1,240 tokens</Text>
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.secondary,
    padding: 20,
    paddingTop: 60,
    gap: 18,
    paddingBottom: 40,
    borderBottomColor: colors.cardBorder,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 9999,
    padding: 4,
    gap: 4,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9999,
    alignItems: 'center',
  },
  togglePillActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.secondary,
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
});