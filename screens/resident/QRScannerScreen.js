import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import ScanFrame from '../../components/ScanFrame';

export default function QRScannerScreen() {
  const [flashOn, setFlashOn]           = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportType, setReportType]     = useState('');

  function handleReport(type) {
    setReportType(type);
    setModalVisible(true);
  }

  const tokensEarned = reportType === 'full' ? 50 : 20;

  return (
    <View style={styles.screen}>

      {/* Flash toggle */}
      <TouchableOpacity
        style={styles.flashBtn}
        onPress={() => setFlashOn(!flashOn)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={flashOn ? 'flash' : 'flash-off'}
          size={24}
          color={colors.secondary}
        />
      </TouchableOpacity>

      {/* Scan area */}
      <View style={styles.scanArea}>
        <ScanFrame />
        <Text style={styles.instruction}>Align QR code within the frame</Text>
        <Text style={styles.subInstruction}>Scan the bin's QR code to report its status</Text>
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>Report Bin Status</Text>
        <View style={styles.sheetButtons}>
          <TouchableOpacity
            style={styles.fullBtn}
            onPress={() => handleReport('full')}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={20} color={colors.error} />
            <Text style={styles.fullBtnText}>Bin is FULL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.okBtn}
            onPress={() => handleReport('ok')}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.okBtnText}>Bin is OK</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bonusNote}>You'll earn bonus tokens for full bin reports!</Text>
      </View>

      {/* Success modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={56} color={colors.primary} />
            <Text style={styles.modalTitle}>Report Submitted!</Text>
            <Text style={styles.modalSubtitle}>
              You earned{' '}
              <Text style={{ color: colors.primary, fontWeight: typography.weight.bold }}>
                +{tokensEarned} tokens
              </Text>{' '}
              for this report.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1A1A1A' },
  flashBtn: {
    position: 'absolute', top: 56, right: 20, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 9999,
  },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, paddingBottom: 60 },
  instruction: { color: colors.secondary, fontSize: typography.size.base, fontWeight: typography.weight.semibold, textAlign: 'center' },
  subInstruction: { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.sm, textAlign: 'center', paddingHorizontal: 40 },
  bottomSheet: { backgroundColor: colors.secondary, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 16 },
  sheetTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary, textAlign: 'center' },
  sheetButtons: { flexDirection: 'row', gap: 12 },
  fullBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: colors.error, borderRadius: 10, paddingVertical: 14 },
  fullBtnText: { color: colors.error, fontWeight: typography.weight.semibold, fontSize: typography.size.sm },
  okBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: colors.primary, borderRadius: 10, paddingVertical: 14 },
  okBtnText: { color: colors.primary, fontWeight: typography.weight.semibold, fontSize: typography.size.sm },
  bonusNote: { fontSize: typography.size.xs, color: colors.textSecondary, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: colors.secondary, borderRadius: 18, padding: 28, width: '100%', alignItems: 'center', gap: 12 },
  modalTitle: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  modalSubtitle: { fontSize: typography.size.base, color: colors.textSecondary, textAlign: 'center' },
  modalBtn: { backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 40, marginTop: 8 },
  modalBtnText: { color: colors.secondary, fontWeight: typography.weight.bold, fontSize: typography.size.base },
});
