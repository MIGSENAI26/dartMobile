import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { ButtonBuy } from '@/components/ButtonBuy';

const FORMAS_PAGAMENTO = ['PIX', 'Cartão de Crédito', 'Boleto Bancário'];

export default function Buy() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');

  // Estados da forma de pagamento
  const [pagamento, setPagamento] = useState('PIX');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [cvvCartao, setCvvCartao] = useState('');
  const [chavePix, setChavePix] = useState('');

  const [unidadesTexto, setUnidadesTexto] = useState('1');

  // Converte o texto digitado em número válido
  const qtdUnidades = Math.max(0, parseInt(unidadesTexto.replace(/[^0-9]/g, ''), 10) || 0);

  // Regra de preço unitário: R$ 499,99 até 9 unidades | R$ 359,99 a partir de 10
  const precoUnitario = qtdUnidades >= 10 ? 359.99 : 499.99;

  // Regra de mensalidade:
  // Até 9: R$ 29,90 | 10 a 30: R$ 39,90 | Acima de 30 (31+): R$ 49,90
  let valorMensalidade = 29.90;
  if (qtdUnidades >= 10 && qtdUnidades <= 30) {
    valorMensalidade = 39.90;
  } else if (qtdUnidades > 30) {
    valorMensalidade = 49.90;
  }

  const valorDispositivos = qtdUnidades * precoUnitario;
  const valorFinal = valorDispositivos;

  // Formata números para o padrão brasileiro (R$ 0.000,00)
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Calcula a janela de entrega (entre 5 e 10 dias a partir da data atual)
  const calcularPrevisaoEntrega = () => {
    const hoje = new Date();
    const dataInicio = new Date(hoje);
    dataInicio.setDate(hoje.getDate() + 5);

    const dataFim = new Date(hoje);
    dataFim.setDate(hoje.getDate() + 10);

    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
    ];

    const dia1 = dataInicio.getDate();
    const dia2 = dataFim.getDate();
    const mes = meses[dataFim.getMonth()];

    return { dia1, dia2, mes };
  };


function limparFormulario() {
    setNome('');
    setEmail('');
    setCpfCnpj('');
    setCep('');
    setUf('');
    setComplemento('');
    setTelefone('');
    setPagamento('PIX');
    setChavePix('');
    setNumeroCartao('');
    setValidadeCartao('');
    setCvvCartao('');
    setUnidadesTexto('1');
  }


    function handleFinalizarCompra() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !cpfCnpj.trim() ||
      !cep.trim() ||
      !uf.trim() ||
      !complemento.trim() ||
      !telefone.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os dados para finalizar a compra.');
      return;
    }

    if (pagamento === 'PIX' && !chavePix.trim()) {
      Alert.alert('Atenção', 'Informe ou cole a sua chave PIX para continuar.');
      return;
    }

    if (pagamento === 'Cartão de Crédito') {
      if (!numeroCartao.trim() || !validadeCartao.trim() || !cvvCartao.trim()) {
        Alert.alert('Atenção', 'Preencha todos os dados do Cartão de Crédito.');
        return;
      }
    }

    if (qtdUnidades <= 0) {
      Alert.alert('Atenção', 'Informe pelo menos 1 unidade para comprar.');
      return;
    }

    if (pagamento === 'PIX' && !chavePix.trim()) {
        Alert.alert('Atenção', 'Informe ou cole a sua chave PIX para continuar.');
        return;
    }

    const { dia1, dia2, mes } = calcularPrevisaoEntrega();

    Alert.alert(
      'Sucesso!',
      `Compra finalizada! Chegará entre os dias ${dia1} e ${dia2} de ${mes}.`,
      [
        {
          text: 'OK',
          onPress: limparFormulario,
        },
      ]
    );
  }

      return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header name="DART" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Adquira seu DART</Text>
        <Text style={styles.subtitle}>
          Preencha seus dados abaixo para calcular o pedido
        </Text>

        {/* Campos de Dados Pessoais e Endereço */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome completo</Text>
          <Input
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>E-mail</Text>
          <Input
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>CPF / CNPJ</Text>
          <Input
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
          />

          <Text style={styles.label}>CEP</Text>
          <Input
            placeholder="00000-000"
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
          />

          <Text style={styles.label}>UF</Text>
          <Input
            placeholder="SP"
            maxLength={2}
            autoCapitalize="characters"
            value={uf}
            onChangeText={setUf}
          />

          <Text style={styles.label}>Número e Complemento</Text>
          <Input
            placeholder="000 / Casa, Apto, Fazenda..."
            value={complemento}
            onChangeText={setComplemento}
          />

          <Text style={styles.label}>Telefone</Text>
          <Input
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          {/* Seletor (Select) de Forma de Pagamento */}
          <Text style={styles.label}>Forma de pagamento</Text>
          <View style={styles.selectContainer}>
            {FORMAS_PAGAMENTO.map((opcao) => {
              const selecionada = pagamento === opcao;
              return (
                <TouchableOpacity
                  key={opcao}
                  activeOpacity={0.7}
                  style={[
                    styles.selectOption,
                    selecionada && styles.selectOptionActive,
                  ]}
                  onPress={() => {
                    setPagamento(opcao);
                  }}
                >
                  <Text
                    style={[
                      styles.selectText,
                      selecionada && styles.selectTextActive,
                    ]}
                  >
                    {opcao}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Área funcional que muda conforme a Forma de Pagamento */}
          {pagamento === 'PIX' && (
        <View style={styles.paymentBox}>
        <Text style={styles.paymentBoxTitle}>Pagamento via PIX</Text>
        <Text style={styles.paymentBoxDesc}>
            Cole ou digite sua chave PIX (CPF, e-mail, telefone ou chave aleatória):
        </Text>
        <Input
            placeholder="Cole aqui sua chave PIX"
            autoCapitalize="none"
            value={chavePix}
            onChangeText={setChavePix}
            />
        </View>
)}


          {pagamento === 'Cartão de Crédito' && (
            <View style={styles.paymentBox}>
              <Text style={styles.paymentBoxTitle}>Dados do Cartão</Text>
              <Input
                placeholder="Número do Cartão"
                keyboardType="numeric"
                maxLength={16}
                value={numeroCartao}
                onChangeText={setNumeroCartao}
              />
              <Input
                placeholder="Validade (MM/AA)"
                keyboardType="numeric"
                maxLength={5}
                value={validadeCartao}
                onChangeText={setValidadeCartao}
              />
                            <Input
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                value={cvvCartao}
                onChangeText={setCvvCartao}
              />
            </View>
          )}

          {pagamento === 'Boleto Bancário' && (
            <View style={styles.paymentBox}>
              <Text style={styles.paymentBoxTitle}>Boleto Bancário</Text>
              <Text style={styles.paymentBoxDesc}>
                O boleto será enviado para o seu e-mail com vencimento em 3 dias úteis.
              </Text>
            </View>
          )}

          {/* Quantidade de Unidades */}
          <Text style={styles.label}>Unidades</Text>
          <Input
            placeholder="Quantidade de dispositivos"
            keyboardType="numeric"
            value={unidadesTexto}
            onChangeText={setUnidadesTexto}
          />
          {qtdUnidades >= 10 && (
            <Text style={styles.discountBadge}>
              Desconto atacado aplicado! (R$ 359,99 por unidade)
            </Text>
          )}
        </View>

        {/* Resumo Financeiro Automático */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pagamento:</Text>
            <Text style={styles.summaryValue}>{pagamento}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor unitário:</Text>
            <Text style={styles.summaryValue}>{formatarMoeda(precoUnitario)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Mensalidade (plano):</Text>
            <Text style={styles.summaryValue}>
              {formatarMoeda(valorMensalidade)} / mês
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Valor Final:</Text>
            <Text style={styles.totalValue}>{formatarMoeda(valorFinal)}</Text>
          </View>
        </View>

        {/* Botão Finalizar */}
        <View style={styles.buttonWrapper}>
          <ButtonBuy label="Comprar" onPress={handleFinalizarCompra} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#121212',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    marginTop: 2,
  },
  formGroup: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 4,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#f9f9f9',
  },
  selectOptionActive: {
    backgroundColor: '#77af6f',
    borderColor: '#77af6f',
  },
  selectText: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '500',
  },
  selectTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  paymentBox: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 14,
    gap: 10,
    marginTop: 4,
  },
  paymentBoxTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  paymentBoxDesc: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
  },
  copyButton: {
    backgroundColor: '#e8f3e6',
    borderWidth: 1,
    borderColor: '#77af6f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#3b6e34',
    fontWeight: 'bold',
    fontSize: 13,
  },
  discountBadge: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#f4f8f3',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#d5e6d2',
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  divider: {
    height: 1,
    backgroundColor: '#d5e6d2',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#121212',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4c8244',
  },
  buttonWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
});
