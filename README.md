# Qualidade em Aplicações Web e Mobile

> **Curso:** Pós-Graduação em Engenharia de Qualidade e Testes de Software — PUC Minas IEC
> **Disciplina:** 09 — Qualidade em Aplicações Web e Mobile
> **Modalidade:** Online EAD (assíncrono) · 24h · 1º/2026
> **Publicação Canvas:** 03/08/2026
> **Professor:** Jackson Smith Moisés Matias

Repositório público com **labs, exercícios, repos starter de módulos e materiais de referência**. Para alunos da disciplina 09 da pós em Engenharia de Qualidade e Testes de Software.

## Estrutura curricular

6 módulos × 4h cada = 24h. Auto-paced, prazos rolantes a cada 2 semanas.

| # | Módulo | Tema |
|---|--------|------|
| 1 | M1 | Fundamentos de Qualidade Web e Mobile |
| 2 | M2 | Automação Web Avançada com Playwright |
| 3 | M3 | Testes de SPA & PWA |
| 4 | M4 | Automação Mobile Cross-Platform com Maestro |
| 5 | M5 | IA Avançada em Testes (módulo flagship) |
| 6 | M6 | Cross-Browser, Multi-Device, CI/CD & Projeto Final |

## Ementa

Fundamentos da qualidade em aplicações web e mobile. Estratégias de teste multi-plataforma. Automação de testes web. Automação de testes mobile. Testes de Single Page Applications (SPA). Testes de Progressive Web Apps (PWA). Aplicação de IA para: teste visual, sugestão automática de melhorias, geração de testes cross-browser e interfaces em múltiplos dispositivos. Projeto prático.

## Stack didática

- **Web/SPA/PWA:** Playwright (1.50+)
- **Mobile cross-platform:** Maestro (mobile.dev)
- **CI/CD:** GitHub Actions (sharding, traces, blob reports)
- **IA:** Claude API (test gen + healing), Applitools (visual AI), Browser Use (exploratory agent)

## Estrutura do repo

```
.
├── exercicios/      # Exercícios de fixação (sem gabarito)
├── starters/        # Repos starter pra cada módulo
├── labs/            # Labs hands-on guiados
├── README.md        # Você está aqui
└── BIBLIOGRAFIA.md  # Referências completas
```

## Avaliação (100 pts)

| Item | Módulo | Pontos |
|------|--------|--------|
| Quiz Fundamentos | M1 | 10 |
| Lab Playwright SPA | M2 | 15 |
| Lab PWA Testing | M3 | 10 |
| Lab Maestro Mobile | M4 | 15 |
| Lab IA Test Generation | M5 | 15 |
| **Projeto Final Individual** | M6 | **35** |

## Como usar

```bash
git clone https://github.com/jacksonsmith/puc-iec-qualidade-web-mobile.git
cd puc-iec-qualidade-web-mobile

# Cada módulo tem seu starter em starters/modulo-XX/
cd starters/modulo-02
npm install
npx playwright install
npx playwright test
```

## Pré-requisitos

- **Node.js** ≥ 22 LTS
- **Docker** (para Maestro local + farms)
- **Xcode + Android Studio** (para flows mobile)
- **Maestro CLI:** `curl -Ls "https://get.maestro.mobile.dev" | bash`
- Conta GitHub para entregas
- (Opcional) Conta Applitools free tier — para Visual AI no M5

## Bibliografia principal

- CRISPIN, L.; GREGORY, J. *Holistic Testing*. Pearson, 2024.
- WINTERINGHAM, M. *Testing Web APIs*. Manning, 2022.
- AXELROD, A. *Complete Guide to Test Automation*. Apress, 2018.
- HUMBLE, J.; FARLEY, D. *Continuous Delivery*. Addison-Wesley, 2010.
- FORSGREN, N.; HUMBLE, J.; KIM, G. *Accelerate*. IT Revolution, 2018.

Bibliografia completa em [`BIBLIOGRAFIA.md`](./BIBLIOGRAFIA.md).

## Office hours

1h/semana via Google Meet (link no Canvas, agendado por enquete).

## Contato

Dúvidas: via fórum Canvas ou e-mail (informado na disciplina).

---

Material didático autoral. Licenciado MIT — ver [LICENSE](./LICENSE).
