# Respostas — Lab Playwright PWA

## Perguntas Teóricas

1. **Qual a diferença entre esperar um elemento visível com o expect nativo do Playwright versus usar um `waitForTimeout` fixo?**
   O expect nativo utiliza o mecanismo de *auto-waiting* do Playwright, verificando dinamicamente e de forma inteligente o estado do elemento até que a condição seja atendida ou o timeout global expire, tornando o teste rápido e estável. Já o `waitForTimeout` insere uma pausa estática desnecessária, tornando a suíte lenta e propensa a falhas (flaky tests) caso a aplicação demore mais que o tempo estipulado.

2. **Por que no Bloco C tivemos que desligar o Service Worker (`test.use({ serviceWorkers: 'block' })`) enquanto no Bloco E ele precisava estar ativo?**
   Porque no Bloco C o objetivo era interceptar requisições de rede reais (`/api/movies.json`) via `page.route`. Se o Service Worker estivesse ativo, ele interceptaria a requisição e responderia direto do cache local, impedindo que o `page.route` do Playwright capturasse o tráfego. No Bloco E, o foco era testar o comportamento real da PWA, ciclo de vida do Service Worker, funcionamento offline e cache, exigindo obrigatoriamente que ele estivesse ativado.

3. **Por que semear o `localStorage` através de fixtures é mais vantajoso do que simular cliques na interface para preparar o estado de favoritos?**
   Porque sintoniza diretamente o estado inicial desejado de forma determinística, isolada e muito mais rápida, evitando dependências excessivas de fluxos de UI anteriores que poderiam falhar por motivos alheios ao teste em questão.

---

## Declaração de Uso de IA
Declaro que utilizei ferramentas de Inteligência Artificial (como auxílio de estruturação e revisão de código) no desenvolvimento deste laboratório, compreendendo integralmente todas as soluções implementadas e aplicando-as conforme os conceitos discutidos nas aulas da disciplina.