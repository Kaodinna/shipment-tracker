import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/helpers/schema";
import { runOnJS } from "react-native-reanimated";
import { router } from "expo-router";
import { BottomsheetProps, formDataProps } from "@/services/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_HEIGHT = SCREEN_HEIGHT / 2.2;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT;

export default function Bottomsheet({
  translateY,
  setModalOpen,
}: BottomsheetProps) {
  const context = useSharedValue({ y: 0 });
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = Math.min(
        context.value.y + e.translationY,
        MIN_TRANSLATE_Y
      );

      if (translateY.value < -MAX_HEIGHT) {
        translateY.value = -MAX_HEIGHT;
      }
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 6) {
        runOnJS(setModalOpen)(false);
        translateY.value = withSpring(MIN_TRANSLATE_Y);
      } else {
        translateY.value = withSpring(-MAX_HEIGHT);
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const handleClosePress = () => {
    translateY.value = withSpring(MIN_TRANSLATE_Y);
    setModalOpen(false);
  };

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isInputEmpty = !emailValue || !passwordValue;
  const handleLogin = (formData: formDataProps) => {
    console.log("formData", formData);
    router.push("/(tabs)");
  };
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.bottomsheet_container, reanimatedBottomStyle]}
      >
        <View className="w-[36px] h-[5px] bg-[#A7A3B3] rounded-[20px] self-center my-[8px]" />

        <View className="flex-1 flex flex-col">
          <View className="flex flex-col mb-[38px]">
            <View className="flex flex-col mb-[8px]">
              <Pressable
                className="flex flex-row items-center px-[8px] py-[11px]"
                onPress={handleClosePress}
              >
                <AntDesign name="left" size={24} color="#4561DB" />
                <Text className="ml-[3px] text-[#4561DB] text-[17px] leading-[22px] font-[400]">
                  Cancel
                </Text>
              </Pressable>
              <View className="px-[16px] pt-[3px] pb-[8px]">
                <Text className="text-[32px] font-[600] leading-[41px]">
                  Login
                </Text>
              </View>
            </View>
            <View className="flex flex-col px-[16px]">
              <Text className="text-[#757281] text-[17px] leading-[24px] font-[400]">
                Please enter your First, Last name and your phone number in
                order to register
              </Text>
            </View>
          </View>

          <View className="flex-grow px-[16px]">
            <View className="mb-[8px]">
              <View
                className={`flex flex-col  bg-[#F4F2F8] px-[14px]  rounded-[10px] h-[56px] justify-center ${
                  emailFocused ? "border-[#2F50C1] border-[1px]" : ""
                }`}
              >
                <Text
                  className={`${
                    emailValue
                      ? "text-[11px] leading-[13px] text-[#58536E]"
                      : "text-[16px] text-[#A7A3B3] leading-[25px]"
                  }`}
                >
                  Username / Email
                </Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholderTextColor={"#BABABA"}
                      keyboardType="email-address"
                      onChangeText={(text) => onChange(text.toLowerCase())}
                      value={value}
                      className="text-[#2F50C1] text-[16px]"
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                  )}
                  name="email"
                />
              </View>
              <Text className="font-600 text-[10px] leading-[10px] text-[#FF0000] mt-[2px]">
                {errors.email ? errors.email.message : "   "}
              </Text>
            </View>
            <View className="mb-[8px]">
              <View
                className={`flex flex-col  bg-[#F4F2F8] px-[14px]  rounded-[10px] h-[56px] justify-center ${
                  passwordFocused ? "border-[#2F50C1] border-[1px]" : ""
                }`}
              >
                <Text
                  className={`${
                    passwordValue
                      ? "text-[11px] leading-[13px] text-[#58536E]"
                      : "text-[16px] text-[#A7A3B3] leading-[25px]"
                  }`}
                >
                  Password
                </Text>

                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      secureTextEntry={true}
                      autoComplete="off"
                      placeholderTextColor={"#BABABA"}
                      onChangeText={onChange}
                      value={value}
                      className="text-[#2F50C1] text-[16px]"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                  )}
                  name="password"
                />
              </View>
              <Text className="font-600 text-[10px] leading-[10px] text-[#FF0000] mt-[2px]">
                {errors.password ? errors.password.message : "   "}
              </Text>
            </View>
          </View>

          <View className="absolute bottom-[100px] w-full px-[16px]">
            <Pressable
              onPress={handleSubmit(handleLogin)}
              className={` rounded-[10px] h-[56px] flex justify-center items-center mb-5 ${
                isInputEmpty ? "bg-[#EAE7F2]" : "bg-[#2F50C1]"
              }`}
            >
              <Text
                className={`font-[700] text-[17px] leading-[22px]  ${
                  isInputEmpty ? "text-[#A7A3B3]" : "text-[#FFFFFF]"
                }`}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomsheet_container: {
    width: "100%",
    height: SCREEN_HEIGHT,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: SCREEN_HEIGHT / 1.9,
    zIndex: 12000,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
