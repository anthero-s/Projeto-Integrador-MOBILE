import { useEffect, useState } from "react";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PlaylistMusic() {

  const [musica, setMusica] = useState([]);

  const [nomeMusica, setNomeMusica] = useState("");
  const [cantor, setCantor] = useState("");
  const [genero, setGenero] = useState("");
  const [nota, setNota] = useState("");

  const [musicaEditando, setMusicaEditando] = useState(null);

  useEffect(() => {
    carregarMusicas();
  }, []);

  useEffect(() => {
    salvarMusicas();
  }, [musica]);

  async function carregarMusicas() {
    const dados = await AsyncStorage.getItem("musicas");

    if (dados) {
      setMusica(JSON.parse(dados));
    }
  }

  async function salvarMusicas() {
    await AsyncStorage.setItem(
      "musicas",
      JSON.stringify(musica)
    );
  }

  function adicionarMusica() {

    if (
      nomeMusica.trim() === "" ||
      cantor.trim() === "" ||
      genero.trim() === "" ||
      nota.trim() === ""
    ) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const novaMusica = {
      id: Date.now().toString(),
      nome: nomeMusica,
      cantor: cantor,
      genero: genero,
      nota: nota,
    };

    setMusica([...musica, novaMusica]);

    setNomeMusica("");
    setCantor("");
    setGenero("");
    setNota("");
  }

  function editarMusica(id) {

    const item = musica.find((item) => item.id === id);

    setMusicaEditando(item);

    setNomeMusica(item.nome);
    setCantor(item.cantor);
    setGenero(item.genero);
    setNota(item.nota);
  }

  function salvarEdicao() {

    if (
      nomeMusica.trim() === "" ||
      cantor.trim() === "" ||
      genero.trim() === "" ||
      nota.trim() === ""
    ) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const listaAtualizada = musica.map((item) => {

      if (item.id === musicaEditando.id) {

        return {
          ...item,
          nome: nomeMusica,
          cantor: cantor,
          genero: genero,
          nota: nota,
        };

      }

      return item;
    });

    setMusica(listaAtualizada);

    setMusicaEditando(null);

    setNomeMusica("");
    setCantor("");
    setGenero("");
    setNota("");
  }

  function excluirMusica(id) {

    const listaAtualizada = musica.filter(
      (item) => item.id !== id
    );

    setMusica(listaAtualizada);
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Playlist Music
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da música"
        value={nomeMusica}
        onChangeText={setNomeMusica}
      />

      <TextInput
        style={styles.input}
        placeholder="Cantor"
        value={cantor}
        onChangeText={setCantor}
      />

      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
      />

      <TextInput
        style={styles.input}
        placeholder="Nota"
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={
          musicaEditando
            ? salvarEdicao
            : adicionarMusica
        }
      >

        <Text style={styles.textoBotao}>
          {musicaEditando
            ? "Salvar edição"
            : "Adicionar"}
        </Text>

      </TouchableOpacity>

      <FlatList
        data={musica}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (

          <View style={styles.item}>

            <View style={styles.nomeContainer}>

              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text>
                Cantor: {item.cantor}
              </Text>

              <Text>
                Gênero: {item.genero}
              </Text>

              <Text>
                Nota: {item.nota}
              </Text>

            </View>

            <TouchableOpacity
              style={styles.editar}
              onPress={() => editarMusica(item.id)}
            >

              <Text>
                Editar
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.excluir}
              onPress={() => excluirMusica(item.id)}
            >

              <Text style={styles.textoExcluir}>
                Excluir
              </Text>

            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f0fa",
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#7B2CBF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  nomeContainer: {
    flex: 1,
  },

  nome: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  editar: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },

  excluir: {
    backgroundColor: "#e63946",
    padding: 8,
    borderRadius: 5,
  },

  textoExcluir: {
    color: "#fff",
  },

});