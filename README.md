# SEVN ESPORTES ⚽

Este projeto foi desenvolvido usando Vite como bundler para criar uma aplicação de exibição de rodadas de jogos fictícios. O projeto consome uma API externa para obter os dados dos jogos e exibe as rodadas com suas respectivas equipes e pontuações.

Tecnologias Utilizadas:

	•	Vite: Ferramenta de build e desenvolvimento rápida.
	•	TypeScript: Para tipagem estática e melhor manutenção do código.
	•	HTML/CSS: Estruturação e estilização da interface.
	•	Fetch API: Para obter dados da API remota.

Funcionalidades:

	•	Navegação entre rodadas com botões “Anterior” e “Próximo”.
	•	Exibição dinâmica de jogos, incluindo times e resultados.
	•	Responsividade para telas menores, com ajustes no layout.
	•	Mapeamento dinâmico de escudos dos times a partir de IDs.

Estrutura:

	•	fetchRounds(): Faz a requisição dos dados da API e atualiza a interface.
	•	renderCurrentRound(): Renderiza a rodada atual com base nos dados da API.
	•	changeRound(): Permite a navegação entre rodadas.
	•	updateButtons(): Ativa/desativa os botões de navegação conforme a rodada atual.

Como Executar:

	1.	Clone este repositório.
	2.	Instale as dependências com npm install.
	3.	Inicie o servidor de desenvolvimento com npm run dev.
	4.	Acesse a aplicação em http://localhost:3000.

Essa descrição destaca o uso de Vite, as principais funcionalidades do projeto, e os passos para rodar o projeto localmente.

Feito por Guilherme Farias Gomes
