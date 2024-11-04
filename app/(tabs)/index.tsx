import { Image, StyleSheet, View, FlatList, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const tutorialSteps = [
  "Posiciona el manubrio de tu bicicleta centrado",
  "Enciende el dispositivo del manubrio y del casco",
  "Conectate a la red wifi Girosafe_Red, contraseña: girosafe",
  "Abre la aplicación y otorga permisos de ubicación.",
  "Agrega tus contactos de emergencia en la sección de perfil.",
  "Recuerda presionar el boton de emergencia en caso de tener una",
  "Disfruta tu viaje"
];

export default function HomeScreen(): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFF', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.titleContainer}>
          <Image
            source={require('../../images/GiroSafe.png')}
            style={styles.reactLogo}
          />
          <ThemedText style={styles.titleText} type="title">GIROSAFE</ThemedText>
          <ThemedView style={styles.subtitleContainer}>
            <ThemedText style={styles.subtitleText}>
              Seguridad y tranquilidad en cada giro.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedText style={styles.introText}>
          Bienvenido a GiroSafe: Seguridad y tranquilidad en cada giro.
        </ThemedText>
        <ThemedText style={styles.introText}>
          Con GiroSafe, podrás:
        </ThemedText>
        <ThemedText style={styles.listText}>
          - Conectarte con tus seres queridos: Comparte tu ubicación en tiempo real y mantén a tus contactos informados.
        </ThemedText>
        <ThemedText style={styles.listText}>
          - Recibir alertas de emergencia: Configura alertas automáticas para contactos de emergencia.
        </ThemedText>

        <ThemedText style={styles.sectionTitle}>Cómo usarlo</ThemedText>
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={tutorialSteps}
            renderItem={({ item, index }) => (
              <View style={styles.stepContainer}>
                <ThemedText style={styles.stepText}>{`${index + 1}. ${item}`}</ThemedText>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Animated.View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    top: 80,
    height: 140,
    backgroundColor: '#0c5871',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#08076c',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  introText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight: 24,
  },
  listText: {
    fontSize: 15,
    marginBottom: 8,
    color: '#555',
  },
  reactLogo: {
    height: 90,
    width: 90,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#70dfec',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  stepContainer: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  stepText: {
    fontSize: 15,
    color: '#333',
  },
});
