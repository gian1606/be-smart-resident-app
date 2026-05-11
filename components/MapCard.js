import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function MapCard({ mapData }) {
  return (
    <View style={styles.card}>
      {/* Map background grid */}
      <View style={styles.mapBackground}>

        {/* Grid lines — horizontal */}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View
            key={`h-${pos}`}
            style={[styles.gridLineH, { top: `${pos * 100}%` }]}
          />
        ))}

        {/* Grid lines — vertical */}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View
            key={`v-${pos}`}
            style={[styles.gridLineV, { left: `${pos * 100}%` }]}
          />
        ))}

        {/* Truck markers */}
        {mapData.trucks.map((truck) => (
          <View
            key={truck.id}
            style={[styles.markerWrapper, { left: `${truck.posX * 100}%`, top: `${truck.posY * 100}%` }]}
          >
            <View style={styles.truckMarker}>
              <Ionicons name="car" size={14} color={colors.secondary} />
            </View>
            <View style={styles.markerLabel}>
              <Text style={styles.markerLabelText}>{truck.label}</Text>
            </View>
          </View>
        ))}

        {/* Bin markers */}
        {mapData.bins.map((bin) => (
          <View
            key={bin.id}
            style={[styles.markerWrapper, { left: `${bin.posX * 100}%`, top: `${bin.posY * 100}%` }]}
          >
            <View style={[styles.binMarker, { backgroundColor: bin.status === 'full' ? colors.error : colors.primary }]}>
              <Ionicons name="trash" size={12} color={colors.secondary} />
            </View>
            <View style={[styles.binBadge, { backgroundColor: bin.status === 'full' ? colors.error : colors.primary }]}>
              <Text style={styles.binBadgeText}>{bin.status === 'full' ? 'FULL' : 'OK'}</Text>
            </View>
          </View>
        ))}

        {/* Live badge */}
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
        <Text style={styles.footerText}>Batangas City — Live Waste Map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  mapBackground: {
    height: 220,
    backgroundColor: '#E8F5E9',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#C8E6C9',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#C8E6C9',
  },
  markerWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  truckMarker: {
    backgroundColor: colors.primary,
    borderRadius: 9999,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerLabel: {
    marginTop: 4,
    backgroundColor: colors.secondary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  markerLabelText: {
    fontSize: 9,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  binMarker: {
    borderRadius: 9999,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  binBadge: {
    marginTop: 3,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  binBadgeText: {
    fontSize: 8,
    color: colors.secondary,
    fontWeight: '700',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: colors.error,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.error,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    backgroundColor: colors.secondary,
  },
  footerText: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
});