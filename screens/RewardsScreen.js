import { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Modal, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { mockUser, mockRewards } from '../mock/data';
import EcoTokenBadge from '../components/EcoTokenBadge';
import CategoryPill from '../components/CategoryPill';
import RewardCard from '../components/RewardCard';

const CATEGORIES = ['All', 'Food', 'Shopping', 'Services', 'Utilities'];

export default function RewardsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedReward, setSelectedReward] = useState(null);
  const [modalVisible, setModalVisible]     = useState(false);
  const [redeemed, setRedeemed]             = useState(false);
  const [errorMsg, setErrorMsg]             = useState('');

  const featured = mockRewards.find((r) => r.featured);
  const filtered = mockRewards.filter((r) =>
    !r.featured && (activeCategory === 'All' || r.category === activeCategory)
  );

  function handleRedeem(id) {
    const reward = mockRewards.find((r) => r.id === id);
    setSelectedReward(reward);
    setRedeemed(false);
    setErrorMsg('');
    setModalVisible(true);
  }

  function confirmRedeem() {
    if (selectedReward.tokenCost > mockUser.ecoTokenBalance) {
      setErrorMsg('Insufficient tokens for this reward.');
    } else {
      setRedeemed(true);
      setErrorMsg('');
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

      <Text style={styles.title}>Eco Rewards Store</Text>
      <Text style={styles.subtitle}>Redeem your tokens for real rewards</Text>

      <EcoTokenBadge variant="pill" balance={mockUser.ecoTokenBalance} />

      {/* Category filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            isActive={activeCategory === cat}
            onPress={() => setActiveCategory(cat)}
          />
        ))}
      </ScrollView>

      {/* Featured banner */}
      {featured && (
        <View style={styles.featuredCard}>
          <View style={styles.featuredImage}>
            <Ionicons name="star" size={32} color={colors.secondary} />
            <Text style={styles.featuredLabel}>Featured</Text>
          </View>
          <View style={styles.featuredBody}>
            <Text style={styles.featuredName}>{featured.name}</Text>
            <View style={styles.featuredCostRow}>
              <Ionicons name="leaf" size={13} color={colors.primary} />
              <Text style={styles.featuredCost}>{featured.tokenCost.toLocaleString()} tokens</Text>
            </View>
            <TouchableOpacity
              style={styles.featuredBtn}
              onPress={() => handleRedeem(featured.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.featuredBtnText}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Reward grid */}
      <View style={styles.grid}>
        {filtered.map((reward, index) => (
          <View key={reward.id} style={styles.gridItem}>
            <RewardCard reward={reward} onRedeem={handleRedeem} />
          </View>
        ))}
      </View>

      {/* Redeem modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {errorMsg ? (
              /* ── Insufficient tokens ── */
              <>
                <Ionicons name="close-circle" size={48} color={colors.error} />
                <Text style={styles.modalTitle}>Insufficient Tokens</Text>
                <Text style={styles.modalSubtitle}>{errorMsg}</Text>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => { setModalVisible(false); setErrorMsg(''); }}
                >
                  <Text style={styles.modalBtnText}>Done</Text>
                </TouchableOpacity>
              </>
            ) : redeemed ? (
              /* ── QR Code voucher ── */
              <>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => { setModalVisible(false); setRedeemed(false); }}
                >
                  <Ionicons name="close" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.modalSubtitle}>{selectedReward?.name}</Text>
                <View style={styles.qrWrapper}>
                  <QRCode
                    value={`BESMART-${selectedReward?.id}-${mockUser.id}`}
                    size={180}
                    color={colors.textPrimary}
                    backgroundColor={colors.secondary}
                  />
                </View>
                <Text style={styles.qrHint}>Present this QR code to the partner to claim your reward.</Text>
              </>
            ) : (
              /* ── Confirm prompt ── */
              <>
                <Text style={styles.modalTitle}>Redeem Reward?</Text>
                <Text style={styles.modalSubtitle}>{selectedReward?.name}</Text>
                <Text style={styles.modalCost}>{selectedReward?.tokenCost.toLocaleString()} tokens</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBtn} onPress={confirmRedeem}>
                    <Text style={styles.modalBtnText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 18,
    paddingBottom: 40,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: -8,
  },
  featuredCard: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  featuredImage: {
    height: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  featuredLabel: {
    color: colors.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    letterSpacing: 1,
  },
  featuredBody: {
    padding: 14,
    gap: 8,
  },
  featuredName: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  featuredCostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredCost: {
    fontSize: typography.size.sm,
    color: colors.primary,
    fontWeight: typography.weight.medium,
  },
  featuredBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  featuredBtnText: {
    color: colors.secondary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.base,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
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
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalCost: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    width: '100%',
  },
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
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalBtnText: {
    color: colors.secondary,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.base,
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrHint: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
});