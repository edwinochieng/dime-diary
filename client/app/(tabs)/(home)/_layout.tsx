import { Drawer } from "expo-router/drawer";
import DrawerContent from "@/components/DrawerContent";
import MenuButton from "@/components/MenuButton";

export default function HomeLayout() {
  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        headerLeft: () => <MenuButton />,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "" }} />
    </Drawer>
  );
}
