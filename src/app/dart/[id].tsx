import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarDartPorIdUsuario, excluirDartUsuario, DartDevice } from '../../utils/dartStorage';

export default function DartDetalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [dart, setDart] = useState<DartDevice | null>(null);

  useEffect(() => {
    async function buscarDart() {
      try {
        if (!id) return;
        const encontrado = await buscarDartPorIdUsuario(id);
        if (encontrado) setDart(encontrado);
      } catch (err) {
        console.log('Erro ao buscar detalhes do DART:', err);
      }
    }
    buscarDart();
  }, [id]);

  async function executarExclusao() {
    try {
      if (!id) return;
      await excluirDartUsuario(id);
      router.back();
    } catch (err) {
      console.log('Erro ao excluir DART:', err);
      if (Platform.OS !== 'web') {
        Alert.alert('Erro', 'Não foi possível excluir este dispositivo.');
      }
    }
  }

  function handleExcluirDart() {
    if (Platform.OS === 'web') {
      executarExclusao();
      return;
    }

    Alert.alert(
      'Excluir DART',
      `Tem certeza que deseja excluir "${dart?.nome || 'este DART'}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: executarExclusao,
        },
      ]
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#77af6f" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteTopButton}
          onPress={handleExcluirDart}
          activeOpacity={0.75}
        >
          <Ionicons name="trash-outline" size={20} color="#d93838" />
          <Text style={styles.deleteTopText}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{dart ? dart.nome : 'Carregando...'}</Text>
        {dart?.codigoSensor && (
          <Text style={styles.subtitle}>Código: {dart.codigoSensor}</Text>
        )}
        {dart?.local ? (
          <Text style={styles.subtitle}>Local: {dart.local}</Text>
        ) : null}

        <Text style={styles.sectionTitle}>Parâmetros dos Sensores</Text>

        {/* Grid de cards dos sensores */}
        <View style={styles.grid}>
          <View style={styles.sensorCard}>
            <Ionicons name="water-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>Umidade</Text>
            <Text style={styles.sensorValue}>64%</Text>
          </View>

          <View style={styles.sensorCard}>
            <Ionicons name="thermometer-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>Temperatura</Text>
            <Text style={styles.sensorValue}>26.5 °C</Text>
          </View>

          <View style={styles.sensorCard}>
            <Ionicons name="flask-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>pH do Solo</Text>
            <Text style={styles.sensorValue}>6.2</Text>
          </View>

          <View style={styles.sensorCard}>
            <Ionicons name="leaf-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>Nitrogênio</Text>
            <Text style={styles.sensorValue}>42 mg/kg</Text>
          </View>

          <View style={styles.sensorCard}>
            <Ionicons name="flash-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>Fósforo</Text>
            <Text style={styles.sensorValue}>18 mg/kg</Text>
          </View>

          <View style={styles.sensorCard}>
            <Ionicons name="shield-checkmark-outline" size={28} color="#77af6f" />
            <Text style={styles.sensorLabel}>Potássio</Text>
            <Text style={styles.sensorValue}>115 mg/kg</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    color: 'black',
    fontSize: 16,
  },
  deleteTopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d93838',
    backgroundColor: '#fff5f5',
  },
  deleteTopText: {
    color: '#d93838',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#636161',
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 26,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  sensorCard: {
    width: '48%',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2E2E2E',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  sensorLabel: {
    color: '#CCCCCC',
    fontSize: 13,
  },
  sensorValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});