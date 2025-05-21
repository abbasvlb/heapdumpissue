/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import TeamAllocator from './src/TeamAllocator';
import * as Sentry from "@sentry/react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

Sentry.init({
  dsn: "https://2c4854d9a9c8022abc257b835892ad50@o4509294418001920.ingest.us.sentry.io/4509294480195584",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  debug: true, // Add this line
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: __DEV__ ? "development" : "production",
});

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const DummyScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24 }}>This is the Dummy Screen</Text>
  </View>
);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <Tab.Navigator>
          <Tab.Screen name="TeamAllocator" component={TeamAllocator} options={{ title: 'Dream22 Team Split' }} />
          <Tab.Screen name="DummyScreen" component={DummyScreen} options={{ title: 'Dummy' }} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Sentry.wrap(App);
