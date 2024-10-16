import {
  StatusBar,
  Image,
  RefreshControl,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import Shipping from "../../shipment.json";

export default function HomeScreen() {
  const box = require("../../assets/images/box.png");
  const user = require("../../assets/images/user.png");
  const logo = require("../../assets/images/logoblue.png");
  const [isChecked, setChecked] = useState(false);
  const [data, setData] = useState(Shipping);
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = () => {
    setRefreshing(true);
    setData([...Shipping]);
    setRefreshing(false);
  };
  const Shipment = ({ status }: any) => (
    <View className="bg-[#F4F2F8] p-[12px] rounded-[10px] flex flex-row items-center justify-between">
      <View className="flex flex-row space-x-[14px]">
        <View className="flex flex-row space-x-[14px] items-center">
          <Checkbox
            // style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Image source={box} className="w-[40px] h-[40px]" />
        </View>
        <View>
          <Text className="text-[13px] text-[#3F395C] font-[400]">AWB</Text>
          <Text className="text-[18px] text-[#000000] font-[600]">
            57764678765
          </Text>
          <View className="flex flex-row space-x-[8px] items-center">
            <Text className="text-[#757281] text-[13px] font-[400]">Cairo</Text>
            <AntDesign name="arrowright" size={8} color="#2F50C1" />
            <Text className="text-[#757281] text-[13px] font-[400]">
              Alexandria
            </Text>
          </View>
        </View>
      </View>
      <View
        className={`px-[6px] py-[4px]  rounded-[4px] border-[1px] border-white ${
          status === "canceled"
            ? "bg-[#F4F2F8]"
            : status === "received"
            ? "bg-[#D9E6FD]"
            : status === "error"
            ? "bg-red-200"
            : status === "delivered"
            ? "bg-green-100"
            : ""
        }`}
      >
        <Text
          className={` text-[11px] font-[500] uppercase ${
            status === "canceled"
              ? "text-[#58536E]"
              : status === "received"
              ? "text-[#2F50C1]"
              : status === "error"
              ? "text-red-500"
              : status === "delivered"
              ? "text-green-700"
              : ""
          }`}
        >
          {status}
        </Text>
      </View>
      <View className="p-[4px] rounded-full bg-white">
        <AntDesign name="arrowsalt" size={16} color="#4561DB" />
      </View>
    </View>
  );
  return (
    <SafeAreaView
      className={`flex flex-1 bg-[#FFFFFF]`}
      style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"#FFFFFF"} />

      <View className="flex flex-col">
        <View className="mb-[24px] px-[16px]">
          <View className="mb-[12px] pb-[12px]">
            <View className=" pb-[12px]">
              <View className=" py-[12px] flex flex-row justify-between items-center">
                <Image
                  source={user}
                  alt="user"
                  className="w-[40px] h-[40px] rounded-full"
                />
                <Image
                  source={logo}
                  alt="user"
                  className="w-[92.28px] h-[16px]"
                />
                <View className="w-[40px] h-[40px] rounded-full bg-[#F4F2F8] flex flex-row justify-center items-center">
                  <Fontisto name="bell" size={18} color="#2F50C1" />
                </View>
              </View>
              <View className=" pt-[12px]">
                <Text className="text-[14px] font-[400] text-[#000000] text-opacity-60">
                  Hello,
                </Text>
                <Text className="text-[28px] font-[600] text-[#000000]">
                  Ibrahim Shaker
                </Text>
              </View>
            </View>
            <View className="bg-[#F4F2F8] px-[14px] py-[6px] rounded-[10px] flex flex-row items-center">
              <Feather name="search" size={24} color="#A7A3B3" />
              <TextInput
                placeholder="Search"
                placeholderTextColor={"#A7A3B3"}
                className="text-[#16px] ml-[8px]"
              />
            </View>
          </View>
          <View className="flex flex-row justify-between items-center space-x-2 w-full">
            <Pressable className="bg-[#F4F2F8] pl-[14px] pr-[18px] py-[6px] flex flex-row flex-1 items-center justify-center rounded-[10px] h-[44px]">
              <Ionicons name="filter-sharp" size={24} color="#58536E" />
              <Text className="text-[16px] font-[400] text-[#58536E] ml-[8px]">
                Filters
              </Text>
            </Pressable>
            <Pressable className="bg-[#2F50C1] pl-[14px] pr-[18px] py-[6px] flex flex-row flex-1 items-center justify-center rounded-[10px] h-[44px]">
              <MaterialCommunityIcons
                name="line-scan"
                size={24}
                color="white"
              />
              <Text className="text-[16px] font-[400] text-[#FFFFFF] ml-[8px]">
                Add Scan
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="px-[16px] pt-[12px]">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[22px] font-[600] text-[#000000]">
              Shipments
            </Text>
            <View className="flex flex-row items-center">
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#4630EB" : undefined}
              />
              <Text className="ml-[8px] text-[#2F50C1] text-[18px] font-[400]">
                Mark All
              </Text>
            </View>
          </View>
          <View className="mt-[16px]">
            <FlatList
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              horizontal={false}
              data={data}
              renderItem={({ item }) => <Shipment status={item.status} />}
              keyExtractor={(item) => item.id}
              ListFooterComponent={<View style={{ height: 650 }}></View>}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshData}
                  colors={["grey"]}
                  progressBackgroundColor={"#2F50C1"}
                />
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
