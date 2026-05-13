import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ScrollView, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { mockCollectorUser, mockCollectorBins } from '../../mock/data';

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

// Next bin after the confirmed one
const nextBin = mockCollectorBins.find((b) => b.status === 'full' && b.id !== 'BIN-2024-A')
  || mockCollectorBins[0];

// Simple mini-map for the confirmed screen
function MiniMap({ confirmedBin }) {
  return (
    <View style={miniMapStyles.container}>
      <View style={miniMapStyles.routeLine} />
      {mockCollectorBins.map((bin) => {
        const isConfirmed = bin.id === confirmedBin?.id;
        const color = isConfirmed
          ? C.success
          : bin.status === 'full'
          ? C.error
          : bin.status === 'collected'
          ? C.success
          : C.warning;
        return (
          <View
            key={bin.id}
            style={[
              miniMapStyles.dot,
              {
                left: `${bin.posX * 100}%`,
                top:  `${bin.posY * 100}%`,
                backgroundColor: color,
                borderWidth: isConfirmed ? 2.5 : 1.5,
                borderColor: isConfirmed ? C.accent : '#fff',
                width: isConfirmed ? 20 : 14,
                height: isConfirmed ? 20 : 14,
                marginLeft: isConfirmed ? -10 : -7,
                marginTop:  isConfirmed ? -10 : -7,
              },
            ]}
          />
        );
      })}
      <TouchableOpacity style={miniMapStyles.satelliteBtn} activeOpacity={0.8}>
        <Text style={miniMapStyles.satelliteText}>Satellite</Text>
      </TouchableOpacity>
      <View style={miniMapStyles.zoomControls}>
        <TouchableOpacity style={miniMapStyles.zoomBtn}>
          <Text style={miniMapStyles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={miniMapStyles.zoomBtn}>
          <Text style={miniMapStyles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CollectionConfirmedScreen({ navigation, route }) {
  const bin = route?.params?.bin || mockCollectorBins[2];
  const [weightModalVisible, setWeightModalVisible] = useState(false);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <View style={styles.screen}>
      {/* Teal header bar */}
      <View style={styles.headerBar} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success icon */}
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={32} color="#6C63FF" />
          </View>
        </View>

        <Text style={styles.heading}>Garbage Collected!</Text>
        <Text style={styles.subheading}>
          <Text style={styles.binHighlight}>{bin.name}</Text> on {bin.street} has been marked as{' '}
          <Text style={styles.collectedHighlight}>COLLECTED.</Text>
        </Text>

        {/* Collection log card */}
        <View style={styles.logCard}>
          <View style={styles.logCardHeader}>
            <Text style={styles.logCardTitle}>Collection Log</Text>
            <View style={styles.recordedBadge}>
              <Text style={styles.recordedText}>Recorded</Text>
            </View>
          </View>
          <LogRow label="Bin ID"        value={bin.id} />
          <LogRow label="Location"      value={`${bin.street}, ${bin.barangay.replace('Brgy. Kumintang Ibaba', 'Brgy. K.I.')}`} />
          <LogRow label="Collected by"  value={mockCollectorUser.name} />
          <LogRow label="Time"          value={timeStr} />
          <View style={styles.logRow}>
            <Text style={styles.logLabel}>Status</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: C.success }]} />
              <Text style={styles.statusValue}>Collected</Text>
            </View>
          </View>
        </View>

        {/* Next bin banner */}
        <View style={styles.nextBinBanner}>
          <Ionicons name="navigate-outline" size={18} color={C.primary} />
          <View style={styles.nextBinInfo}>
            <Text style={styles.nextBinTitle}>Next: {nextBin.name} — {nextBin.street}</Text>
            <Text style={styles.nextBinSub}>1.2 km · ~5 min drive</Text>
          </View>
        </View>

        {/* Mini map */}
        <MiniMap confirmedBin={bin} />

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.viewRouteBtn}
            onPress={() => navigation.navigate('CollectorTabsMain')}
            activeOpacity={0.8}
          >
            <Text style={styles.viewRouteBtnText}>View Route</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBinBtn}
            onPress={() => navigation.navigate('CollectorQRScreen')}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBinBtnText}>Next Bin</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Weight input modal (triggered when all bins collected) */}
      <WeightInputModal
        visible={weightModalVisible}
        onClose={() => setWeightModalVisible(false)}
        onSubmit={() => {
          setWeightModalVisible(false);
          navigation.navigate('CollectorTabsMain');
        }}
        barangay={bin.barangay}
      />
    </View>
  );
}

function LogRow({ label, value }) {
  return (
    <View style={styles.logRow}>
      <Text style={styles.logLabel}>{label}</Text>
      <Text style={styles.logValue}>{value}</Text>
    </View>
  );
}

// ─── Weight Input Modal ───────────────────────────────────────────────────────
function WeightInputModal({ visible, onClose, onSubmit, barangay }) {
  const [display, setDisplay] = useState('0');
  const [error, setError]     = useState('');

  function handleKey(key) {
    setError('');
    if (key === '⌫') {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      return;
    }
    if (key === '.' && display.includes('.')) return;
    if (display === '0' && key !== '.') {
      setDisplay(key);
    } else {
      setDisplay((prev) => prev + key);
    }
  }

  function handleConfirm() {
    const val = parseFloat(display);
    if (!val || val < 0.1) {
      setError('Minimum weight is 0.1 kg');
      return;
    }
    if (val > 5000) {
      setError('Weight exceeds 5,000 kg. Please verify.');
      return;
    }
    onSubmit(val);
    setDisplay('0');
    setError('');
  }

  const keys = ['7','8','9','4','5','6','1','2','3','.','0','⌫'];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={wStyles.overlay}>
        <View style={wStyles.sheet}>
          <View style={wStyles.header}>
            <Text style={wStyles.title}>Input Collected Weight</Text>
            <Text style={wStyles.sub}>{barangay} · Route complete</Text>
          </View>

          {/* Display */}
          <View style={wStyles.displayBox}>
            <Text style={wStyles.displayText}>{display}</Text>
            <Text style={wStyles.displayUnit}>kg</Text>
          </View>

          {error ? <Text style={wStyles.errorText}>{error}</Text> : null}

          {/* Keypad */}
          <View style={wStyles.keypad}>
            {keys.map((k) => (
              <TouchableOpacity
                key={k}
                style={[wStyles.key, k === '⌫' && wStyles.keyBackspace]}
                onPress={() => handleKey(k)}
                activeOpacity={0.7}
              >
                <Text style={[wStyles.keyText, k === '⌫' && wStyles.keyBackspaceText]}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={wStyles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
            <Text style={wStyles.confirmBtnText}>Confirm Weight</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={wStyles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Mini map styles ──────────────────────────────────────────────────────────
const miniMapStyles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: '#D6EAE0',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  routeLine: {
    position: 'absolute',
    top: '45%',
    left: '8%',
    right: '8%',
    height: 2,
    backgroundColor: '#0D7A5F',
    opacity: 0.5,
  },
  dot: {
    position: 'absolute',
    borderRadius: 9999,
  },
  satelliteBtn: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  satelliteText: { fontSize: 11, color: '#0D1F1A', fontWeight: '600' },
  zoomControls: { position: 'absolute', bottom: 8, right: 8, gap: 3 },
  zoomBtn: {
    width: 26,
    height: 26,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: { fontSize: 16, color: '#0D1F1A', fontWeight: '600', lineHeight: 20 },
});

// ─── Weight modal styles ──────────────────────────────────────────────────────
const wStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    gap: 16,
    paddingBottom: 36,
  },
  header: { alignItems: 'center', gap: 4 },
  title: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.textPri },
  sub:   { fontSize: typography.size.xs, color: C.textSec },
  displayBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: C.bg,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#C8DDD7',
  },
  displayText: {
    fontSize: 48,
    fontWeight: '700',
    color: C.textPri,
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
  },
  displayUnit: { fontSize: typography.size.lg, color: C.textSec, marginBottom: 8 },
  errorText: {
    fontSize: typography.size.xs,
    color: C.error,
    textAlign: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 8,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  key: {
    width: '29%',
    aspectRatio: 1.6,
    backgroundColor: '#F0F5F3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8E8E2',
  },
  keyBackspace: { backgroundColor: '#FFE8E8', borderColor: '#FFCDD2' },
  keyText: { fontSize: typography.size.lg, fontWeight: typography.weight.semibold, color: C.textPri },
  keyBackspaceText: { color: C.error },
  confirmBtn: {
    backgroundColor: C.primary,
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.base },
  skipText: { textAlign: 'center', color: C.textSec, fontSize: typography.size.sm, paddingVertical: 4 },
});

// ─── Screen styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.surface },
  headerBar: { height: 56, backgroundColor: C.primary },
  content: { padding: 20, gap: 16, alignItems: 'center' },
  iconWrap: { marginTop: 8 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D4CCFF',
  },
  heading: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: C.textPri,
    textAlign: 'center',
  },
  subheading: {
    fontSize: typography.size.base,
    color: C.textSec,
    textAlign: 'center',
    lineHeight: 22,
  },
  binHighlight:       { fontWeight: typography.weight.bold, color: C.textPri },
  collectedHighlight: { fontWeight: typography.weight.bold, color: '#6C63FF' },
  logCard: {
    width: '100%',
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logCardTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: C.textPri },
  recordedBadge: {
    backgroundColor: '#E6F7F2',
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  recordedText: { fontSize: typography.size.xs, color: C.primary, fontWeight: typography.weight.semibold },
  logRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logLabel:  { fontSize: typography.size.sm, color: C.textSec, flexShrink: 0 },
  logValue:  { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: C.textPri, textAlign: 'right', flex: 1, marginLeft: 12 },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6, flex: 1, marginLeft: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 9999, flexShrink: 0 },
  statusValue: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: C.success },
  nextBinBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F2',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  nextBinInfo: { flex: 1, gap: 2 },
  nextBinTitle: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: C.primary },
  nextBinSub:   { fontSize: typography.size.xs, color: C.textSec },
  actionRow: { flexDirection: 'row', gap: 12, width: '100%' },
  viewRouteBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#C8DDD7',
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: C.surface,
  },
  viewRouteBtnText: { fontSize: typography.size.base, color: C.textPri, fontWeight: typography.weight.semibold },
  nextBinBtn: {
    flex: 1,
    backgroundColor: C.primary,
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextBinBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.base },
});
