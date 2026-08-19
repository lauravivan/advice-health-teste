# Teste técnico Advice Health

> Desenvolvimento de um sistema de gerenciamento de consultório

## Requisitos

1. Área de Trabalho / Dashboard

Desenvolva uma área de trabalho que forneça uma visão geral do consultório, apresentando informações como:

    Número de agendamentos do dia;
    Número de pacientes atendidos no dia;
    Faturamento do dia;
    Agenda do dia;
    Avisos e lembretes.

A proposta é oferecer ao usuário uma visão gerencial que auxilie na organização e gestão da rotina do consultório.

2. Agendamento de Consultas

Desenvolva uma rotina que permita visualizar e gerenciar a agenda dos médicos do consultório.

A solução deverá considerar funcionalidades como:

    Incluir agendamentos;
    Alterar agendamentos;
    Cancelar agendamentos;
    Transferir agendamentos;
    Indisponibilizar períodos em que o médico estará ausente.

Durante o agendamento, deverão ser coletados dados do paciente, como:

    Nome completo;
    CPF;
    Data de nascimento;
    Endereço;
    Entre outras informações necessárias.

Considere também que o pagamento da consulta ocorrerá nesse momento.

Atente-se às possíveis microinterações da tela, como mensagens, notificações e validações de campos obrigatórios.

3. Consulta de Agendamentos

Desenvolva uma rotina para consulta de pacientes agendados e atendidos, apresentando informações relacionadas:

    Ao paciente;
    Ao agendamento;
    Ao médico;
    Aos valores cobrados.

## Modelagem - entidades

### Paciente

- Nome completo
- CPF
- Data de nascimento
- Endereço

### Médico(a)

- Nome completo
- Especialização
- Registro

### Agendamento

- Paciente
- Médico(a)
- Data
- Observação
- Status do atendimento
- Valor da consulta

## Principais tecnologias utilizadas

- React
- Bootstrap
- Vite
- Eslint
- date-fns
- Zustand
- RHF + zod
- Axios
- uuid

## Design 

Icon collection: [Svg repo](https://www.svgrepo.com/collection/solar-broken-line-icons/)

Illustration collection: [unDraw](https://undraw.co/search/doctor)
