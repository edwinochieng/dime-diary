import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ClearChat from "@/components/ClearChat";
import { useSession } from "@/context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useSession();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerTitle: "",
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="chart" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Ask AI",
          headerTitle: "AI Assistant",
          headerRight: () => <ClearChat />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-outline" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
