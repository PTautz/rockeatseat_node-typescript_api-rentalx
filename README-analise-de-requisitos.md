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
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro 

**RF**
- Deve ser possível realizar a devolução de um carro 

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá se somado ao total do aluguel.
- O usuário precisa estar logado na aplicação.

# Listagem de Alugueis para usuário 

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário 

**RN**
O usuário deve estar logado na aplicação

# Recuperação de senha 

**RF**
- Deve ser possível o usuário recuperar a senha informando o email 
- O usuário deve receber um email com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas