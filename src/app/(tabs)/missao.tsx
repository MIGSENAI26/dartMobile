import { Header } from "@/components/Header";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Missao(){
    return(
        <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        <View style={styles.container}>
            <Header 
                name="DART"
            />
            <View style={styles.missaoContainer}>
                <View style={styles.missao}>
                    <Text style={styles.title}>
                        Missão
                    </Text>
                    <Text style={styles.missaoText}>
                        Nossa missão é contribuir para o monitoramento ambiental 
                        por meio do sensoriamento remoto do solo.
                    </Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.title}>
                        Perguntas frequentes
                    </Text>
                    <View style={styles.faqCard}>
                        <View style={styles.questions}>
                            <Text style={styles.faqTextBold}>
                                Quem são os fundadores do DART?
                            </Text>
                            <Text style={styles.faqText}>
                                Os estudantes Miguel Cabral da Silva, 
                                Mariane Polanzan, Isabele Frascarelli e 
                                Kauan Rossi da turma de Desenvolvimento de Sistemas 2026 SESI/SENAI.
                            </Text>
                        </View>
                        <View style={styles.questions}>
                            <Text style={styles.faqTextBold}>
                                Como o DART funciona?
                            </Text>
                            <Text style={styles.faqText}>
                                O DART se baseia num projeto que integra hardware e 
                                software para realizar o monitoramento do solo. Para tal,
                                ele utiliza um dispositivo físico, com microcontroladores,
                                conectado a uma API que, por sua vez, é consumida por este app.
                            </Text>
                        </View>
                        <View style={styles.questions}>
                            <Text style={styles.faqTextBold}>
                                Qual o valor do dispositivo físico?
                            </Text>
                            <Text style={styles.faqText}>
                                Em compras unitárias, o preço é de R$ 499,99. 
                                No entanto, a partir de 10 unidades compradas, 
                                o preço por dispositivo cai para R$ 359,99.
                            </Text>
                        </View>
                        <View style={styles.questions}>
                            <Text style={styles.faqTextBold}>
                                Para utilizar o DART, é necessário pagar mensalidade?
                            </Text>
                            <Text style={styles.faqText}>
                                Sim. Caso o cliente tenha comprado até 9 unidades do produto, a mensalidade será de R$ 29,90.
                                Caso tenha comprado entre 10 a 30 unidades, a mensalidade subirá para R$ 39,90.
                                E caso tenha comprado acima de 31 unidades, a mensalidade subirá para R$ 49,90.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
           
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    missaoContainer:{
        flex: 1,
        marginTop: 25,
        marginLeft: 20,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 30,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 350
    },
    missao:{
        flex: 1,
        backgroundColor: "#77af6f",
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: "solid",
        borderColor: "#30ed0a",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 350,
        padding: 10
    },
    missaoText:{
        color: "#fff",
        textAlign: "center"
    },
    faq:{
        flex: 1,
        backgroundColor: "#77af6f",
        borderWidth: 2,
        borderRadius: 12,
        borderStyle: "solid",
        borderColor: "#30ed0a",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 350,
        padding: 10
    },
    faqCard:{

    },
    title:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 26,
        marginBottom: 15
    },
    faqTextBold:{
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 5
    },
    faqText:{
        color: "#fff",
    },
    questions:{
        marginBottom: 15
    }
})