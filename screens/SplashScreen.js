import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Ionicons name="leaf" size={64} color={colors.secondary} />
        <Text style={styles.wordmark}>BE-SMART</Text>
      </View>
      <Text style={styles.tagline}>Your city. Your rewards. Your future.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  logoWrapper: {
    alignItems: 'center',
    gap: 12,
  },
  wordmark: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    color: colors.secondary,
    letterSpacing: 3,
  },
  tagline: {
    fontSize: typography.size.base,
    color: colors.secondary,
    opacity: 0.85,
    textAlign: 'center',
  },
});