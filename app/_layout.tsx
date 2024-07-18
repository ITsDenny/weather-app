import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{ 
      headerStyle:{
        backgroundColor:'lightblue'
      },
      headerTintColor:'#000',
      headerTitleStyle:{
        fontWeight:'bold'
      },
      title:'Weather App - Denny Mario',
     }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
