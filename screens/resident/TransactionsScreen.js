import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, StyleSheet,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockTransactions } from '../../mock/data';
import TransactionRow from '../../components/TransactionRow';

export default function TransactionsScreen() {
  const [activeTab, setActiveTab] = useState('earned');

  const filtered = mockTransactions.filter((t) => t.type === activeTab);

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <View style={styles.toggleWrapper}>
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

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionRow transaction={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={styles.list}
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
  togglePill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9999,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  togglePillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textSecondary },
  toggleTextActive: { color: colors.secondary },
  list: { flex: 1, padding: 16, paddingBottom: 40 },
});
