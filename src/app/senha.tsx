import { StyleSheet, View, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Link, router } from "expo-router";
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSecurePassword } from "../hooks/useSecurePassword";

const { width, height } = Dimensions.get('screen');

export default function Senha() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const { getPassword, savePassword, loading, error } = useSecurePassword();

  async function ResetPassword() {
    if (!email.trim() || !password.trim() || !confirmar.trim()) {
      Alert.alert("Erro", "Preencha corretamente os campos para entrar!");
      return;
    }
    if (password !== confirmar) {
      Alert.alert("Erro", "O campo confirmar senha precisa ser igual ao campo senha");
      return;
    }

    const chaveUsuario = `pass_${email.trim().toLowerCase()}`;

    // Verifica se o e-mail existe salvo no dispositivo antes de trocar
    const senhaAntiga = await getPassword(chaveUsuario);
    if (!senhaAntiga) {
      Alert.alert("Erro", "Nenhuma conta encontrada com este e-mail neste dispositivo.");
      return;
    }

    // Sobrescreve a senha antiga pela nova
    const isUpdated = await savePassword(chaveUsuario, password);

    if (isUpdated) {
      Alert.alert("Sucesso", "Senha atualizada! Bem-vindo de volta.");
      router.navigate("/(tabs)");
    } else {
      Alert.alert("Erro", error || "Não foi possível atualizar a senha.");
    }
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
            placeholder="Confirme seu e-mail"
            placeholderTextColor="#6b6a6a"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Nova senha"
            placeholderTextColor="#6b6a6a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirmar senha"
            placeholderTextColor="#6b6a6a"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />
          <View style={styles.link}>
            <Text>
              Não tem conta?
            </Text>
            <Link href="/cadastro" style={{ color: '#77af6f', textDecorationLine: 'underline', fontWeight: "bold" }}>
              Cadastre-se
            </Link>
          </View>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Button
              label="Entrar "
              onPress={ResetPassword}
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
  form: {
    marginTop: -30,
    gap: 12,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    width: 350,
    height: 370
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
