# Desafio de Estágio na CBLAB

Neste projeto, foi desafiado a criar uma aplicação para explorar uma coleção de livros. A aplicação permite ao usuário interagir com uma lista de livros disponibilizada por uma API pública, além de oferecer funcionalidades para personalizar e gerenciar uma lista de favoritos, bem como fornecer avaliações e anotações pessoais sobre cada livro.

## Funcionalidades Implementadas

1. **Busca de Livros**: Os usuários podem realizar pesquisas por título ou autor, e visualizar uma lista de livros correspondentes.
2. **Detalhes do Livro**: Cada livro listado exibe informações relevantes, incluindo título, autor(es), descrição e capa.
3. **Favoritos e Anotações**: Os usuários têm a opção de favoritar livros, adicionar notas pessoais, avaliações (de 1 a 5) e tags aos livros favoritos.
4. **Gerenciamento de Favoritos**: É possível visualizar todos os livros favoritados, bem como editar anotações e avaliações.
5. **Filtro por Tags**: Implementação de uma funcionalidade para filtrar livros favoritos com base em tags.

## Tecnologias Utilizadas

- **Python** 3.12
- **Angular** 18.2.0
- **Node** 20.13.1
- **Django** 5.1.1
- **Postman** (para testes)


## Instalação

Para configurar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
    ```bash
    git clone https://github.com/Danilocpm/frontend_angular.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd books-app
    ```
3. Instale as dependências do projeto:
    ```bash
    npm install
    ```
4. Crie e ative o ambiente virtual (dependendo do seu sistema operacional):
    - **Windows**:
        ```bash
        npm run create-venv-win
        ```
    - **Mac**:
        ```bash
        npm run create-venv-mac
        ```
    - **Linux** (precisa do GNOME Terminal):
        ```bash
        npm run create-venv-linux
        ```
5. Aplique as migrações do banco de dados:
    ```bash
    npm run makemigrations
    npm run migrate
    ```
6. Navegue para o diretório do projeto Django:
    ```bash
    cd .. 
    cd myproject
    ```
7. Crie um superusuário para o Django:
    ```bash
    python manage.py createsuperuser
    ```
    (Você precisará definir uma senha durante este processo.)

8. Volte para o diretório do projeto Angular:
    ```bash
    cd ..
    cd books-app
    ```
9. Inicie o servidor:
    ```bash
    npm run start-all
    ```
## Contribuição

Contribuições são sempre bem-vindas! Se você gostaria de contribuir para este projeto, siga os passos abaixo:

1. **Faça um Fork do Repositório**:
   - Clique no botão "Fork" no canto superior direito deste repositório no GitHub para criar uma cópia do projeto na sua conta.

2. **Clone o Repositório Forkado**:
   - Clone o repositório forkado para sua máquina local:
     ```bash
     git clone https://github.com/seu-usuario/frontend_angular.git
     ```

3. **Crie uma Branch para Sua Alteração**:
   - Navegue até o diretório do projeto:
     ```bash
     cd frontend_angular
     ```
   - Crie uma nova branch para suas alterações:
     ```bash
     git checkout -b minha-feature
     ```

4. **Faça Suas Alterações**:
   - Realize as alterações necessárias e faça commits com mensagens descritivas:
     ```bash
     git add .
     git commit -m "Adiciona nova feature"
     ```

5. **Envie Suas Alterações**:
   - Envie suas alterações para o repositório remoto:
     ```bash
     git push origin minha-feature
     ```

6. **Abra um Pull Request**:
   - Vá para a página do repositório original no GitHub e abra um Pull Request com suas alterações. Descreva claramente o que foi alterado e por que as mudanças são benéficas.

## Diretrizes para Contribuição

- **Documentação**: Certifique-se de atualizar a documentação relevante se suas alterações afetam a forma como o projeto deve ser usado.
- **Testes**: Adicione testes para garantir que suas alterações não introduzam bugs.
- **Estilo de Código**: Siga o estilo de código existente para garantir consistência no projeto.
- **Problemas e Recursos**: Verifique os problemas existentes e recursos planejados para ver se suas alterações se alinham com o que já está sendo trabalhado ou solicitado.


## Contato

Seu Nome - [danilocarneirop@gmail.com](mailto:danilocarneirop@gmail.com)

Link para o perfil do GitHub: [https://github.com/Danilocpm](https://github.com/Danilocpm)

