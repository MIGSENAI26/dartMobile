import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adicionarDartUsuario } from '../utils/dartStorage';

export default function CadastrarDart() {
  const [nome, setNome] = useState('');
  const [codigoSensor, setCodigoSensor] = useState('');
  const [local, setLocal] = useState('');

  async function handleSalvar() {
    if (!nome.trim() || !codigoSensor.trim()) {
      Alert.alert('Atenção', 'Preencha pelo menos o nome e o código do DART.');
      return;
    }

    try {
      const novoDart = {
        id: Date.now().toString(),
        nome: nome.trim(),
        codigoSensor: codigoSensor.trim(),
        local: local.trim(),
      };

      await adicionarDartUsuario(novoDart);

      Alert.alert('Sucesso', 'DART cadastrado com sucesso!');
      router.back();
    } catch (err) {
      console.log('Erro ao salvar DART:', err);
      Alert.alert('Erro', 'Não foi possível salvar o dispositivo.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#77af6f" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastrar Novo DART</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Dispositivo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: DART Setor Norte"
          placeholderTextColor="#6b6a6a"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Código / ID do Hardware *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: DART-001"
          placeholderTextColor="#6b6a6a"
          autoCapitalize="characters"
          value={codigoSensor}
          onChangeText={setCodigoSensor}
        />

        <Text style={styles.label}>Localização / Talhão (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estufa 2 - Solo Argiloso"
          placeholderTextColor="#6b6a6a"
          value={local}
          onChangeText={setLocal}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Salvar DART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  form: {
    gap: 14,
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    color: 'black',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 16
  },
  saveButtonText: {
    color: 'white',
    fontSize: 20,
    
  },
});