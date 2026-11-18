import { StyleSheet, View, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useSecurePassword } from "../hooks/useSecurePassword";

const { width, height } = Dimensions.get('screen');

export default function Cadastro() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const { savePassword, loading, error } = useSecurePassword();

  async function SignUp() {
    if (!email.trim() || !name.trim() || !password.trim() || !confirmar.trim() || !cpf.trim() || !telefone.trim()) {
      Alert.alert("Erro", "Preencha corretamente os campos para entrar");
      return;
    }
    if (password !== confirmar) {
      Alert.alert("Erro", "O campo confirmar senha precisa ser igual ao campo senha");
      return;
    }

    // Salva a senha usando o e-mail padronizado como chave
    const chaveUsuario = `pass_${email.trim().toLowerCase()}`;
    const isSaved = await savePassword(chaveUsuario, password);

    if (isSaved) {
      Alert.alert("Bem vindo", `Cadastro realizado com ${email}`);
      router.navigate("/(tabs)");
    } else {
      Alert.alert("Erro", error || "Não foi possível salvar os dados com segurança.");
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
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          <Input
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
          />
        </View>
        <View>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Button
              label="Cadastrar"
              onPress={SignUp}
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
    height: 540
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 35,
  }
});
