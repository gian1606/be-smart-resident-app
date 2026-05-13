import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Modal, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors'; // eslint-disable-line no-unused-vars
import { typography } from '../../theme/typography';
import {
  mockCollectorUser,
  mockCollectorBins,
  mockCollectorNotifications,
} from '../../mock/data';

const C = {
  primary:   '#0D7A5F',
  primaryLt: '#1A9E7A',
  primaryDk: '#095C47',
  accent:    '#00E5A0',
  bg:        '#F4FAF7',
  surface:   '#FFFFFF',
  textPri:   '#0D1F1A',
  textSec:   '#6B8C81',
  error:     '#E53535',
  success:   '#00C86A',
  warning:   '#F5A623',
};

function CollectorMapView({ bins }) {
  const statusColor = (s) => {
    if (s === 'full')      return C.error;
    if (s === 'collected') return C.success;
    return C.warning;
  };

  return (
    <View style={mapStyles.container}>
      <View style={mapStyles.routeLine} />

      {bins.map((bin) => (
        <View
          key={bin.id}
          style={[
            mapStyles.binMarker,
            {
              left: `${bin.posX * 100}%`,
              top:  `${bin.posY * 100}%`,
              backgroundColor: statusColor(bin.status),
            },
          ]}
        >
          <Ionicons name="trash-outline" size={12} color="#fff" />
        </View>
      ))}

      {/* Legend */}
      <View style={mapStyles.legend}>
        {[
          { color: C.error,   label: 'Full'      },
          { color: C.success, label: 'Collected' },
          { color: C.warning, label: 'Missed'    },
        ].map((item) => (
          <View key={item.label} style={mapStyles.legendRow}>
            <View style={[mapStyles.legendDot, { backgroundColor: item.color }]} />
            <Text style={mapStyles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Satellite toggle */}
      <TouchableOpacity style={mapStyles.satelliteBtn} activeOpacity={0.8}>
        <Text style={mapStyles.satelliteText}>Satellite</Text>
      </TouchableOpacity>

      {/* Zoom controls */}
      <View style={mapStyles.zoomControls}>
        <TouchableOpacity style={mapStyles.zoomBtn} activeOpacity={0.8}>
          <Text style={mapStyles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mapStyles.zoomBtn} activeOpacity={0.8}>
          <Text style={mapStyles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CollectorHomeScreen({ navigation }) {
  const [notifVisible, setNotifVisible] = useState(false);

  const fullBins      = mockCollectorBins.filter((b) => b.status === 'full').length;
  const collectedBins = mockCollectorBins.filter((b) => b.status === 'collected').length;
  const totalBins     = mockCollectorBins.length;
  const unreadCount   = mockCollectorNotifications.filter((n) => !n.read).length;

  return (
    <View style={styles.screen}>

      {/* ── Teal Header — bell only, no avatar ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerCaption}>Today's Route</Text>
          <Text style={styles.headerName}>
            {mockCollectorUser.name} · {mockCollectorUser.collectorId.split('-').pop()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => setNotifVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          {unreadCount > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Map (bigger) ── */}
        <CollectorMapView bins={mockCollectorBins} />

        {/* ── Route Banner (below map) ── */}
        <View style={styles.routeBanner}>
          <Ionicons name="navigate-outline" size={20} color={C.primary} />
          <View style={styles.routeInfo}>
            <Text style={styles.routeTitle}>Optimized Route Active</Text>
            <Text style={styles.routeSub}>
              {fullBins} bins to collect · Est. {fullBins * 15} mins
            </Text>
          </View>
          <TouchableOpacity style={styles.goBtn} activeOpacity={0.8}>
            <Text style={styles.goBtnText}>GO</Text>
          </TouchableOpacity>
        </View>

        {/* ── Progress strip ── */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Route Progress</Text>
            <Text style={styles.progressCount}>{collectedBins}/{totalBins} bins</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(collectedBins / totalBins) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* ── Bin list ── */}
        <Text style={styles.sectionLabel}>Bins on Route</Text>
        {mockCollectorBins.map((bin) => (
          <BinRow key={bin.id} bin={bin} />
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ── Notifications Modal ── */}
      <Modal visible={notifVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.notifSheet}>
            <View style={styles.notifHeader}>
              <Text style={styles.notifTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotifVisible(false)}>
                <Ionicons name="close" size={22} color={C.textPri} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockCollectorNotifications}
              keyExtractor={(n) => n.id}
              renderItem={({ item }) => <NotifRow notif={item} />}
              contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function BinRow({ bin }) {
  const statusColor =
    bin.status === 'full' ? C.error :
    bin.status === 'collected' ? C.success : C.warning;
  const statusLabel =
    bin.status === 'full' ? 'Full' :
    bin.status === 'collected' ? 'Collected' : 'Missed';

  return (
    <View style={binStyles.row}>
      <View style={[binStyles.dot, { backgroundColor: statusColor }]} />
      <View style={binStyles.info}>
        <Text style={binStyles.name}>{bin.name} — {bin.street}</Text>
        <Text style={binStyles.sub}>{bin.barangay}</Text>
      </View>
      <View style={[binStyles.badge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
        <Text style={[binStyles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
      </View>
    </View>
  );
}

function NotifRow({ notif }) {
  const iconMap = {
    task:     'alert-circle-outline',
    schedule: 'calendar-outline',
    complete: 'checkmark-circle-outline',
    report:   'document-text-outline',
  };
  return (
    <View style={[notifStyles.row, !notif.read && notifStyles.rowUnread]}>
      <View style={notifStyles.iconWrap}>
        <Ionicons name={iconMap[notif.type]} size={18} color={C.primary} />
      </View>
      <View style={notifStyles.body}>
        <Text style={notifStyles.title}>{notif.title}</Text>
        <Text style={notifStyles.text}>{notif.body}</Text>
        <Text style={notifStyles.time}>{notif.time}</Text>
      </View>
      {!notif.read && <View style={notifStyles.unreadDot} />}
    </View>
  );
}

// ─── Map styles ───────────────────────────────────────────────────────────────
const mapStyles = StyleSheet.create({
  container: {
    height: 300,           // bigger map
    backgroundColor: '#D6EAE0',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  routeLine: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: C.primary,
    opacity: 0.6,
  },
  binMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: -15,
    marginTop: -15,
  },
  legend: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    padding: 8,
    gap: 4,
  },
  legendRow:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot:  { width: 10, height: 10, borderRadius: 9999 },
  legendText: { fontSize: 11, color: C.textPri, fontWeight: '500' },
  satelliteBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  satelliteText: { fontSize: 12, color: C.textPri, fontWeight: '600' },
  zoomControls: { position: 'absolute', bottom: 10, right: 10, gap: 4 },
  zoomBtn: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: { fontSize: 18, color: C.textPri, fontWeight: '600', lineHeight: 22 },
});

// ─── Bin row styles ───────────────────────────────────────────────────────────
const binStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
  },
  dot:  { width: 12, height: 12, borderRadius: 9999 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: C.textPri },
  sub:  { fontSize: typography.size.xs, color: C.textSec },
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  badgeText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold },
});

// ─── Notif row styles ─────────────────────────────────────────────────────────
const notifStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
  },
  rowUnread: { borderColor: C.accent, backgroundColor: '#F0FDF8' },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    backgroundColor: '#E6F7F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body:      { flex: 1, gap: 2 },
  title:     { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: C.textPri },
  text:      { fontSize: typography.size.xs, color: C.textSec },
  time:      { fontSize: typography.size.xs, color: '#9BB5AC', marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 9999, backgroundColor: C.accent, marginTop: 4 },
});

// ─── Screen styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    backgroundColor: C.primary,
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerCaption: { fontSize: typography.size.xs, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  headerName:    { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: '#fff' },
  bellBtn: { position: 'relative', padding: 6 },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: C.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: C.primary,
  },
  bellBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },
  scroll:  { flex: 1 },
  content: { padding: 16, gap: 14 },
  routeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#B2D8C8',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  routeInfo:  { flex: 1, gap: 2 },
  routeTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: C.textPri },
  routeSub:   { fontSize: typography.size.xs, color: C.textSec },
  goBtn: {
    backgroundColor: C.primary,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  goBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.sm },
  progressCard: {
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E0EDE8',
  },
  progressRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel:   { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: C.textPri },
  progressCount:   { fontSize: typography.size.sm, color: C.textSec },
  progressBarBg:   { height: 8, backgroundColor: '#D6EAE0', borderRadius: 9999, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 9999 },
  sectionLabel: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: C.textPri,
    marginTop: 4,
  },
  ctaWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 28,
    backgroundColor: 'transparent',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: C.primary,
    borderRadius: 9999,
    paddingVertical: 16,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  ctaBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.base },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  notifSheet: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '75%',
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notifTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.textPri },
});
