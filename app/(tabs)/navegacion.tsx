// MapScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.6512, // Ejemplo de latitud inicial
          longitude: -115.4689, // Ejemplo de longitud inicial
          latitudeDelta: 0.05, // Nivel de zoom
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 32.6512, // Latitud del ejemplo
            longitude: -115.4689, // Longitud del ejemplo
          }}
          title="Bache detectado"
          description="Ubicación de ejemplo de un bache"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;