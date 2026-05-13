import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Mock credentials — backend would determine role in production
const MOCK_CREDENTIALS = {
  'resident@besmart.ph': { password: 'resident123', role: 'resident' },
  'mrf@besmart.ph':      { password: 'mrf123',      role: 'mrf'      },
  'buyer@besmart.ph':    { password: 'buyer123',     role: 'buyer'    },
};

export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');

  function handleLogin() {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const credential = MOCK_CREDENTIALS[email.trim().toLowerCase()];

    if (!credential || credential.password !== password) {
      setError('Invalid email or password.');
      return;
    }

    setError('');
    setIsAuthenticated(true, credential.role);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Ionicons name="leaf" size={48} color={colors.primary} />
          <Text style={styles.wordmark}>BE-SMART</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <Text style={styles.cardSubtitle}>Log in to your account</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons
                name={showPass ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotWrapper}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          {/* Demo hint */}
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>Demo Credentials</Text>
            <Text style={styles.hintText}>Resident: resident@besmart.ph / resident123</Text>
            <Text style={styles.hintText}>MRF Worker: mrf@besmart.ph / mrf123</Text>
            <Text style={styles.hintText}>MRF Buyer: buyer@besmart.ph / buyer123</Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.registerLink}>
              Don't have an account?{' '}
              <Text style={styles.registerLinkBold}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 28,
  },
  logoWrapper: { alignItems: 'center', gap: 8 },
  wordmark: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.primary, letterSpacing: 2 },
  card: { width: '100%', backgroundColor: colors.secondary, borderRadius: 18, padding: 24, gap: 14, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 4 },
  cardTitle: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  cardSubtitle: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: -8 },
  errorText: { fontSize: typography.size.sm, color: colors.error, backgroundColor: colors.errorLight, padding: 10, borderRadius: 8 },
  input: { borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 8, padding: 12, fontSize: typography.size.base, color: colors.textPrimary, backgroundColor: colors.background },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 8, paddingHorizontal: 12, backgroundColor: colors.background },
  passwordInput: { flex: 1, paddingVertical: 12, fontSize: typography.size.base, color: colors.textPrimary },
  forgotWrapper: { alignSelf: 'flex-end', marginTop: -6 },
  forgotText: { fontSize: typography.size.sm, color: colors.primary, fontWeight: typography.weight.medium },
  loginBtn: { backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 14, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  loginBtnText: { color: colors.secondary, fontSize: typography.size.base, fontWeight: typography.weight.bold },
  hintBox: { backgroundColor: colors.successLight, borderRadius: 8, padding: 12, gap: 4, borderWidth: 1, borderColor: '#A5D6A7' },
  hintTitle: { fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: colors.primary },
  hintText: { fontSize: typography.size.xs, color: colors.textSecondary },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.cardBorder },
  dividerText: { fontSize: typography.size.sm, color: colors.textMuted },
  registerLink: { fontSize: typography.size.sm, color: colors.textSecondary, textAlign: 'center' },
  registerLinkBold: { color: colors.primary, fontWeight: typography.weight.bold },
});
