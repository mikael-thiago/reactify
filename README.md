# reactify
Um projeto em React, com objetivo didático, buscando replicar a interface do Spotify, utilizando a API disponibilizada pela própria Spotify.

# Uso
Certifique-se de possuir o npm e node instalados. 

## Instalação

Acesse a pasta front-end e execute npm install, a mesma coisa na pasta back-end. 

## Credencias de uso

Crie uma conta no Spotify, em seguida acesse https://developer.spotify.com/dashboard/ com sua conta.
Cadastre um app no dashboard com nome de sua preferencia. Em seguida, clique na opção "Edit Settings", procure a seção "Redirect URIs" e adicione a url "http://localhost:4000/authenticate/callback".
Feito isso, retorne a pagina inicial do seu app no dashboard, lá você encontrará as credencia Client ID e Client Secret. Acesse a pasta back-end/src e crie um arquivo ".env" e dentro dele insira os dados no seguinte formato:

client_id={cole o Client ID disponibilizado na plataforma aqui}
client_secret={cole o Client Secret disponibilizado na plataforma aqui}

Com isso, as credenciais de uso estão prontas para uso.

## Execução
Abra dois terminais, em um acesse a pasta back-end e execute o comando node src/index.js, em outro, acesse a pasta front-end e execute o comando npm start.

E pronto, basta acessar o localhost:3000 e utilizar a aplicação :).
