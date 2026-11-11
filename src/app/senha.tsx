import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import {TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform} from "react-native";
import {useFonts} from 'expo-font';
import {Link, router} from "expo-router";
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const { width, height } = Dimensions.get('screen');

export default function Senha() {
    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmar, setConfirmar] = useState("");

    function SignIn(){
        if (!name.trim() || !password.trim()){
            Alert.alert("Erro", `Preencha corretamente os campos para entrar!`);
            return;
        }
        Alert.alert("Bem vindo", `${name}!`);
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
              placeholder="Usuário"
              placeholderTextColor="#6b6a6a"
              onChangeText={setName}
          />
          <Input
              placeholder="Senha"
              placeholderTextColor="#6b6a6a"
              secureTextEntry
              onChangeText={setPassword}
          />
          <View style={styles.link}>
            <Text>
              Não tem conta?
            </Text>
            <Link href="/cadastro" style={{ color: '#fefefe', textDecorationLine: 'underline' , fontWeight: "bold"}}>
              Cadastre-se
            </Link>
          </View>
          <Link href="/cadastro" style={{ color: '#ffffff', textDecorationLine: 'underline' , fontWeight: "bold", marginTop: -15}}>
              Esqueci minha senha
          </Link>
        </View>
        <View>
          <Button
              label="Entrar "
              onPress={SignIn}
          />
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
  form:{
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
  inputContainer:{
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 35,
  },
  link:{
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: -15
  }
});