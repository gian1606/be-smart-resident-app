import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { mockCollectorUser } from '../../mock/data';

const C = {
  primary:  '#0D7A5F',
  primaryLt:'#1A9E7A',
  accent:   '#00E5A0',
  bg:       '#F4FAF7',
  surface:  '#FFFFFF',
  textPri:  '#0D1F1A',
  textSec:  '#6B8C81',
  success:  '#00C86A',
  error:    '#E53535',
  warning:  '#F5A623',
};

export default function CollectorProfileScreen({ setIsAuthenticated }) {
  const truckPct = Math.round(
    (mockCollectorUser.totalCollectedKg / mockCollectorUser.truckCapacityKg) * 100
  );
  const truckBarColor =
    truckPct >= 90 ? C.error : truckPct >= 70 ? C.warning : C.success;

  const infoItems = [
    { icon: 'card-outline',     label: 'Collector ID', value: mockCollectorUser.collectorId },
    { icon: 'mail-outline',     label: 'Email',        value: mockCollectorUser.email },
    { icon: 'call-outline',     label: 'Phone',        value: mockCollectorUser.phone },
    { icon: 'location-outline', label: 'Zone',         value: mockCollectorUser.zone },
    { icon: 'home-outline',     label: 'Barangay',     value: mockCollectorUser.assignedBarangay },
  ];

  const settingsItems = [
    { icon: 'lock-closed-outline',       label: 'Change Password' },
    { icon: 'notifications-outline',     label: 'Notification Settings' },
    { icon: 'language-outline',          label: 'Language', value: 'English' },
    { icon: 'information-circle-outline',label: 'About BE-SMART' },
    { icon: 'help-circle-outline',       label: 'Help & Support' },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{mockCollectorUser.initials}</Text>
        </View>
        <Text style={styles.name}>{mockCollectorUser.name}</Text>
        <View style={styles.roleBadge}>
          <Ionicons name="car-outline" size={12} color={C.primary} />
          <Text style={styles.roleText}>Garbage Collector</Text>
        </View>
        <Text style={styles.memberSince}>Since {mockCollectorUser.memberSince}</Text>
      </View>

      {/* Shift stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Bins Today',   value: mockCollectorUser.binsCollectedToday },
          { label: 'Shifts Done',  value: mockCollectorUser.shiftsCompleted },
          { label: 'Total kg',     value: `${mockCollectorUser.totalCollectedKg}` },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Truck capacity tracker */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="car-outline" size={16} color={C.primary} />
          <Text style={styles.sectionTitle}>Truck Capacity</Text>
          <Text style={styles.truckPct}>{truckPct}%</Text>
        </View>
        <View style={styles.truckBarBg}>
          <View
            style={[
              styles.truckBarFill,
              { width: `${truckPct}%`, backgroundColor: truckBarColor },
            ]}
          />
        </View>
        <Text style={styles.truckLabel}>
          {mockCollectorUser.totalCollectedKg} kg / {mockCollectorUser.truckCapacityKg} kg
        </Text>
      </View>

      {/* Personal info */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={16} color={C.primary} />
          </TouchableOpacity>
        </View>
        {infoItems.map((item) => (
          <View key={item.label} style={styles.infoRow}>
            <Ionicons name={item.icon} size={16} color={C.textSec} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.sectionCard}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.settingsRow,
              index < settingsItems.length - 1 && styles.settingsRowBorder,
            ]}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon} size={16} color={C.textSec} />
            <Text style={styles.settingsLabel}>{item.label}</Text>
            <View style={styles.settingsRight}>
              {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={14} color={C.textSec} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => setIsAuthenticated(false, null)}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={18} color={C.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:   { flex: 1, backgroundColor: C.bg },
  content:  { padding: 20, paddingTop: 60, gap: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: C.primary,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText:   { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: '#fff' },
  name:         { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: '#fff' },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  roleText:     { fontSize: typography.size.xs, color: '#fff', fontWeight: typography.weight.semibold },
  memberSince:  { fontSize: typography.size.xs, color: 'rgba(255,255,255,0.65)' },
  statsRow:     { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.primary },
  statLabel: { fontSize: typography.size.xs, color: C.textSec, textAlign: 'center' },
  sectionCard: {
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: C.textPri,
  },
  truckPct: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: C.primary },
  truckBarBg: {
    height: 10,
    backgroundColor: '#D6EAE0',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  truckBarFill: { height: '100%', borderRadius: 9999 },
  truckLabel: { fontSize: typography.size.xs, color: C.textSec, textAlign: 'right' },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoContent: { flex: 1, gap: 2 },
  infoLabel: { fontSize: typography.size.xs, color: C.textSec },
  infoValue: { fontSize: typography.size.sm, color: C.textPri, fontWeight: typography.weight.medium },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0EDE8',
    paddingBottom: 14,
  },
  settingsLabel: {
    flex: 1,
    fontSize: typography.size.sm,
    color: C.textPri,
    fontWeight: typography.weight.medium,
  },
  settingsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingsValue: { fontSize: typography.size.xs, color: C.textSec },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: C.error,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: C.surface,
  },
  logoutText: { color: C.error, fontSize: typography.size.base, fontWeight: typography.weight.semibold },
});
