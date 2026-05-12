import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import ScanFrame from '../../components/ScanFrame';

const mockScannedResident = {
  name: 'Juan Dela Cruz',
  id: 'user-001',
  barangay: 'Brgy. Kumintang Ibaba',
};

const WASTE_TYPES = [
  { label: 'Recyclables', tokensPerKg: 20, icon: 'refresh-circle-outline' },
  { label: 'Biodegradable', tokensPerKg: 18, icon: 'leaf-outline' },
  { label: 'Special Waste', tokensPerKg: 50, icon: 'warning-outline' },
];

export default function QRScannerScreen() {
  const [flashOn, setFlashOn]               = useState(false);
  const [scanned, setScanned]               = useState(false);
  const [selectedWaste, setSelectedWaste]   = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  function handleScan() {
    setScanned(true);
    setSelectedWaste(null);
  }

  function handleIssueTokens() {
    if (!selectedWaste) return;
    setConfirmVisible(true);
  }

  function confirmIssue() {
    setConfirmVisible(false);
    setSuccessVisible(true);
  }

  function handleDone() {
    setSuccessVisible(false);
    setScanned(false);
    setSelectedWaste(null);
  }

  const tokensToAward = selectedWaste ? selectedWaste.tokensPerKg * 2 : 0;

  return (
    <View style={styles.screen}>

      <TouchableOpacity
        style={styles.flashBtn}
        onPress={() => setFlashOn(!flashOn)}
        activeOpacity={0.7}
      >
        <Ionicons name={flashOn ? 'flash' : 'flash-off'} size={24} color={colors.secondary} />
      </TouchableOpacity>

      <View style={styles.scanArea}>
        <ScanFrame />
        <Text style={styles.instruction}>Scan Resident QR Code</Text>
        <Text style={styles.subInstruction}>
          Align the resident's QR code within the frame to issue eco-tokens
        </Text>
        {!scanned && (
          <TouchableOpacity style={styles.simulateBtn} onPress={handleScan} activeOpacity={0.8}>
            <Ionicons name="qr-code-outline" size={16} color={colors.secondary} />
            <Text style={styles.simulateBtnText}>Simulate Scan</Text>
          </TouchableOpacity>
        )}
      </View>

      {scanned && (
        <View style={styles.bottomSheet}>
          <View style={styles.residentCard}>
            <View style={styles.residentAvatar}>
              <Text style={styles.residentAvatarText}>
                {mockScannedResident.name.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.residentInfo}>
              <Text style={styles.residentName}>{mockScannedResident.name}</Text>
              <Text style={styles.residentBarangay}>{mockScannedResident.barangay}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          <Text style={styles.sheetLabel}>Select Waste Type</Text>
          <View style={styles.wasteOptions}>
            {WASTE_TYPES.map((type) => {
              const isSelected = selectedWaste?.label === type.label;
              return (
                <TouchableOpacity
                  key={type.label}
                  style={[styles.wasteOption, isSelected && styles.wasteOptionSelected]}
                  onPress={() => setSelectedWaste(type)}
                  activeOpacity={0.7}
                >
                  <Ionicons name={type.icon} size={18} color={isSelected ? colors.secondary : colors.textSecondary} />
                  <Text style={[styles.wasteOptionText, isSelected && styles.wasteOptionTextSelected]}>
                    {type.label}
                  </Text>
                  <Text style={[styles.wasteRate, isSelected && styles.wasteRateSelected]}>
                    {type.tokensPerKg} tkn/kg
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.issueBtn, !selectedWaste && styles.issueBtnDisabled]}
            onPress={handleIssueTokens}
            activeOpacity={0.8}
            disabled={!selectedWaste}
          >
            <Ionicons name="leaf" size={18} color={colors.secondary} />
            <Text style={styles.issueBtnText}>
              Issue {tokensToAward > 0 ? `${tokensToAward} ` : ''}Tokens
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScanned(false)} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel — Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Confirm modal */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Issue Tokens?</Text>
            <Text style={styles.modalSubtitle}>You are about to issue tokens to:</Text>
            <Text style={styles.modalHighlight}>{mockScannedResident.name}</Text>
            <View style={styles.modalTokenRow}>
              <Ionicons name="leaf" size={20} color={colors.primary} />
              <Text style={styles.modalTokenAmount}>+{tokensToAward} tokens</Text>
            </View>
            <Text style={styles.modalMeta}>{selectedWaste?.label}</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setConfirmVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={confirmIssue}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success modal */}
      <Modal visible={successVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={56} color={colors.primary} />
            <Text style={styles.modalTitle}>Tokens Issued!</Text>
            <Text style={styles.modalSubtitle}>
              Successfully awarded{' '}
              <Text style={{ color: colors.primary, fontWeight: typography.weight.bold }}>
                +{tokensToAward} tokens
              </Text>{' '}
              to {mockScannedResident.name}.
            </Text>
            <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleDone}>
              <Text style={styles.modalConfirmText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1A1A1A' },
  flashBtn: { position: 'absolute', top: 56, right: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 9999 },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, paddingBottom: 40 },
  instruction: { color: colors.secondary, fontSize: typography.size.base, fontWeight: typography.weight.semibold, textAlign: 'center' },
  subInstruction: { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.sm, textAlign: 'center', paddingHorizontal: 40 },
  simulateBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, marginTop: 8 },
  simulateBtnText: { color: colors.secondary, fontWeight: typography.weight.semibold, fontSize: typography.size.sm },
  bottomSheet: { backgroundColor: colors.secondary, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 14 },
  residentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.successLight, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#A5D6A7', gap: 12 },
  residentAvatar: { width: 44, height: 44, borderRadius: 9999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  residentAvatarText: { color: colors.secondary, fontWeight: typography.weight.bold, fontSize: typography.size.base },
  residentInfo: { flex: 1, gap: 2 },
  residentName: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  residentBarangay: { fontSize: typography.size.xs, color: colors.textSecondary },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifiedText: { fontSize: typography.size.xs, color: colors.primary, fontWeight: typography.weight.semibold },
  sheetLabel: { fontSize: typography.size.base, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  wasteOptions: { gap: 8 },
  wasteOption: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderColor: colors.cardBorder, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.background },
  wasteOptionSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  wasteOptionText: { flex: 1, fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: colors.textPrimary },
  wasteOptionTextSelected: { color: colors.secondary },
  wasteRate: { fontSize: typography.size.xs, color: colors.textMuted },
  wasteRateSelected: { color: 'rgba(255,255,255,0.8)' },
  issueBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 14, marginTop: 4 },
  issueBtnDisabled: { backgroundColor: colors.textMuted },
  issueBtnText: { color: colors.secondary, fontWeight: typography.weight.bold, fontSize: typography.size.base },
  cancelText: { textAlign: 'center', fontSize: typography.size.sm, color: colors.textSecondary, paddingVertical: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: colors.secondary, borderRadius: 18, padding: 28, width: '100%', alignItems: 'center', gap: 12 },
  modalTitle: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  modalSubtitle: { fontSize: typography.size.base, color: colors.textSecondary, textAlign: 'center' },
  modalHighlight: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.textPrimary },
  modalTokenRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  modalTokenAmount: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.primary },
  modalMeta: { fontSize: typography.size.sm, color: colors.textSecondary },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 8, width: '100%' },
  modalCancelBtn: { flex: 1, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  modalCancelText: { fontSize: typography.size.base, color: colors.textSecondary, fontWeight: typography.weight.medium },
  modalConfirmBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  modalConfirmText: { color: colors.secondary, fontWeight: typography.weight.bold, fontSize: typography.size.base },
});
