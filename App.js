import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from './theme/colors';
import { typography } from './theme/typography';

import SplashScreen       from './screens/SplashScreen';
import LoginScreen        from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen         from './screens/HomeScreen';
import RewardsScreen      from './screens/RewardsScreen';
import QRScannerScreen    from './screens/QRScannerScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import ProfileScreen      from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

function MainTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopWidth: 0.5,
          borderTopColor: colors.cardBorder,
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
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
      })}
    >
      <Tab.Screen name="Home"         component={HomeScreen} />
      <Tab.Screen name="Rewards"      component={RewardsScreen} />

      {/* QR FAB tab */}
      <Tab.Screen
        name="QR"
        component={QRScannerScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.fabButton}>
              <Ionicons name="qr-code-outline" size={26} color={colors.secondary} />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.fabWrapper} activeOpacity={0.85} />
          ),
        }}
      />

      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen setIsAuthenticated={setIsAuthenticated} />}
      />
    </Tab.Navigator>
  );
}

function AuthStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash"        component={SplashScreen} />
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
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated
        ? <MainTabs setIsAuthenticated={setIsAuthenticated} />
        : <AuthStack setIsAuthenticated={setIsAuthenticated} />
      }
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