import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from 'react-native';
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

// Collector screens
import CollectorHome         from './screens/collector/HomeScreen';
import CollectorQRScanner    from './screens/collector/QRScannerScreen';
import CollectionConfirmed   from './screens/collector/CollectionConfirmedScreen';
import CollectorTransactions from './screens/collector/TransactionsScreen';
import CollectorProfile      from './screens/collector/ProfileScreen';
import { mockCollectorNotifications } from './mock/data';

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

// ─── Collector navigators ─────────────────────────────────────────────────────
const CollectorStack     = createStackNavigator();
const CollectorRootStack = createStackNavigator();

// Bottom tabs only — no QR/Confirmed screens here
function CollectorTabNavigator({ setIsAuthenticated }) {
  const collectorTabOptions = ({ route }) => ({
    headerShown: false,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#0D7A5F',
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
        CollectorHomeTab:    focused ? 'home'          : 'home-outline',
        CollectorNotifTab:   focused ? 'notifications' : 'notifications-outline',
        CollectorQRTab:      'qr-code-outline', // handled by tabBarButton, icon unused
        CollectorLogTab:     focused ? 'receipt'       : 'receipt-outline',
        CollectorProfileTab: focused ? 'person'        : 'person-outline',
      };
      return <Ionicons name={icons[route.name]} size={22} color={color} />;
    },
  });

  return (
    <Tab.Navigator screenOptions={collectorTabOptions}>
      <Tab.Screen
        name="CollectorHomeTab"
        component={CollectorHome}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="CollectorNotifTab"
        component={CollectorNotificationsScreen}
        options={{ tabBarLabel: 'Notifications' }}
      />

      {/* QR FAB — navigates to QR screen in the root stack above the tabs */}
      <Tab.Screen
        name="CollectorQRTab"
        component={CollectorHome}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.collectorFabButton}>
              <Ionicons name="qr-code-outline" size={26} color="#fff" />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.fabWrapper}
              activeOpacity={0.85}
              onPress={props.onPress}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CollectorQRScreen');
          },
        })}
      />

      <Tab.Screen
        name="CollectorLogTab"
        component={CollectorTransactions}
        options={{ tabBarLabel: 'Log' }}
      />

      <Tab.Screen
        name="CollectorProfileTab"
        options={{ tabBarLabel: 'Profile' }}
      >
        {() => <CollectorProfile setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Root stack wraps the tabs + QR scanner + Collection confirmed as full-screen overlays
function CollectorTabs({ setIsAuthenticated }) {
  return (
    <CollectorRootStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectorRootStack.Screen name="CollectorTabsMain">
        {() => <CollectorTabNavigator setIsAuthenticated={setIsAuthenticated} />}
      </CollectorRootStack.Screen>
      <CollectorRootStack.Screen name="CollectorQRScreen"      component={CollectorQRScanner} />
      <CollectorRootStack.Screen name="CollectionConfirmed"    component={CollectionConfirmed} />
    </CollectorRootStack.Navigator>
  );
}

// Notifications screen component
function CollectorNotificationsScreen() {
  const iconMap = {
    task:     'alert-circle-outline',
    schedule: 'calendar-outline',
    complete: 'checkmark-circle-outline',
    report:   'document-text-outline',
  };

  return (
    <View style={notifScreenStyles.screen}>
      <View style={notifScreenStyles.header}>
        <Text style={notifScreenStyles.title}>Notifications</Text>
        <Text style={notifScreenStyles.subtitle}>
          {mockCollectorNotifications.filter((n) => !n.read).length} unread
        </Text>
      </View>
      <ScrollView contentContainerStyle={notifScreenStyles.list}>
        {mockCollectorNotifications.map((item) => (
          <View
            key={item.id}
            style={[notifScreenStyles.row, !item.read && notifScreenStyles.rowUnread]}
          >
            <View style={notifScreenStyles.iconWrap}>
              <Ionicons name={iconMap[item.type]} size={18} color="#0D7A5F" />
            </View>
            <View style={notifScreenStyles.body}>
              <Text style={notifScreenStyles.itemTitle}>{item.title}</Text>
              <Text style={notifScreenStyles.itemBody}>{item.body}</Text>
              <Text style={notifScreenStyles.itemTime}>{item.time}</Text>
            </View>
            {!item.read && <View style={notifScreenStyles.dot} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const notifScreenStyles = StyleSheet.create({
  screen:    { flex: 1, backgroundColor: '#F4FAF7' },
  header:    { backgroundColor: '#0D7A5F', paddingTop: 56, paddingBottom: 18, paddingHorizontal: 20, gap: 2 },
  title:     { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle:  { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  list:      { padding: 16, gap: 10, paddingBottom: 40 },
  row:       { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 12, padding: 14, gap: 12, borderWidth: 1, borderColor: '#E0EDE8' },
  rowUnread: { backgroundColor: '#F0FDF8', borderColor: '#00E5A0' },
  iconWrap:  { width: 36, height: 36, borderRadius: 9999, backgroundColor: '#E6F7F2', justifyContent: 'center', alignItems: 'center' },
  body:      { flex: 1, gap: 2 },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#0D1F1A' },
  itemBody:  { fontSize: 11, color: '#6B8C81' },
  itemTime:  { fontSize: 11, color: '#9BB5AC', marginTop: 2 },
  dot:       { width: 8, height: 8, borderRadius: 9999, backgroundColor: '#00E5A0', marginTop: 4 },
});

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
      {isAuthenticated && userRole === 'resident'  && <ResidentTabs  setIsAuthenticated={handleSetAuth} />}
      {isAuthenticated && userRole === 'mrf'       && <MRFTabs       setIsAuthenticated={handleSetAuth} />}
      {isAuthenticated && userRole === 'collector' && <CollectorTabs setIsAuthenticated={handleSetAuth} />}
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
  collectorFabButton: {
    width: 58,
    height: 58,
    borderRadius: 9999,
    backgroundColor: '#0D7A5F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D7A5F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
