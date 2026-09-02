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

  // Campos para cadastrar uma música
  const [nomeMusica, setNomeMusica] = useState("");
  const [cantor, setCantor] = useState("");
  const [genero, setGenero] = useState("");
  const [nota, setNota] = useState("");


  //Lista de músicas
  const [musicas, setMusicas] = useState([]);
  const [carregou, setCarregou] = useState(false);


  //Campos usados durante a edição
  const [musicaEditando, setMusicaEditando] = useState(null);
  const [nomeEdicao, setNomeEdicao] = useState("");
  const [cantorEdicao, setCantorEdicao] = useState("");
  const [generoEdicao, setGeneroEdicao] = useState("");
  const [notaEdicao, setNotaEdicao] = useState("");
  useEffect(() => {
    carregarMusicas();
  }, []);
  useEffect(() => {
    if (carregou) {
      salvarMusicas();
    }
  }, [musicas, carregou]);
  async function carregarMusicas() {
    try {
      const musicasSalvas = await AsyncStorage.getItem("musicas");
      if (musicasSalvas) {
        const musicasConvertidas = JSON.parse(musicasSalvas);
        setMusicas(musicasConvertidas);
      }
    } catch (erro) {
      console.log("Erro ao carregar musicas:", erro);
    } finally {
      setCarregou(true);
    }
  }
  async function salvarMusicas() {
    try {
      const musicasTexto = JSON.stringify(musicas);
      await AsyncStorage.setItem("musicas", musicasTexto);
    } catch (erro) {
      console.log("Erro ao salvar musicas:", erro);
    }
  }
  function adicionarMusica() {
    if (
      nomeMusica.trim() === "" ||
      cantor.trim() === "" ||
      genero.trim() === "" ||
      nota.trim() === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    const novaMusica = {
      id: Date.now().toString(),
      nome: nomeMusica.trim(),
      cantor: cantor.trim(),
      genero: genero.trim(),
      nota: nota.trim(),
    };
    setMusicas((musicasAtuais) => [...musicasAtuais, novaMusica]);
    setNomeMusica("");
    setCantor("");
    setGenero("");
    setNota("");
  }
  function excluirMusica(id) {
    setMusicas((musicasAtuais) =>
      musicasAtuais.filter((musica) => musica.id !== id),
    );
  }
  function editarMusica(id) {
    const musica = musicas.find((musica) => musica.id === id);
    if (!musica) {
      return;
    }
    setMusicaEditando(musica);
    setNomeEdicao(musica.nome);
    setCantorEdicao(musica.cantor);
    setGeneroEdicao(musica.genero);
    setNotaEdicao(musica.nota);
  }
  function salvarEdicao() {
    if (
      nomeEdicao.trim() === "" ||
      cantorEdicao.trim() === "" ||
      generoEdicao.trim() === "" ||
      notaEdicao.trim() === ""
    ) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    setMusicas((musicasAtuais) =>
      musicasAtuais.map((musica) =>
        musica.id === musicaEditando.id
          ? {
              ...musica,
              nome: nomeEdicao.trim(),
              cantor: cantorEdicao.trim(),
              genero: generoEdicao.trim(),
              nota: notaEdicao.trim(),
            }
          : musica,
      ),
    );
    cancelarEdicao();
  }
  function cancelarEdicao() {
    setMusicaEditando(null);
    setNomeEdicao("");
    setCantorEdicao("");
    setGeneroEdicao("");
    setNotaEdicao("");
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {" "}
      <Text style={styles.titulo}>Playlist Music</Text>{" "}
      <View style={styles.formulario}>
        {" "}
        <TextInput
          style={styles.input}
          placeholder="Nome da música"
          value={nomeMusica}
          onChangeText={setNomeMusica}
        />{" "}
        <TextInput
          style={styles.input}
          placeholder="Cantor"
          value={cantor}
          onChangeText={setCantor}
        />{" "}
        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />{" "}
        <TextInput
          style={styles.input}
          placeholder="Nota"
          value={nota}
          onChangeText={setNota}
          keyboardType="numeric"
        />{" "}
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarMusica}
        >
          {" "}
          <Text style={styles.textoBotaoAdicionar}> Adicionar </Text>{" "}
        </TouchableOpacity>{" "}
      </View>{" "}
      <FlatList
        data={musicas}
        keyExtractor={(musica) => musica.id}
        renderItem={({ item }) => (
          <MusicaItem
            musica={item}
            aoEditar={() => editarMusica(item.id)}
            aoExcluir={() => excluirMusica(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}> Nenhuma musica cadastrada. </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />{" "}
      <Modal
        visible={musicaEditando !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelarEdicao}
      >
        {" "}
        <View style={styles.fundoModal}>
          {" "}
          <View style={styles.modal}>
            {" "}
            <Text style={styles.tituloModal}> Editar musica </Text>{" "}
            <TextInput
              style={styles.inputEdicao}
              placeholder="Nome da música"
              value={nomeEdicao}
              onChangeText={setNomeEdicao}
            />{" "}
            <TextInput
              style={styles.inputEdicao}
              placeholder="Cantor"
              value={cantorEdicao}
              onChangeText={setCantorEdicao}
            />{" "}
            <TextInput
              style={styles.inputEdicao}
              placeholder="Gênero"
              value={generoEdicao}
              onChangeText={setGeneroEdicao}
            />{" "}
            <TextInput
              style={styles.inputEdicao}
              placeholder="Nota"
              value={notaEdicao}
              onChangeText={setNotaEdicao}
              keyboardType="numeric"
            />{" "}
            <View style={styles.botoesModal}>
              {" "}
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarEdicao}
              >
                {" "}
                <Text style={styles.textoBotaoModal}> Cancelar </Text>{" "}
              </TouchableOpacity>{" "}
              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvarEdicao}
              >
                {" "}
                <Text style={styles.textoBotaoModal}> Salvar </Text>{" "}
              </TouchableOpacity>{" "}
            </View>{" "}
          </View>{" "}
        </View>{" "}
      </Modal>{" "}
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
  formulario: { marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  botaoAdicionar: {
    backgroundColor: "#7B2CBF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  textoBotaoAdicionar: { color: "#fff", fontWeight: "bold" },
  listaConteudo: { paddingBottom: 20, flexGrow: 1 },
  listaVazia: { textAlign: "center", color: "#888", marginTop: 24 },
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
  tituloModal: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  inputEdicao: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  botoesModal: { flexDirection: "row", justifyContent: "flex-end" },
  botaoCancelar: {
    backgroundColor: "#777",
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  botaoSalvar: { backgroundColor: "#7B2CBF", padding: 10, borderRadius: 6 },
  textoBotaoModal: { color: "#fff", fontWeight: "bold" },
});
