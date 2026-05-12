import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './theme/colors';
import { typography } from './theme/typography';

// Auth screens
import SplashScreen       from './screens/SplashScreen';
import LoginScreen        from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import OTPScreen          from './screens/OTPScreen';

// Resident screens
import ResidentHome         from './screens/resident/HomeScreen';
import ResidentRewards      from './screens/resident/RewardsScreen';
import ResidentQRScanner    from './screens/resident/QRScannerScreen';
import ResidentTransactions from './screens/resident/TransactionsScreen';
import ResidentProfile      from './screens/resident/ProfileScreen';

// MRF screens
import MRFHome         from './screens/mrf/HomeScreen';
import MRFRewards      from './screens/mrf/RewardsScreen';
import MRFQRScanner    from './screens/mrf/QRScannerScreen';
import MRFTransactions from './screens/mrf/TransactionsScreen';
import MRFProfile      from './screens/mrf/ProfileScreen';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

// ─── Shared tab navigator config ─────────────────────────────────────────────
const tabScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textMuted,
  tabBarStyle: {
    backgroundColor: colors.secondary,
    borderTopWidth: 0.5,
    borderTopColor: colors.cardBorder,
    height: 80,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabBarLabelStyle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
  tabBarIcon: ({ color, focused }) => {
    const icons = {
      Home:         focused ? 'home'         : 'home-outline',
      Rewards:      focused ? 'gift'          : 'gift-outline',
      QR:           focused ? 'qr-code'       : 'qr-code-outline',
      Transactions: focused ? 'receipt'       : 'receipt-outline',
      Profile:      focused ? 'person'        : 'person-outline',
    };
    return <Ionicons name={icons[route.name]} size={22} color={color} />;
  },
});

const fabOptions = {
  tabBarLabel: () => null,
  tabBarIcon: () => (
    <View style={styles.fabButton}>
      <Ionicons name="qr-code-outline" size={26} color={colors.secondary} />
    </View>
  ),
  tabBarButton: (props) => (
    <TouchableOpacity {...props} style={styles.fabWrapper} activeOpacity={0.85} />
  ),
};

// ─── Resident tabs ────────────────────────────────────────────────────────────
function ResidentTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home"         component={ResidentHome} />
      <Tab.Screen name="Rewards"      component={ResidentRewards} />
      <Tab.Screen name="QR"           component={ResidentQRScanner} options={fabOptions} />
      <Tab.Screen name="Transactions" component={ResidentTransactions} />
      <Tab.Screen
        name="Profile"
        children={() => <ResidentProfile setIsAuthenticated={setIsAuthenticated} />}
      />
    </Tab.Navigator>
  );
}

// ─── MRF tabs ─────────────────────────────────────────────────────────────────
function MRFTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Home"         component={MRFHome} />
      <Tab.Screen name="Rewards"      component={MRFRewards} />
      <Tab.Screen name="QR"           component={MRFQRScanner} options={fabOptions} />
      <Tab.Screen name="Transactions" component={MRFTransactions} />
      <Tab.Screen
        name="Profile"
        children={() => <MRFProfile setIsAuthenticated={setIsAuthenticated} />}
      />
    </Tab.Navigator>
  );
}

// ─── Auth stack ───────────────────────────────────────────────────────────────
function AuthStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Login"
        children={(props) => (
          <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      />
      <Stack.Screen
        name="Registration"
        children={(props) => (
          <RegistrationScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      />
      <Stack.Screen
        name="OTP"
        children={(props) => (
          <OTPScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      />
    </Stack.Navigator>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole]               = useState(null); // 'resident' | 'mrf'

  function handleSetAuth(value, role = null) {
    setIsAuthenticated(value);
    setUserRole(value ? role : null);
  }

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack setIsAuthenticated={handleSetAuth} />}
      {isAuthenticated && userRole === 'resident' && <ResidentTabs setIsAuthenticated={handleSetAuth} />}
      {isAuthenticated && userRole === 'mrf'      && <MRFTabs      setIsAuthenticated={handleSetAuth} />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  fabButton: {
    width: 58,
    height: 58,
    borderRadius: 9999,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
