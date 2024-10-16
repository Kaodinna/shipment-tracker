import { Tabs } from "expo-router";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabBarLabelProps } from "@/services/types";
import { Text } from "react-native";
export default function TabLayout() {
  const TabBarLabel = ({ focused, title }: TabBarLabelProps) => {
    return (
      <Text
        className={`font-[400] text-[11px]  ${
          focused ? "text-[#5B4CCC]" : "text-[#A7A3B3]"
        } leading-[13px]`}
      >
        {title}
      </Text>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2F50C1",
        tabBarInactiveTintColor: "#A7A3B3",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Shipments",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={25} name={"boxes"} color={color} />
          ),
          tabBarLabel: ({ focused }) => (
            <TabBarLabel focused={focused} title="Shipments" />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          headerShown: false,
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={25}
              name={"barcode-scan"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <Ionicons size={25} name={"wallet-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={25}
              name={"account-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
