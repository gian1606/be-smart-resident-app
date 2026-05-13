import { useState } from 'react';
import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockCollectorTransactions, mockCollectorUser } from '../../mock/data';

const C = {
  primary:  '#0D7A5F',
  accent:   '#00E5A0',
  bg:       '#F4FAF7',
  surface:  '#FFFFFF',
  textPri:  '#0D1F1A',
  textSec:  '#6B8C81',
  success:  '#00C86A',
  error:    '#E53535',
  warning:  '#F5A623',
};

const FILTER_TABS = ['All', 'Today', 'This Week'];

export default function CollectorTransactionsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = mockCollectorTransactions.filter((t) => {
    if (activeTab === 'Today')     return t.collectedAt.startsWith('May 13');
    if (activeTab === 'This Week') return true;
    return true;
  });

  const totalCollected = filtered.filter((t) => t.status === 'collected').length;
  const totalReported  = filtered.filter((t) => t.status === 'reported').length;
  const totalWeight    = filtered.reduce((sum, t) => sum + (t.weightKg || 0), 0);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Collection Log</Text>
        <Text style={styles.subtitle}>
          {mockCollectorUser.collectorId} · {mockCollectorUser.assignedBarangay}
        </Text>

        {/* Filter tabs */}
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

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <SummaryItem icon="checkmark-circle-outline" value={totalCollected} label="Collected" color={C.success} />
          <View style={styles.summaryDivider} />
          <SummaryItem icon="document-text-outline"   value={totalReported}  label="Reported"  color={C.primary} />
          <View style={styles.summaryDivider} />
          <SummaryItem icon="scale-outline"           value={`${totalWeight.toFixed(1)} kg`} label="Total Weight" color={C.primary} />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CollectionRow item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={40} color={C.textSec} />
            <Text style={styles.emptyText}>No collections found</Text>
          </View>
        }
      />
    </View>
  );
}

function SummaryItem({ icon, value, label, color }) {
  return (
    <View style={styles.summaryItem}>
      <Ionicons name={icon} size={16} color="rgba(255,255,255,0.8)" />
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function CollectionRow({ item }) {
  const isCollected = item.status === 'collected';
  const statusColor = isCollected ? C.success : C.primary;
  const statusLabel = isCollected ? 'Collected' : 'Reported';

  return (
    <View style={rowStyles.card}>
      <View style={[rowStyles.iconWrap, { backgroundColor: isCollected ? '#E6FFF4' : '#E6F7F2' }]}>
        <Ionicons
          name={isCollected ? 'checkmark-circle' : 'document-text-outline'}
          size={20}
          color={statusColor}
        />
      </View>
      <View style={rowStyles.info}>
        <Text style={rowStyles.binName}>{item.binName} — {item.street}</Text>
        <Text style={rowStyles.barangay}>{item.barangay}</Text>
        <Text style={rowStyles.time}>{item.collectedAt}</Text>
      </View>
      <View style={rowStyles.right}>
        <View style={[rowStyles.badge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
          <Text style={[rowStyles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
        {item.weightKg && (
          <Text style={rowStyles.weight}>{item.weightKg} kg</Text>
        )}
      </View>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    marginBottom: 10,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, gap: 2 },
  binName:  { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: C.textPri },
  barangay: { fontSize: typography.size.xs, color: C.textSec },
  time:     { fontSize: typography.size.xs, color: '#9BB5AC', marginTop: 2 },
  right: { alignItems: 'flex-end', gap: 4 },
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  badgeText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold },
  weight: { fontSize: typography.size.xs, color: C.textSec, fontWeight: typography.weight.medium },
});

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    backgroundColor: C.primary,
    padding: 20,
    paddingTop: 60,
    gap: 14,
    paddingBottom: 20,
  },
  title:    { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: '#fff' },
  subtitle: { fontSize: typography.size.sm, color: 'rgba(255,255,255,0.7)', marginTop: -8 },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 9999,
    padding: 4,
    gap: 4,
  },
  togglePill: { flex: 1, paddingVertical: 8, borderRadius: 9999, alignItems: 'center' },
  togglePillActive: { backgroundColor: '#fff' },
  toggleText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: 'rgba(255,255,255,0.7)' },
  toggleTextActive: { color: C.primary },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12,
    padding: 14,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 4 },
  summaryDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  summaryValue: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: '#fff' },
  summaryLabel: { fontSize: typography.size.xs, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  list: { padding: 16, paddingBottom: 40 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: typography.size.base, color: C.textSec },
});
