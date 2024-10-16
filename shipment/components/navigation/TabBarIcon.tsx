// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof FontAwesome5>["name"]>) {
  return (
    <FontAwesome5 size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
