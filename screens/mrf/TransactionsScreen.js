import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFTransactions, mockMRFUser } from '../../mock/data';
import MRFTransactionRow from '../../components/MRFTransactionRow';

const FILTER_TABS = ['All', 'Today', 'This Week'];

export default function TransactionsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = mockMRFTransactions.filter((t) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Today') return t.dateTime.startsWith('May 12');
    return true;
  });

  const totalTokensIssued = filtered.reduce((sum, t) => sum + t.tokensAwarded, 0);
  const totalResidents    = new Set(filtered.map((t) => t.residentId)).size;

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.title}>Token Transactions</Text>
        <Text style={styles.subtitle}>Tokens issued from {mockMRFUser.facility}</Text>

        <View style={styles.toggleRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.togglePill, activeTab === tab && styles.togglePillActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.toggleText, activeTab === tab && styles.toggleTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="leaf" size={16} color={colors.primary} />
            <Text style={styles.summaryValue}>{totalTokensIssued.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Tokens Issued</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="people-outline" size={16} color={colors.primary} />
            <Text style={styles.summaryValue}>{totalResidents}</Text>
            <Text style={styles.summaryLabel}>Residents</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="receipt-outline" size={16} color={colors.primary} />
            <Text style={styles.summaryValue}>{filtered.length}</Text>
            <Text style={styles.summaryLabel}>Transactions</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MRFTransactionRow transaction={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.secondary, padding: 20, paddingTop: 60, gap: 16, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: colors.cardBorder },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  subtitle: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: -8 },
  toggleRow: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: 9999, padding: 4, gap: 4 },
  togglePill: { flex: 1, paddingVertical: 8, borderRadius: 9999, alignItems: 'center' },
  togglePillActive: { backgroundColor: colors.primary },
  toggleText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textSecondary },
  toggleTextActive: { color: colors.secondary },
  summaryRow: { flexDirection: 'row', backgroundColor: colors.background, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.cardBorder },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryDivider: { width: 1, backgroundColor: colors.cardBorder, marginVertical: 4 },
  summaryValue: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.textPrimary },
  summaryLabel: { fontSize: typography.size.xs, color: colors.textSecondary, textAlign: 'center' },
  list: { padding: 16, paddingBottom: 40 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },
});
