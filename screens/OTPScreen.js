import { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function OTPScreen({ navigation, setIsAuthenticated }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const inputs = useRef([]);

  function handleChange(text, index) {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto move to next box
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  }

  function handleBackspace(e, index) {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  function handleVerify() {
    const code = otp.join('');
    if (code.length < 4) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }
    // Mock OTP — any 4 digits works
    setError('');
    setIsAuthenticated(true, 'resident');
  }

  function handleResend() {
    setOtp(['', '', '', '']);
    setError('');
    setResent(true);
    inputs.current[0].focus();
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.screen}>

        {/* Back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-open-outline" size={48} color={colors.primary} />
        </View>

        <Text style={styles.title}>Verify Your Account</Text>
        <Text style={styles.subtitle}>
          We sent a 4-digit OTP to your email/phone.{'\n'}
          Enter it below to continue.
        </Text>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), index)}
              onKeyPress={(e) => handleBackspace(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectionColor={colors.primary}
            />
          ))}
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {resent ? (
          <Text style={styles.resentText}>OTP resent successfully!</Text>
        ) : null}

        {/* Verify button */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyBtnText}>Verify Account</Text>
        </TouchableOpacity>

        {/* Resend */}
        <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
          <Text style={styles.resendText}>
            Didn't receive a code?{' '}
            <Text style={styles.resendLink}>Resend OTP</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 56,
    left: 24,
    padding: 8,
    borderRadius: 9999,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: -8,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 14,
    marginVertical: 8,
  },
  otpBox: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    backgroundColor: colors.secondary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.successLight,
  },
  errorText: {
    fontSize: typography.size.sm,
    color: colors.error,
    backgroundColor: colors.errorLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
  resentText: {
    fontSize: typography.size.sm,
    color: colors.primary,
    backgroundColor: colors.successLight,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  },
  verifyBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyBtnText: {
    color: colors.secondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
  },
  resendText: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  resendLink: {
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
});