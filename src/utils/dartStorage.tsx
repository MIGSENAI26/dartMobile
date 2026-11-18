import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DartDevice {
  id: string;
  nome: string;
  codigoSensor?: string;
  local?: string;
}

// Descobre a chave exclusiva do usuário logado no momento
async function getChaveUsuario(): Promise<string> {
  const userSalvo = await AsyncStorage.getItem('@app:usuario_logado');
  if (!userSalvo) return '@app:darts_anonimo';

  try {
    const userObj = JSON.parse(userSalvo);
    // Se for objeto, pega email, id ou nome de usuário
    const idUnico =
      typeof userObj === 'object'
        ? userObj.email || userObj.id || userObj.usuario || userSalvo
        : userObj;
    return `@app:darts_${idUnico}`;
  } catch {
    // Se você salvou apenas uma string simples (ex: "joao@email.com")
    return `@app:darts_${userSalvo}`;
  }
}

// 1. Listar DARTs da conta logada
export async function listarDartsUsuario(): Promise<DartDevice[]> {
  const chave = await getChaveUsuario();
  const dados = await AsyncStorage.getItem(chave);
  return dados ? JSON.parse(dados) : [];
}

// 2. Salvar novo DART apenas na conta logada
export async function adicionarDartUsuario(novoDart: DartDevice): Promise<void> {
  const chave = await getChaveUsuario();
  const listaAtual = await listarDartsUsuario();
  await AsyncStorage.setItem(chave, JSON.stringify([...listaAtual, novoDart]));
}

// 3. Buscar um DART específico pelo ID na conta logada
export async function buscarDartPorIdUsuario(id: string): Promise<DartDevice | undefined> {
  const lista = await listarDartsUsuario();
  return lista.find((item) => item.id === id);
}

// 4. Excluir um DART apenas da conta logada
export async function excluirDartUsuario(id: string): Promise<void> {
  const chave = await getChaveUsuario();
  const listaAtual = await listarDartsUsuario();
  const novaLista = listaAtual.filter((item) => item.id !== id);
  await AsyncStorage.setItem(chave, JSON.stringify(novaLista));
}