# Vitalis — Portal de clínica hospitalar

Demonstração interativa e responsiva de gestão de clínica, desenvolvida em português com HTML5, CSS3 e JavaScript puro. Os dados são fictícios e ficam no navegador do usuário.

## Como abrir

1. Extraia o ZIP.
2. Abra `dist/index.html` em um navegador moderno.
3. Navegue pelo menu lateral e experimente os cadastros e o prontuário.

Não é necessário instalar dependências para usar o site. Para desenvolvimento, prefira servir a pasta `dist` com um servidor HTTP local, como a extensão Live Server do editor. A persistência em `file://` pode variar entre navegadores; mantenha o mesmo navegador e endereço para reutilizar os dados.

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

## Estrutura de arquivos

```text
vitalis/
├── dist/
│   ├── index.html           # Estrutura HTML e referências aos recursos
│   └── assets/
│       ├── css/
│       │   └── styles.css   # Layout, cores, componentes e responsividade
│       └── js/
│           └── app.js       # Dados fictícios, navegação e interações
├── .editorconfig           # Convenções de edição
├── .prettierrc.json         # Regras automáticas de formatação
├── .gitignore              # Arquivos locais ignorados pelo Git
├── package.json            # Comandos de desenvolvimento
├── package-lock.json       # Versões das ferramentas de desenvolvimento
└── README.md               # Documentação do projeto
```

A pasta `dist` contém o site pronto para hospedagem estática. O HTML, a folha de estilos e o código JavaScript estão separados por tecnologia. Os conteúdos dinâmicos são renderizados pelo JavaScript; os eventos existentes permanecem associados aos controles da interface.

## Padrões de código e indentação

- Codificação UTF-8 e finais de linha LF.
- Indentação de dois espaços, sem tabulações.
- JavaScript com ponto e vírgula e aspas duplas.
- Formatação consistente com Prettier, configurada no projeto.
- Recursos organizados em `assets/css` e `assets/js`.

Para instalar somente as ferramentas de desenvolvimento:

```sh
npm ci
```

Comandos disponíveis:

```sh
npm run format        # Formatar os arquivos
npm run format:check  # Conferir a formatação
npm run check         # Verificar a sintaxe do JavaScript
```

Não há etapa de compilação: os arquivos de `dist` podem ser servidos diretamente.

## Armazenamento

Os cadastros, status e evoluções são persistidos em `localStorage`, na chave `vitalis-demo`. Não há sincronização entre dispositivos, contas ou navegadores. Limpar os dados do site no navegador restaura os registros fictícios iniciais no próximo acesso e remove as alterações locais.

## Limitações desta demonstração

Esta entrega é um protótipo de interface, não um sistema hospitalar pronto para operação clínica. Não insira dados reais de pacientes.

Não inclui backend, banco de dados compartilhado, autenticação por profissional, permissões, auditoria, backups, assinatura digital ou integrações clínicas. O nome da médica exibido é fixo e as evoluções não têm validade clínica. O cadastro e o agendamento compartilham o mesmo modelo simplificado; não há seleção de data, gestão de conflitos de horário ou múltiplas consultas por paciente.

## Verificação

O projeto possui verificação de sintaxe JavaScript e de formatação. A interface deve passar por validação visual e testes de navegação nos navegadores de destino antes de qualquer evolução para uso real.
