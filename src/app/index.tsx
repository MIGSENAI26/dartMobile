import { StyleSheet, View, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Link, router } from "expo-router";
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSecurePassword } from "../hooks/useSecurePassword";

const { width, height } = Dimensions.get('screen');

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Usando getPassword para buscar e validar a senha cadastrada
  const { getPassword, loading, error } = useSecurePassword();

  async function SignIn() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha corretamente os campos para entrar!");
      return;
    }

    // Padroniza a chave igual às telas de Cadastro e Esqueci minha senha
    const chaveUsuario = `pass_${email.trim().toLowerCase()}`;
    const senhaSalva = await getPassword(chaveUsuario);

    if (error) {
      Alert.alert("Erro", error);
      return;
    }

    if (!senhaSalva) {
      Alert.alert("Erro", "Conta não encontrada. Faça seu cadastro primeiro.");
      return;
    }

    if (senhaSalva !== password) {
      Alert.alert("Erro", "Senha incorreta!");
      return;
    }

    Alert.alert("Bem vindo", `${email}!`);
    router.navigate("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/videos/VideoIntro.gif')}
        style={styles.backgroundGif}
        contentFit="cover"
      />

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="E-mail"
            placeholderTextColor="#6b6a6a"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            placeholderTextColor="#6b6a6a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.link}>
            <Text>
              Não tem conta?
            </Text>
            <Link href="/cadastro" style={{ color: '#fefefe', textDecorationLine: 'underline', fontWeight: "bold" }}>
              Cadastre-se
            </Link>
          </View>
          <Link href="/senha" style={{ color: '#ffffff', textDecorationLine: 'underline', fontWeight: "bold", marginTop: -15 }}>
            Esqueci minha senha
          </Link>
        </View>

        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Button
              label="Entrar "
              onPress={SignIn}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundGif: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  form: {
    marginTop: -30,
    gap: 12,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#77af6f",
    borderRadius: 12,
    width: 350,
    height: 310
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 35,
  },
  link: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: -15
  }
});


