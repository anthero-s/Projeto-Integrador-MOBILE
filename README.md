# Projeto Música
### Objetivo do projeto
O projeto consiste em um app de **lista de músicas**.

O usuário pode cadastrar músicas informando:

* Nome da música;
* Cantor;
* Gênero;
* Nota.

Além disso, permite:

* Adicionar músicas
* Editar músicas
* Excluir músicas

Os dados são armazenados localmente utilizando o `AsyncStorage`, permitindo que as músicas permaneçam salvas mesmo depois de fechar e abrir o aplicativo novamente.

### Estrutura do projeto

```text
App.js
src/
  screens/
    ListaMusicasScreen.js     # tela das listas de músicas
  components/
    MusicaItem.js             # componente de um item da lista (editar/excluir)
```

### Estado do código

O arquivo `src/screens/ListaMusicasScreen.js` contém a lógica principal do aplicativo, sendo responsável por:

* Carregar as músicas salvas
* Salvar as músicas no `AsyncStorage`
* Adicionar novas músicas
* Editar músicas cadastradas
* Excluir músicas

O arquivo `src/components/MusicaItem.js` é responsável pela exibição de cada música e pelos botões de editar e excluir.
