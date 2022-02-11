# Análise dos Requisitos

**Requisitos Funcionais - RF** 

Funcionalidades possíveis da aplicação.

* Usuário vai pode cadastrar uma categoria
* Usuário vai poder recuperar a senha do email

**Requisitos não Funcionais - RNF** 

Funcionalidades que não interferem diretamente nas regras de negócio da aplicação. 

* Dados devem ser salvos banco de dados PostgreSQL
* Bibliotecas, Frameworks, banco de dados

**Regras de negócio - RN**

Regras de fato por trás dos requisitos, regras esperados por trás dos requisitos funcionais.

* Não deve ser possível cadastrar uma categoria com um nome já existente
* Não deve ser possível cadastrar uma categoria com um tamanho menor que 4

---

# Cadastro de carro

Requisitos da aplicação exemplo da trilha Node.JS/Typescript - Ignite - Rockeatseat

**RF**

- Deve ser possível cadastrar um novo carro 

**RNF**

-TypeORM - Migrations: [ yarn typeorm migration:create -n CreateCars ]


**RN**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado com disponível por padrão.
* O usuário responsável pelo cadastro deve ser administrador.

---

# Listagem de carros

**RF**

- Deve ser possível listar todos os carros disponíveis.
- deve ser possível listar todos os carros disponíveis pelo nome da categoria
- deve ser possível listar todos os carros disponíveis pelo nome da marca
- deve ser possível listar todos os carros disponíveis pelo nome do carro
  

**RN**

- O usuário não precisa estar logado no sistema.


---


# Cadastro de especificação no carro 

**RF**

- Deve ser possível cadastrar uma especificação para um carro.


**RN**

- Não deve ser possível cadastrar uma especificação para carro não existente. 
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser administrador.


---


# Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar imagens do carro.


**RNF**

- Utilizar multer para upload dos arquivos.

**RN**

- O usuário deve poder cadastrar `mais` de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser administrador.

# Agendamento do aluguel de carros

**RF**

- Deve ser possível cadastrar um aluguel

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista para um mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação