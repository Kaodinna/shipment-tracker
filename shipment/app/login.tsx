import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Pressable,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import Bottomsheet from "@/components/LoginModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Login = () => {
  const logo = require("../assets/images/Group.png");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const scrollTo = (destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 100,
    });
  };

  const handlePress = () => {
    const availableHeight = SCREEN_HEIGHT - insets.top - insets.bottom;
    scrollTo(-availableHeight / 2); // Open the bottom sheet
    setModalOpen(true);
  };

  return (
    <SafeAreaView
      className={`flex flex-1  ${modalOpen ? "bg-[#000000]" : "bg-[#2F50C1]"}`}
    >
      <StatusBar
        barStyle={modalOpen ? "light-content" : "dark-content"}
        backgroundColor={modalOpen ? "#000000" : "#2F50C1"}
      />
      <View className="flex-1 justify-between mx-[4%] bg-[#2F50C1] rounded-[20px]">
        <View className="flex-1 justify-center items-center">
          <Image source={logo} alt="" className="w-[207.63px]" />
        </View>
        <Pressable
          onPress={handlePress}
          className="bg-white rounded-[10px] h-[56px] flex justify-center items-center mb-5"
        >
          <Text>Login</Text>
        </Pressable>
      </View>
      <Bottomsheet translateY={translateY} setModalOpen={setModalOpen} />
    </SafeAreaView>
  );
};

export default Login;
