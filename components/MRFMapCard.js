import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function MRFMapCard({ mrfLocations }) {
  return (
    <View style={styles.card}>
      <View style={styles.mapBackground}>

        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View key={`h-${pos}`} style={[styles.gridLineH, { top: `${pos * 100}%` }]} />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View key={`v-${pos}`} style={[styles.gridLineV, { left: `${pos * 100}%` }]} />
        ))}

        {mrfLocations.map((mrf) => {
          const isFull = mrf.status === 'full';
          const markerColor = isFull ? colors.error : colors.primary;
          return (
            <View
              key={mrf.id}
              style={[styles.markerWrapper, { left: `${mrf.posX * 100}%`, top: `${mrf.posY * 100}%` }]}
            >
              <View style={[styles.mrfMarker, { backgroundColor: markerColor }]}>
                <Ionicons name="business" size={14} color={colors.secondary} />
              </View>
              <View style={[styles.statusBadge, { backgroundColor: markerColor }]}>
                <Text style={styles.statusText}>{isFull ? 'FULL' : 'OPEN'}</Text>
              </View>
              <View style={styles.nameLabel}>
                <Text style={styles.nameLabelText}>{mrf.name}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
            <Text style={styles.legendText}>Full</Text>
          </View>
        </View>

      </View>

      <View style={styles.footer}>
        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
        <Text style={styles.footerText}>Batangas City — MRF Facility Map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.secondary, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  mapBackground: { height: 300, backgroundColor: '#E8F5E9', position: 'relative', overflow: 'hidden' },
  gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#C8E6C9' },
  gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#C8E6C9' },
  markerWrapper: { position: 'absolute', alignItems: 'center' },
  mrfMarker: { borderRadius: 9999, padding: 7, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  statusBadge: { marginTop: 3, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 },
  statusText: { fontSize: 8, color: colors.secondary, fontWeight: '700', letterSpacing: 0.3 },
  nameLabel: { marginTop: 2, backgroundColor: colors.secondary, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2, borderWidth: 1, borderColor: colors.cardBorder },
  nameLabelText: { fontSize: 8, color: colors.textPrimary, fontWeight: '600' },
  liveBadge: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 9999, paddingHorizontal: 8, paddingVertical: 4, gap: 5, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  liveDot: { width: 6, height: 6, borderRadius: 9999, backgroundColor: colors.error },
  liveText: { fontSize: 10, fontWeight: '700', color: colors.error, letterSpacing: 0.5 },
  legend: { position: 'absolute', bottom: 10, left: 10, flexDirection: 'row', gap: 10, backgroundColor: colors.secondary, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: colors.cardBorder },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 9999 },
  legendText: { fontSize: 9, color: colors.textPrimary, fontWeight: '600' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 10, backgroundColor: colors.secondary },
  footerText: { fontSize: typography.size.xs, color: colors.textSecondary },
});
