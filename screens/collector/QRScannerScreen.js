import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Modal, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { mockCollectorBins } from '../../mock/data';
import ScanFrame from '../../components/ScanFrame';

const C = {
  primary: '#0D7A5F',
  accent:  '#00E5A0',
  error:   '#E53535',
  success: '#00C86A',
  warning: '#F5A623',
  textPri: '#0D1F1A',
  textSec: '#6B8C81',
  surface: '#FFFFFF',
  bg:      '#F4FAF7',
};

const nextFullBin = mockCollectorBins.find((b) => b.status === 'full') || mockCollectorBins[0];

// Steps: 'scan' → 'photo' → 'confirm'
export default function CollectorQRScannerScreen({ navigation }) {
  const [step, setStep]                     = useState('scan');   // 'scan' | 'photo' | 'confirm'
  const [photoCaptured, setPhotoCaptured]   = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const statusColor = nextFullBin.status === 'full' ? C.error : C.success;
  const statusLabel = nextFullBin.status === 'full' ? 'Full' : 'Collected';

  function handleSimulateScan() {
    setStep('photo');
  }

  function handleCapturePhoto() {
    setPhotoCaptured(true);
  }

  function handleRetakePhoto() {
    setPhotoCaptured(false);
  }

  function handlePhotoNext() {
    setStep('confirm');
    setConfirmVisible(true);
  }

  function handleConfirm() {
    setConfirmVisible(false);
    navigation.navigate('CollectionConfirmed', { bin: nextFullBin });
  }

  function handleCancel() {
    setStep('scan');
    setPhotoCaptured(false);
    setConfirmVisible(false);
    navigation.goBack();
  }

  return (
    <View style={styles.screen}>

      {/* ── Close button (always visible) ── */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* ══════════════ STEP 1 — QR SCAN ══════════════ */}
      {step === 'scan' && (
        <>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Confirm Collection</Text>
            <Text style={styles.subtitle}>
              Scan QR at {nextFullBin.name} · {nextFullBin.street}
            </Text>
          </View>

          <View style={styles.scanArea}>
            <ScanFrame />
          </View>

          <Text style={styles.helperText}>Align QR code within frame</Text>

          {/* Single centered scan button */}
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={handleSimulateScan}
            activeOpacity={0.85}
          >
            <Ionicons name="qr-code-outline" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ══════════════ STEP 2 — PHOTO CAPTURE ══════════════ */}
      {step === 'photo' && (
        <>
          {/* Bin info card shown after QR scan */}
          <View style={styles.binInfoCard}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <View style={styles.binInfoText}>
              <Text style={styles.binInfoName}>
                {nextFullBin.name} — {statusLabel}
              </Text>
              <Text style={styles.binInfoLocation}>
                {nextFullBin.street}, {nextFullBin.barangay}
              </Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={C.success} />
              <Text style={styles.verifiedText}>QR OK</Text>
            </View>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.title}>Take Bin Photo</Text>
            <Text style={styles.subtitle}>
              Photo required for verification
            </Text>
          </View>

          {/* Camera viewfinder / photo preview */}
          <View style={styles.cameraFrame}>
            {photoCaptured ? (
              /* Simulated captured photo */
              <View style={styles.capturedPhotoSim}>
                <Ionicons name="trash-outline" size={48} color="rgba(255,255,255,0.4)" />
                <Text style={styles.capturedLabel}>Photo captured</Text>
                <View style={styles.capturedCheckWrap}>
                  <Ionicons name="checkmark-circle" size={28} color={C.success} />
                </View>
              </View>
            ) : (
              /* Camera viewfinder placeholder */
              <View style={styles.cameraViewfinder}>
                {/* Corner brackets */}
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
                <Text style={styles.cameraHint}>Point camera at the bin</Text>
              </View>
            )}
          </View>

          {photoCaptured ? (
            /* After capture — retake or proceed */
            <View style={styles.photoActions}>
              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={handleRetakePhoto}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh-outline" size={18} color={C.textPri} />
                <Text style={styles.retakeBtnText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.usePhotoBtn}
                onPress={handlePhotoNext}
                activeOpacity={0.85}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={styles.usePhotoBtnText}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Shutter button */
            <TouchableOpacity
              style={styles.shutterBtn}
              onPress={handleCapturePhoto}
              activeOpacity={0.85}
            >
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ══════════════ STEP 3 — CONFIRM MODAL ══════════════ */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalStatusDot, { backgroundColor: statusColor }]} />
            <Text style={styles.modalTitle}>Confirm Collection?</Text>
            <Text style={styles.modalSub}>
              Mark{' '}
              <Text style={{ fontWeight: '700', color: C.textPri }}>
                {nextFullBin.name}
              </Text>{' '}
              on {nextFullBin.street} as collected?
            </Text>

            <View style={styles.modalMeta}>
              <MetaRow icon="location-outline" value={`${nextFullBin.street}, ${nextFullBin.barangay}`} />
              <MetaRow icon="person-outline"   value={`Reported by: ${nextFullBin.reportedBy}`} />
              <MetaRow icon="time-outline"     value={nextFullBin.timeReported} />
              <MetaRow icon="barcode-outline"  value={nextFullBin.id} />
            </View>

            {/* Photo thumbnail */}
            <View style={styles.photoThumb}>
              <Ionicons name="image-outline" size={20} color={C.textSec} />
              <Text style={styles.photoThumbText}>Verification photo attached</Text>
              <Ionicons name="checkmark-circle" size={18} color={C.success} />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => { setConfirmVisible(false); setStep('photo'); }}
              >
                <Text style={styles.modalCancelText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleConfirm}>
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function MetaRow({ icon, value }) {
  return (
    <View style={metaStyles.row}>
      <Ionicons name={icon} size={14} color={C.textSec} />
      <Text style={metaStyles.text}>{value}</Text>
    </View>
  );
}

const metaStyles = StyleSheet.create({
  row:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontSize: typography.size.xs, color: C.textSec, flex: 1 },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },

  // ── Close ──
  closeBtn: {
    position: 'absolute',
    top: 56,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 9999,
  },

  // ── Title ──
  titleArea: { alignItems: 'center', gap: 4, paddingHorizontal: 24 },
  title:     { color: '#fff', fontSize: typography.size.lg, fontWeight: typography.weight.bold, textAlign: 'center' },
  subtitle:  { color: 'rgba(255,255,255,0.55)', fontSize: typography.size.sm, textAlign: 'center' },

  // ── Step 1 — scan ──
  scanArea:   { alignItems: 'center' },
  helperText: { color: 'rgba(255,255,255,0.45)', fontSize: typography.size.sm },
  scanBtn: {
    width: 76,
    height: 76,
    borderRadius: 9999,
    backgroundColor: C.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },

  // ── Step 2 — photo ──
  binInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    width: '88%',
  },
  statusDot:       { width: 12, height: 12, borderRadius: 9999 },
  binInfoText:     { flex: 1, gap: 2 },
  binInfoName:     { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.sm },
  binInfoLocation: { color: 'rgba(255,255,255,0.55)', fontSize: typography.size.xs },
  verifiedBadge:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifiedText:    { fontSize: typography.size.xs, color: C.success, fontWeight: typography.weight.semibold },

  cameraFrame: {
    width: '88%',
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  cameraViewfinder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraHint: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  // Teal corner brackets
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: C.accent,
    borderWidth: 0,
  },
  cornerTL: { top: 16, left: 16, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 16, right: 16, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 16, left: 16, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 16, right: 16, borderBottomWidth: 3, borderRightWidth: 3 },

  capturedPhotoSim: {
    flex: 1,
    backgroundColor: '#1E3A30',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  capturedLabel: { color: 'rgba(255,255,255,0.6)', fontSize: typography.size.sm },
  capturedCheckWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  // Shutter
  shutterBtn: {
    width: 76,
    height: 76,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: '#fff',
  },

  // Photo action row
  photoActions: {
    flexDirection: 'row',
    gap: 12,
    width: '88%',
  },
  retakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingVertical: 13,
  },
  retakeBtnText:  { color: '#fff', fontWeight: typography.weight.semibold, fontSize: typography.size.sm },
  usePhotoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingVertical: 13,
  },
  usePhotoBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.sm },

  cancelText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: typography.size.sm,
    textDecorationLine: 'underline',
    paddingVertical: 4,
  },

  // ── Modal ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: C.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  modalStatusDot: { width: 16, height: 16, borderRadius: 9999 },
  modalTitle:     { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.textPri },
  modalSub:       { fontSize: typography.size.sm, color: C.textSec, textAlign: 'center', lineHeight: 20 },
  modalMeta:      { width: '100%', gap: 8, backgroundColor: C.bg, borderRadius: 10, padding: 12 },
  photoThumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: '#E6FFF4',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#B2EDD4',
  },
  photoThumbText: { flex: 1, fontSize: typography.size.xs, color: C.textSec },
  modalActions: { flexDirection: 'row', gap: 12, marginTop: 4, width: '100%' },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0DDD9',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  modalCancelText:  { fontSize: typography.size.base, color: C.textSec, fontWeight: typography.weight.medium },
  modalConfirmBtn:  { flex: 1, backgroundColor: C.primary, borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  modalConfirmText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.base },
});
