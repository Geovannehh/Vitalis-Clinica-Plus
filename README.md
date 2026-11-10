# Vitalis - Portal de clínica hospitalar

Demonstração interativa e responsiva de gestão de clínica, desenvolvida em português com HTML5, CSS3 e JavaScript puro. Os dados são fictícios e ficam no navegador do usuário.

## Páginas do site

As páginas abaixo são telas de uma aplicação de página única (SPA simples). Todas são acessadas pelo menu de `index.html`; não existem arquivos HTML ou URLs independentes para cada tela.

| Página        | Conteúdo                                                                         | Ações disponíveis                                                   |
| ------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Visão geral   | Indicadores de consultas, pacientes, fila e profissionais; próximos atendimentos | Abrir agenda, acessar prontuários e criar agendamento               |
| Agenda        | Lista de atendimentos com horário, paciente e especialidade                      | Agendar, alterar status e abrir prontuário pelo botão Atender       |
| Pacientes     | Lista de pacientes com idade, especialidade e status                             | Buscar por nome, cadastrar paciente e abrir prontuário              |
| Prontuários   | Lista de pacientes para acesso ao histórico                                      | Consultar identificação, alergias e evoluções; salvar nova evolução |
| Equipe médica | Quatro profissionais demonstrativos e suas especialidades                        | Consultar a equipe exibida                                          |
| Relatórios    | Contagem por especialidade e total de pacientes                                  | Exportar os dados em CSV                                            |

### Janelas e fluxos complementares

- **Cadastro / novo agendamento:** formulário com nome, idade, especialidade, horário e alergias. Na versão atual, ambos os acessos adicionam um registro à mesma lista de pacientes/atendimentos.
- **Prontuário eletrônico:** janela com nome, idade, especialidade, identificador, alergias e evoluções clínicas com data e hora. Permite adicionar anotações fictícias.
- **Busca global:** filtra pacientes pelo nome. Em telas sem listagem de pacientes, leva à tela Pacientes.
- **Status da agenda:** Confirmado, Aguardando, Em atendimento, Concluído e Cancelado.
- **Relatório CSV:** exporta nome, idade, especialidade e status, com separador ponto e vírgula.



O projeto possui verificação de sintaxe JavaScript e de formatação. A interface deve passar por validação visual e testes de navegação nos navegadores de destino antes de qualquer evolução para uso real.
