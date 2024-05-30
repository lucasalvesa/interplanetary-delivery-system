# Interplanetary Delivery System 🚀🪐

## Visão Geral

Boas-vindas ao **Interplanetary Delivery System**! Este projeto foi desenvolvido para automatizar o processo de entrega entre a Terra e Marte. Um sistema robusto e intuitivo que permite o cadastro e edição de endereços para os dois planetas, considerando suas respectivas particularidades.

## Funcionalidades Principais

✔️ **Formulários Condicionais**: Exibição dinâmica de campos do formulário com base no planeta selecionado.

✔️ **Endereço na Terra**: Oferece um conjunto completo de campos para inserção de endereços, abrangendo país, estado, cidade, CEP, rua, número da casa, bairro e complemento. Para garantir uma experiência mais fluida, foi implementado um mecanismo de filtragem dinâmica que otimiza a seleção de países, estados e cidades. Isso significa que as listas (seja de países ou estados ou cidades) disponíveis se ajustam dinamicamente para incluir apenas dados relacionados entre si, proporcionando uma experiência de preenchimento de formulário mais intuitiva e eficiente.
 
✔️ **Endereço em Marte**: Inclui campos para o nome da fábrica e número do lote de quatro dígitos.

✔️ **Edição de Endereço**: Permite a edição dos endereços cadastrados com um formulário intuitivo.

✔️ **Validação de Dados**: Implementação de validação rigorosa para garantir a integridade dos dados inseridos.

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção da interface do usuário. O Vite foi a ferramenta de construção do projeto.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- [**React Bootstrap**](https://react-bootstrap.netlify.app/docs/getting-started/introduction): Biblioteca para componentes UI.
- [**React Hook Form**](https://react-hook-form.com/get-started): Gerenciamento e validação de formulários.
- [**Country-State-City**](https://github.com/harpreetkhalsagtbit/country-state-city): Biblioteca para obtenção de dados de países, estados e cidades. Usa como data source uma [base mantida e atualizada por mais de 50 contribuidores](https://github.com/dr5hn/countries-states-cities-database).
- [**LocalForage**](https://localforage.github.io/localForage/): Biblioteca JavaScript que fornece uma API simples e consistente para armazenamento offline no navegador. Ele é uma camada de abstração sobre os mecanismos de armazenamento de dados no browser, como localStorage.
- [**React Router Dom**](https://reactrouter.com/en/main/start/overview): Declarativo e baseado em componentes, o react-router-dom permite definir as rotas da aplicação como componentes React, tornando o roteamento mais fácil de entender e manter. Isso permite uma estrutura de navegação clara e intuitiva, organizando as rotas em uma hierarquia de componentes.

## Instruções para Configuração

### Pré-requisitos

- Node.js
- npm

### Instalação

1. Descompacte o repositório

2. Acesse a pasta e execute:
   ```bash
    npm install
    ```

3. Depois execute:
   ```bash
    npm run dev
    ```

3. Abra o navegador na porta `localhost` informada

## Knonwn Issues

Uma issue já identificada no projeto é a dificuldade em integrar o hook useCountryCityState no componente AddressModal. Como resultado, ao editar um endereço, os campos de país, estado e cidade não são mais listas suspensas, permitindo que o usuário insira manualmente qualquer valor. Isso pode comprometer a consistência e integridade dos dados inseridos, uma vez que não há mais validação baseada em uma lista predefinida de opções.

### Possível Solução

Investigar formas de integrar o useCountryCityState no AddressModal, permitindo que os campos de país, estado e cidade sejam listas suspensas mesmo durante a edição de endereços. Isso pode exigir ajustes na estrutura e lógica do componente, garantindo uma experiência de edição consistente e intuitiva para o usuário.

## Comentários

- Aguardo a oportunidade de nos conhecermos melhor e compartilhar mais sobre meu desejo de somar à equipe! 🌟 😉
