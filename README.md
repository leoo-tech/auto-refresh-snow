# ServiceNow Monitor

**Bookmarklet modular para monitoramento de filas de incidentes no ServiceNow.**

O ServiceNow Monitor é um projeto de automação leve, baseado em JavaScript Bookmarklet, criado para auxiliar analistas de operações N1 no acompanhamento de novas ocorrências na fila do ServiceNow.

O objetivo é reduzir o tempo de identificação de incidentes ainda não atribuídos, oferecendo atualização automática da fila, detecção de tickets elegíveis e notificações visuais.

O projeto segue uma filosofia **Plug-and-Play**: qualquer analista autorizado deve conseguir importar o favorito, executá-lo e utilizar suas funções sem precisar conhecer programação ou acessar o console do navegador.

---

## 1. Visão do projeto

Em ambientes de monitoramento de infraestrutura, alertas identificados pelo SolarWinds Orion podem gerar incidentes automaticamente no ServiceNow por meio da integração entre as plataformas.

O fluxo operacional é:

1. SolarWinds Orion identifica um alerta.
2. A integração encaminha o evento ao ServiceNow.
3. O ServiceNow gera um incidente.
4. O incidente aparece na fila de atendimento.
5. O analista identifica e assume o ticket.

O ServiceNow Monitor atua no acompanhamento da fila, ajudando o analista a identificar incidentes que ainda não possuem responsável.

### Objetivo principal

Detectar tickets que atendam simultaneamente às condições:

- **State:** New
- **Assigned to:** Empty

A detecção permite alertar o analista sobre novas ocorrências disponíveis para atendimento.

---

## 2. Filosofia de desenvolvimento

O projeto é orientado por cinco princípios:

| Princípio | Descrição |
|---|---|
| Plug-and-Play | Instalação simples por meio de favoritos do navegador |
| Modularidade | Funcionalidades independentes e reutilizáveis |
| Usabilidade | Interface acessível a analistas sem conhecimento técnico |
| Portabilidade | Distribuição para diferentes integrantes da equipe |
| Segurança | Monitoramento sem alterações automáticas nos incidentes |

A ferramenta deve funcionar como um assistente operacional, não como um substituto das decisões do analista.

---

## 3. Arquitetura proposta

A arquitetura utiliza módulos independentes para facilitar manutenção e evolução.

| Módulo | Responsabilidade |
|---|---|
| Core | Inicialização e gerenciamento do monitor |
| QueueMonitor | Leitura e análise da fila |
| RefreshEngine | Atualização da lista do ServiceNow |
| AlertManager | Gerenciamento de notificações |
| ControlPanel | Interface visual e controles |
| Settings | Configurações do usuário |
| Logger | Registro de verificações e ocorrências |

### Fluxo de funcionamento

```text
SolarWinds Orion
       |
       v
Integração Orion / ServiceNow
       |
       v
Geração do incidente
       |
       v
Fila do ServiceNow
       |
       v
RefreshEngine
       |
       v
QueueMonitor
       |
       v
Verificação:
State = New
Assigned to = Empty
       |
       v
AlertManager
       |
       v
Notificação ao analista
```

**Importante:** o Orion é a origem dos alertas, mas a atualização da fila do ServiceNow continua necessária para que o analista visualize os incidentes recém-gerados.

---

## 4. Funcionalidades previstas

### Controles de monitoramento

- Iniciar monitoramento.
- Pausar monitoramento.
- Parar execução.
- Executar verificação manual.
- Consultar status.
- Configurar intervalo de atualização.

### Sistema de alertas

- Identificação de tickets New sem responsável.
- Notificação visual.
- Notificações nativas do navegador, quando permitidas.
- Prevenção de notificações duplicadas.
- Histórico de verificações.

### Interface

O usuário deve ter acesso às funções por meio de um painel visual integrado à página do ServiceNow.

Nenhuma interação com o console do navegador deve ser necessária para a utilização normal.

---

## 5. Instalação e utilização

O projeto utiliza Bookmarklets, que são favoritos do navegador capazes de executar JavaScript na página atual.

### Instalação

1. Abra o gerenciador de favoritos do navegador.
2. Crie um novo favorito.
3. Defina o nome como `ServiceNow Monitor`.
4. Cole o código JavaScript disponibilizado pelo projeto no campo de endereço ou URL.
5. Salve o favorito.

### Execução

1. Acesse a fila de incidentes no ServiceNow.
2. Execute o favorito ServiceNow Monitor.
3. Aguarde a abertura do painel.
4. Configure o intervalo desejado.
5. Clique em Iniciar.

As funções de controle ficam disponíveis diretamente no painel.

---

## 6. Versões

### Versão B

Implementação inicial baseada em:

- Identificação textual de New e Empty.
- Atualização do frame da fila.
- Notificações do navegador.
- Controle de intervalo.
- Funções de iniciar, parar e consultar status.

### Versão C

Evolução com foco em usabilidade e modularidade:

- Painel visual.
- Controles acessíveis.
- Atualização seguida de verificação.
- Proteção contra atualizações simultâneas.
- Tratamento de erros.
- Separação conceitual entre atualização e leitura da fila.

A versão C é um protótipo em validação. A identificação da estrutura real da fila e dos registros ainda precisa ser confirmada no ambiente de execução.

---

## 7. Segurança e limitações

O projeto deve respeitar as políticas de segurança e utilização de ferramentas da organização.

Diretrizes:

- Não armazenar credenciais.
- Não modificar incidentes automaticamente.
- Não assumir tickets automaticamente.
- Não alterar estados ou responsáveis.
- Não utilizar APIs internas sem autorização.
- Não transmitir informações corporativas para serviços externos.
- Não executar consultas excessivas que prejudiquem o ServiceNow.

A compatibilidade depende da estrutura da página, das permissões do navegador e das políticas corporativas.

O acesso ao conteúdo de frames também pode estar sujeito às restrições de mesma origem do navegador.

---

## 8. Roadmap

- [x] Implementação inicial do monitoramento.
- [x] Detecção básica de New e Empty.
- [x] Controle de intervalo.
- [x] Painel visual inicial.
- [ ] Identificação individual pelo número do incidente.
- [ ] Leitura precisa das colunas da fila.
- [ ] Aprimoramento da prevenção de alertas duplicados.
- [ ] Configurações persistentes.
- [ ] Histórico visual de incidentes detectados.
- [ ] Compatibilidade validada em diferentes sessões e navegadores.
- [ ] Documentação de instalação para o time.
- [ ] Transformação da arquitetura em uma Skill reutilizável.

---

## 9. Visão de resolução

A proposta não é apenas desenvolver um bookmarklet, mas estabelecer um modelo reutilizável de resolução de problemas operacionais.

A futura Skill deverá ajudar a:

1. Entender o problema operacional.
2. Identificar a origem e o fluxo dos dados.
3. Avaliar as limitações do ambiente.
4. Definir uma arquitetura modular.
5. Desenvolver soluções incrementais.
6. Validar o comportamento no ambiente real.
7. Documentar decisões e limitações.
8. Evoluir a solução sem comprometer a usabilidade.

Cada funcionalidade deverá ser pensada considerando o analista que utilizará a ferramenta, e não apenas quem desenvolve o código.

---

## 10. Objetivo final

Construir uma ferramenta interna, simples, confiável e extensível, capaz de auxiliar equipes de operações no acompanhamento de incidentes.

**Menos tempo procurando tickets. Mais agilidade na identificação e no atendimento.**

---

**Status:** Em desenvolvimento  
**Projeto:** ServiceNow Monitor  
**Tecnologia:** JavaScript Bookmarklet  
**Plataforma principal:** ServiceNow  
**Integração de origem dos alertas:** SolarWinds Orion