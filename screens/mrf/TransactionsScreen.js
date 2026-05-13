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
      </View>

      <View style={styles.toggleWrapper}>
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
  header: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.secondary },
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    flexShrink: 0,
  },
  togglePill: { flex: 1, paddingVertical: 9, borderRadius: 9999, alignItems: 'center', backgroundColor: colors.background, borderWidth: 1, borderColor: colors.cardBorder },
  togglePillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textSecondary },
  toggleTextActive: { color: colors.secondary },
  list: { padding: 16, paddingBottom: 40 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },
});
