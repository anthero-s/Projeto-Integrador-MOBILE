import { useEffect, useState } from "react";

import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MusicaItem from "../components/musica";

export default function PlaylistMusic() {
  const [textoInput, setTextoInput] = useState("");
  const [nomeMusica, setnomeMusica] = useState([]);
  const [cantor, setCantor] = useState([]);
  const [genero, setGenero] = useState([]);
  const [nota, setNota] = useState([]);
  

  const [carregou, setCarregou] = useState(false);
  const [musicaEditando, setTarefaEditando] = useState(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  useEffect(() => {
    carregarMusica();
  }, []);

  useEffect(() => {
    if (carregou) {
      salvarMusica();
    }
  }, [musica, carregou]);

  async function carregarMusica() {
    try {
      const musicaSalvas = await AsyncStorage.getItem("musica");

      if (musicaSalvas) {
        const musicaConvertidas = JSON.parse(musicaSalvas);
        // verificar se cada musica tem um texto
        const musicaCorrigidas = tarefasConvertidas.map((musicas) => ({
          ...musicas,
          texto: musicas.texto || musicas.titulo || "",
        }));

        setnomeMusica(musicaCorrigidas);
      }
    } catch (erro) {
      console.log("Erro ao carregar musicas:", erro);
    } finally {
      setCarregou(true);
    }
  }

  async function salvarMusica() {
    try {
      const musicaTexto = JSON.stringify(musica);
      await AsyncStorage.setItem("musica", musicaTexto);
    } catch (erro) {
      console.log("Erro ao salvar musicas:", erro);
    }
  }

  function adicionarMusica() {
    // vê se não esta vazio
    if (textoInput.trim() === "") {
      return;
    }

    const novaMusica = {
      id: Date.now().toString(), // id unico
      texto: textoInput.trim(), // texto da musica
      concluida: false,
    };

    setMusica((musicaAtuais) => [...musicaAtuais, novaMusicas]);
    setTextoInput("");
  }

  function alternarConcluida(id) {
    setMusica((musicaAtuais) =>
      musicaAtuais.map((musicas) =>
        musicas.id === id
          ? {
              ...musicas,
              concluida: !musicas.concluida,
            }
          : musicas
      )
    );
  }

  function excluirMusica(id) {
    setMusica((musicaAtuais) =>
      musicaAtuais.filter((musicas) => musicas.id !== id)
    );
  }

  function editarMusicas(id) {
    const musicas = musica.find((musicas) => musicas.id === id);

    if (!musicas) {
      return;
    }

    setMusicaEditando(musicas);
    setTextoEdicao(musicas.texto);
  }

  function salvarEdicao() {
    if (textoEdicao.trim() === "") {
      return;
    }

    setMusica((musicaAtuais) =>
      musicaAtuais.map((musicas) =>
        musicas.id === musicasEditando.id
          ? {
              ...musicas,
              texto: textoEdicao.trim(),
            }
          : musicas
      )
    );

    setMusicasEditando(null);
    setTextoEdicao("");
  }

  function cancelarEdicao() {
    setMusicaEditando(null);
    setTextoEdicao("");
  }

  function limparTodas() {
    Alert.alert(
      "Limpar musica",
      "Tem certeza que deseja apagar todas as msuicas?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar",
          style: "destructive",
          onPress: () => {
            setMusica([]);
          },
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Playlist Music</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova musica..."
          value={textoInput}
          onChangeText={setTextoInput}
          onSubmitEditing={adicionarMusicas}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarMusicas}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {musica.length > 0 && (
        <TouchableOpacity style={styles.botaoLimpar} onPress={limparTodas}>
          <Text style={styles.textoBotaoLimpar}>
            Limpar todas as musicas
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={musica}
        keyExtractor={(musicas) => musicas.id}
        renderItem={({ item }) => (
          <MusicasItem
            musicas={item}
            aoAlternarConcluida={() => alternarConcluida(item.id)}
            aoExcluir={() => excluirMusicas(item.id)}
            aoEditar={() => editarMusicas(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma musica cadastrada.
          </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />

      <Modal
        visible={musicasEditando !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelarEdicao}
      >
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Editar musica</Text>

            <TextInput
              style={styles.inputEdicao}
              value={textoEdicao}
              onChangeText={setTextoEdicao}
              placeholder="Digite uma nova musica..."
              autoFocus={true}
            />

            <View style={styles.botoesModal}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarEdicao}
              >
                <Text style={styles.textoBotaoModal}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarEdicao}
              >
                <Text style={styles.textoBotaoModal}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0fa",
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  formulario: {
    flexDirection: "row",
    marginBottom: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },

  botaoAdicionar: {
    backgroundColor: "##7B2CBF",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  textoBotaoAdicionar: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoLimpar: {
    backgroundColor: "#9D4EDDaa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  textoBotaoLimpar: {
    color: "#fff",
    fontWeight: "bold",
  },

  listaConteudo: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  listaVazia: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },

  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  inputEdicao: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  botoesModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  botaoCancelar: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  botaoSalvar: {
    backgroundColor: "#2e86de",
    padding: 10,
    borderRadius: 6,
  },

  textoBotaoModal: {
    color: "#fff",
    fontWeight: "bold",
  },
});