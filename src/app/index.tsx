import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import {TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform} from "react-native";
import {useFonts} from 'expo-font';
import {router} from "expo-router";
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const { width, height } = Dimensions.get('screen');

export default function Index() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");

    function SignUp(){
        if (!email.trim() || !name.trim() || !password.trim() || !confirmar.trim()){
            Alert.alert("Erro", `preencha corretamente os campos para entrar`);
            return;
        }
        else if (password != confirmar){
            Alert.alert("Erro", `o campo confirmar senha precisa ser igual ao campo senha`);
            return;
        }
        Alert.alert("Bem vindo", `Login realizado com ${email}`);
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
        <Button 
            label="Entrar"
            onPress={SignUp}
        />
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
    alignItems: "center"
  }
});
