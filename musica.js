import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";

export default function MusicasItem({
  musicas,
  aoAlternarConcluida,
  aoExcluir,
  aoEditar,
}) {

  return (
    <View style={styles.item}>

      {/* Texto da tarefa */}
      <TouchableOpacity // cria uma área que pode ser clicada/tocada.
        style={styles.textoContainer}
        onPress={() => aoAlternarConcluida(musicas.id)} // quando clicar chama a funcao e passa o id da tarefa
      >
        <Text style={[ styles.texto, musicas.concluida && styles.textoConcluido,]}>
          {tarefa.texto}
        </Text>
      </TouchableOpacity>


      {/* Botão EDITAR */}
      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => aoEditar(musicas.id)}
      > 
        <Text style={styles.textoBotaoEditar}> 
          Editar
        </Text>
      </TouchableOpacity>


      {/* Botão EXCLUIR */}
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(tarefa.id)}
      >
        <Text style={styles.textoBotaoExcluir}>
          Excluir
        </Text>
      </TouchableOpacity>

    </View>
  );
}

// estilos
const styles = StyleSheet.create({

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    elevation: 2,
  },

  textoContainer: {
    flex: 1,
    marginRight: 10,
  },

  texto: {
    fontSize: 16,
    color: "#222",
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  botaoEditar: {
    backgroundColor: "#f39c12",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
  },

  textoBotaoEditar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  botaoExcluir: {
    backgroundColor: "#e74c3c",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  textoBotaoExcluir: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});