import { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, StyleSheet, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFLocations, mockMRFReservations } from '../../mock/data';

const fullMRFs = mockMRFLocations.filter((m) => m.status === 'full');

function MRFAvailableCard({ mrf, onReserve }) {
  return (
    <View style={styles.availableCard}>
      <View style={styles.availableLeft}>
        <View style={styles.mrfIconWrapper}>
          <Ionicons name="business" size={20} color={colors.secondary} />
        </View>
        <View style={styles.availableInfo}>
          <Text style={styles.availableName}>{mrf.name}</Text>
          <Text style={styles.availableBarangay}>{mrf.barangay}</Text>
          <View style={styles.fullBadge}>
            <View style={styles.fullDot} />
            <Text style={styles.fullBadgeText}>Ready for pickup</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.reserveBtn}
        onPress={() => onReserve(mrf)}
        activeOpacity={0.8}
      >
        <Text style={styles.reserveBtnText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
}

function ReservationRow({ reservation }) {
  const isPending = reservation.status === 'pending';
  return (
    <View style={styles.reservationRow}>
      <View style={[styles.reservationIcon, { backgroundColor: isPending ? '#FFF3E0' : colors.buyerLight }]}>
        <Ionicons
          name={isPending ? 'time-outline' : 'checkmark-circle-outline'}
          size={20}
          color={isPending ? colors.warning : colors.buyerPrimary}
        />
      </View>
      <View style={styles.reservationInfo}>
        <Text style={styles.reservationName}>{reservation.mrfName}</Text>
        <Text style={styles.reservationMeta}>
          {reservation.material} · {reservation.weight}
        </Text>
        <Text style={styles.reservationDate}>{reservation.dateTime}</Text>
      </View>
      <View style={styles.reservationRight}>
        <Text style={styles.reservationAmount}>{reservation.amount}</Text>
        <View style={[styles.statusPill, { backgroundColor: isPending ? '#FFF3E0' : colors.buyerLight }]}>
          <Text style={[styles.statusPillText, { color: isPending ? colors.warning : colors.buyerPrimary }]}>
            {isPending ? 'Pending' : 'Done'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ReservationsScreen() {
  const [activeTab, setActiveTab]       = useState('available');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMRF, setSelectedMRF]   = useState(null);
  const [confirmed, setConfirmed]       = useState(false);

  const myReservations = mockMRFReservations;

  function handleReserve(mrf) {
    setSelectedMRF(mrf);
    setConfirmed(false);
    setModalVisible(true);
  }

  function confirmReservation() {
    setConfirmed(true);
  }

  return (
    <View style={styles.screen}>

      {/* Slim blue header — title only */}
      <View style={styles.header}>
        <Text style={styles.title}>Reservations</Text>
      </View>

      {/* Toggle pills — sticky below header */}
      <View style={styles.toggleWrapper}>
        {[
          { key: 'available', label: 'Full MRFs' },
          { key: 'mine',      label: 'My Reservations' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.togglePill, activeTab === tab.key && styles.togglePillActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.toggleText, activeTab === tab.key && styles.toggleTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'available' ? (
        <FlatList
          data={fullMRFs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MRFAvailableCard mrf={item} onReserve={handleReserve} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>No full MRFs at the moment</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={myReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReservationRow reservation={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>No reservations yet</Text>
            </View>
          }
        />
      )}

      {/* Reservation confirmation modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {confirmed ? (
              <>
                <Ionicons name="checkmark-circle" size={56} color={colors.buyerPrimary} />
                <Text style={styles.modalTitle}>Reservation Confirmed!</Text>
                <Text style={styles.modalSubtitle}>
                  Your reservation at{' '}
                  <Text style={{ fontWeight: typography.weight.bold, color: colors.textPrimary }}>
                    {selectedMRF?.name}
                  </Text>{' '}
                  has been submitted. Scan the QR code at the facility to complete the transaction.
                </Text>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => { setModalVisible(false); setConfirmed(false); }}
                >
                  <Text style={styles.modalBtnText}>Done</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Reserve MRF?</Text>
                <View style={styles.modalMRFInfo}>
                  <View style={styles.modalMRFIcon}>
                    <Ionicons name="business" size={24} color={colors.secondary} />
                  </View>
                  <View style={{ gap: 2 }}>
                    <Text style={styles.modalMRFName}>{selectedMRF?.name}</Text>
                    <Text style={styles.modalMRFBarangay}>{selectedMRF?.barangay}</Text>
                  </View>
                </View>
                <Text style={styles.modalSubtitle}>
                  This MRF is currently full and ready for material pickup. Confirm your reservation to proceed.
                </Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBtn} onPress={confirmReservation}>
                    <Text style={styles.modalBtnText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },

  // Slim blue header
  header: {
    backgroundColor: colors.buyerPrimary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.secondary,
  },

  // Sticky toggle below header
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
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
  togglePillActive: {
    backgroundColor: colors.buyerPrimary,
    borderColor: colors.buyerPrimary,
  },
  toggleText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  toggleTextActive: { color: colors.secondary },

  list: { padding: 16, paddingBottom: 40, gap: 12 },

  // Available MRF card
  availableCard: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  availableLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  mrfIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableInfo: { gap: 3, flex: 1 },
  availableName: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  availableBarangay: { fontSize: typography.size.xs, color: colors.textSecondary },
  fullBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  fullDot: { width: 6, height: 6, borderRadius: 9999, backgroundColor: colors.error },
  fullBadgeText: { fontSize: typography.size.xs, color: colors.error, fontWeight: typography.weight.semibold },
  reserveBtn: {
    backgroundColor: colors.buyerPrimary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  reserveBtnText: {
    color: colors.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },

  // Reservation row
  reservationRow: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  reservationIcon: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationInfo: { flex: 1, gap: 2 },
  reservationName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  reservationMeta: { fontSize: typography.size.xs, color: colors.textSecondary },
  reservationDate: { fontSize: typography.size.xs, color: colors.textMuted },
  reservationRight: { alignItems: 'flex-end', gap: 4 },
  reservationAmount: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  statusPill: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusPillText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold },

  // Empty state
  emptyState: { alignItems: 'center', gap: 12, paddingTop: 60 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },

  // Modal
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
    gap: 14,
  },
  modalTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalMRFInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    width: '100%',
  },
  modalMRFIcon: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: colors.buyerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalMRFName: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  modalMRFBarangay: { fontSize: typography.size.xs, color: colors.textSecondary },
  modalSubtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%', marginTop: 4 },
  modalCancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: colors.buyerPrimary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: colors.secondary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.base,
  },
});
