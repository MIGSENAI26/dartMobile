import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components/Header';
import { listarDartsUsuario, DartDevice } from '../../utils/dartStorage';

export default function IndexTabs() {
  const [busca, setBusca] = useState('');
  const [darts, setDarts] = useState<DartDevice[]>([]);

  // Atualiza a lista automaticamente toda vez que você volta da tela cadastrar-dart
  useFocusEffect(
  useCallback(() => {
    async function carregarDarts() {
      try {
        const lista = await listarDartsUsuario();
        setDarts(lista);
      } catch (err) {
        console.log('Erro ao carregar DARTs:', err);
      }
    }

    carregarDarts();
  }, [])
);

  // Filtra os DARTs cadastrados em tempo real conforme você digita na barra de pesquisa
  const dartsFiltrados = darts.filter(
    (item) =>
      item.nome.toLowerCase().includes(busca.trim().toLowerCase()) ||
      (item.local && item.local.toLowerCase().includes(busca.trim().toLowerCase())) ||
      (item.codigoSensor && item.codigoSensor.toLowerCase().includes(busca.trim().toLowerCase()))
  );

  return (
    <View style={styles.screen}>
      <Header name="DART" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* SEU CARROSSEL AQUI NO TOPO */}
        <View style={styles.carrosselContainer}>
          {/* Cole aqui o componente/código do seu carrossel */}
        </View>

        {/* BLOCO 1: BARRA DE PESQUISA */}
        <View style={styles.pesquisa}>
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquisar DART por nome, código ou local..."
            placeholderTextColor="#6b6a6a"
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={20} color="#9E9E9E" />
            </TouchableOpacity>
          )}
        </View>

        {/* BLOCO 2: BOTÃO CADASTRAR NOVO DART */}
        <TouchableOpacity
          style={styles.buttonDART}
          activeOpacity={0.8}
          onPress={() => router.push('/dartCadastro' as any)}
        >
          <Ionicons name="add-circle-outline" size={22} color="#000000" />
          <Text style={styles.buttonText}>Cadastrar novo DART</Text>
        </TouchableOpacity>

        {/* BLOCO 3: CARDS DOS DARTs CADASTRADOS (LINKS PARA OS SENSORES) */}
        <View style={styles.dartsCadastrados}>
          <Text style={styles.sectionTitle}>DARTs Cadastrados</Text>

          {dartsFiltrados.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="hardware-chip-outline" size={30} color="#6b6a6a" />
              <Text style={styles.emptyText}>
                {busca.trim()
                  ? 'Nenhum DART encontrado para essa pesquisa.'
                  : 'Nenhum DART cadastrado ainda. Clique no botão acima para adicionar.'}
              </Text>
            </View>
          ) : (
            dartsFiltrados.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.cardDart}
                activeOpacity={0.75}
                onPress={() => router.push(`/dart/${item.id}` as any)}
              >
                <View style={styles.cardInfo}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="analytics-outline" size={22} color="#77af6f" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitulo}>{item.nome}</Text>
                    <Text style={styles.cardSubtitulo}>
                      {item.local
                        ? `${item.local}${item.codigoSensor ? ` • ${item.codigoSensor}` : ''}`
                        : item.codigoSensor || 'Ver parâmetros dos sensores'}
                    </Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={22} color="#77af6f" />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  carrosselContainer: {
    marginBottom: 20,
  },
  pesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
    marginBottom: 14,
  },
  inputPesquisa: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  buttonDART: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#77af6f',
    borderRadius: 10,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dartsCadastrados: {
    gap: 12,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    padding: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#77af6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitulo: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitulo: {
    color: '#777676',
    fontSize: 13,
    marginTop: 2,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 12,
    padding: 24,
    gap: 8,
  },
  emptyText: {
    color: '#9E9E9E',
    textAlign: 'center',
    fontSize: 14,
  },
});