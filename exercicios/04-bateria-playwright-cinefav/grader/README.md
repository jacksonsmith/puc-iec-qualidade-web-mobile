# Grader — Bateria Playwright (15 pts)

Validator **estrutural** (parse-only, nunca executa código do aluno) da rubrica do `../enunciado.md`.
A nota comentada no PR é o **piso automático** (12 pts); a missão livre e o `RESPOSTAS.md` (3 pts, 📝)
entram na nota final no Canvas.

```bash
npm install
npx ts-node validator.ts --entrega ..            # ou ../../../_pr/exercicios/04-.../ no CI
```

Smoke local obrigatório antes de distribuir: scaffold → score baixo; testes do gabarito copiados
por cima de `pratica/tests` → 12/12 automático.
