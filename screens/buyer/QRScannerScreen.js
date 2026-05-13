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

  function handleScanComplete() {
    setModalVisible(true);
  }

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
        <Text style={styles.subInstruction}>
          Scan the QR code at the MRF facility to complete your transaction
        </Text>
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>Complete Transaction</Text>
        <Text style={styles.sheetSubtitle}>
          Point your camera at the QR code posted at the MRF entrance to finalize your reservation.
        </Text>
        <TouchableOpacity
          style={styles.simulateBtn}
          onPress={handleScanComplete}
          activeOpacity={0.8}
        >
          <Ionicons name="qr-code-outline" size={18} color={colors.secondary} />
          <Text style={styles.simulateBtnText}>Simulate Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Success modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle" size={56} color={colors.buyerPrimary} />
            <Text style={styles.modalTitle}>Transaction Complete!</Text>
            <Text style={styles.modalSubtitle}>
              Your reservation has been fulfilled. The transaction has been recorded successfully.
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
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 9999,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingBottom: 60,
  },
  instruction: {
    color: colors.secondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    textAlign: 'center',
  },
  subInstruction: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: typography.size.sm,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bottomSheet: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 12,
  },
  sheetTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  sheetSubtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  simulateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.buyerPrimary,
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 4,
  },
  simulateBtnText: {
    color: colors.secondary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.base,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalBtn: {
    backgroundColor: colors.buyerPrimary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 8,
  },
  modalBtnText: {
    color: colors.secondary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.base,
  },
});
