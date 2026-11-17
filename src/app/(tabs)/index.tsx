import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Header } from '@/components/Header';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Margem

const BANNERS = [
  {
    id: '1',
    titulo: 'Bem-vindo(a) ao DART',
    subtitulo: 'FAQ na aba de "Missão"',
    imagem: require('../../assets/images/device.jpg'),
    rota: '/missao'
  },
  {
    id: '2',
    titulo: 'Seu solo mais cuidado',
    subtitulo: 'Umidade, Temperatura, pH, NPK',
    imagem: require('../../assets/images/soil.jpeg'),
    rota: '/missao',
  },
  {
    id: '3',
    titulo: 'Compre já o seu DART!',
    subtitulo: 'Aproveite!',
    imagem: require('../../assets/images/truck.jpeg'),
    rota: '/buy'
  },
];

export default function Index() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <Header name="DART" />

      {/* Carrossel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          data={BANNERS}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={() => router.navigate(item.rota as any)}
              >
                <Image
                  source={typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem}
                  style={styles.cardImage}
                  contentFit="cover"
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>{item.titulo}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitulo}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Bolinhas indicadoras */}
        <View style={styles.pagination}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  carouselWrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#eeeeee',
    marginTop: 2,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: '#77af6f',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#cccccc',
  },
});

