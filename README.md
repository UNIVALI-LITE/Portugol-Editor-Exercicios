Nittro WebApp
==========

Frontend da aplicação web Nittro

![Alt Text](http://www.sheawong.com/wp-content/uploads/2013/08/keephatin.gif)

## Inclui

* HTML Boilerplate
* Bootflat & Bootstrap 3.0* 
* Processo de build utilizando Gulp (Concatena, Minifica, Otimiza Imagens, LiveReload, Remove CSS Não Utilizado, Auto-prefixa o CSS, Deploy)

## Utilização

Instale o bower globalmente.
`npm install -g bower`

Instale o gulp globalmente.
`npm install -g gulp`

Instale as dependências do projeto localmente
`npm install`

Instale as dependências do bower
`bower install`

Pronto

## Tarefas de build

Observar os arquivos e executa o build ao salvar
`gulp watch`

Build normal
`gulp build`

Limpar arquivos do build
`gulp clean`

Envia pasta \dist para desenv.app.nittro.co
`gulp deploy`
