# Leonardo Delfino / xy-inc
## Teste Desenvolvedor 3 - Backend as a Service

### Arquitetura:

 * Nodejs 6+
 * Express
 * MongoDB 3.2
 * Mongoose
 * Mocha + Chai para testes
 * Instalbul para cobertura de código

### Análise da Solução

Foi escolhido a linguagem nodejs para desenvolvimento, devido a facilidade, domínio e necessidade de pouca escrita de código para desenvolver a solução deste problema. 

A escolha do MongoDB se deve ao fato de ser um banco não relacionado sem obrigatóriedade de ter esquemas definidos, o que auxilia na solução de montar uma api que fornece serviço para persistência de dados de entidades genéricas, sendo assim fácil a alteração criação e alteração dos modelos. 

A solução pode ser facilmente escalada utilizando um gerenciador de processos como o [PM2](https://github.com/Unitech/pm2) e adicionando  shards e/ou replicas sets ao MongoDB. 

### Instalação
Os pré-requisitos necessários para rodar o projeto é a instalação do [nodejs 6+](https://nodejs.org/en/) e o banco de dados MongoDB. O banco também foi disponibilizado via  docker, sendo necessário executar o comando abaixo para iniciar:



```sh
docker-compose up -d
```

### Execução
O primeiro passo é clonar o projeto na sua máquina:

```sh
git clone git@github.com:leonardodelfino/xy-inc.git
```

Então navegue até a pasta do projeto e para inciar o servidor execute:

```sh
npm start
```

Para executar os testes e exibir o relatório de cobertura de código:

```sh
npm test
```

### Documentação

##### O primeiro conjunto de rotas disponibilizados é utilizado para a manipulação de entidades. As rotas disponíveis são:

| Método | Rota | Descrição |
| ------------- | ------------- | -------------|
| POST  | `/api/entity`  | Criação de uma nova entidade
| GET  | `/api/entity`  | Retorna todas as entidades criadas
| GET  | `/api/entity/:id`  | Retorna uma entidade específica

**Exemplo**: POST `/api/entity` - Criação de uma nova entidade

```sh
curl -X POST \
  http://localhost:3000/api/entity \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  "name" : "pessoa",
  "attributes": [
    {
      "name": "nome",
      "type": "string",
       "required" : true
    },
    {
       "name" : "sobrenome",
       "type" : "string"
    },
    {
       "name" : "data_nascimento",
       "type" : "date"
    },
    {
       "name" : "nro_filhos",
       "type" : "number"
    },
    {
       "name" : "usa_oculos",
       "type" : "boolean"
    }
  ]
}'
```

**Exemplo**: GET `/api/entity` - Retorna todas as entidades criadas
```sh
curl -X GET \
  http://localhost:3000/api/entity \
  -H 'cache-control: no-cache' \
``` 

**Exemplo**: GET `/api/entity/:id` - Retorna uma entidade com um determinado id
```shell
curl -X GET \
  http://localhost:3000/api/entity/xpto \
  -H 'cache-control: no-cache' \
``` 

##### O segundo conjunto de rotas disponíveis é para a manipulação de entidades. As rotas disponíveis são:

| Método | Rota | Descrição |
| ------------- | ------------- | -------------|
| POST  | `/api/:entidade`  | Insere um novo registro
| GET  | `/api/:entidade`  | Retorna todos os registros
| GET  | `/api/:entidade/:id`  | Retorna um registro específico
| PUT  | `/api/:entidade/:id`  | Atualiza um registro
| DELETE  | `/api/:entidade/:id`  | Exclui um registro

**Exemplo**: POST `/api/:entidade` - Insere um novo registro

```sh
curl -X POST \
  http://localhost:3000/api/pessoa \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"nome": "Leonardo", "sobrenome" : "Delfino", "data_nascimento" : "1989-06-04", "usa_oculos" : false, "filhos" : 0}'
```
**Exemplo**: GET `/api/:entidade` - Retorna todos os registros

```sh
curl -X GET \
  http://localhost:3000/api/pessoa \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
```

**Exemplo**: GET `/api/:entidade/:id` - Retorna um registro específico

```sh
curl -X GET \
  http://localhost:3000/api/pessoa/xpto \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
```
**Exemplo**: PUT  `/api/:entidade/:id` - Atualiza um registro

```sh
curl -X PUT \
  http://localhost:3000/api/pessoa/xpto \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{ "nome": "João da Silva", "nro_filhos" : 2}'
```

**Exemplo**: DELETE  `/api/:entidade/:id` - Exclui um registro

```sh
curl -X DELETE \
  http://localhost:3000/api/pessoa/xpto \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
```
