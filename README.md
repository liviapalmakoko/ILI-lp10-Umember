# U Members — by Ilikia · LP10

Landing page do programa de membros premium **U Members** (Ilikia / Elit Especialidades),
com foco na captação de leads para o próximo destino: **AMWC Cannes 2027**.

## Stack
HTML + CSS + JavaScript **puro** (sem framework/build) — mesmo padrão aprovado das LPs anteriores da marca.

```
index.html      → estrutura (7 seções: hero, programa, benefícios, destinos, Cannes, formulário, footer)
styles.css      → paleta da marca, tipografia Gotham, glass cards, marquee
script.js       → reveal on scroll, menu mobile, máscara de telefone, validação do formulário
assets/
  ├─ fonts/     → Gotham (.woff2, self-hosted)
  ├─ brand/     → logo, tulipa, troféu de cristal, pin
  └─ favicon.png
imagens/
  └─ destinos/  → foto da orla de Cannes
  └─ generated/ → imagens geradas para hero e destinos
materiais/      → briefing, logos .ai/.psd e referências (ignorados no git)
```

## Como visualizar
Abra `index.html` no navegador, ou sirva localmente:

```bash
python3 -m http.server 8000   # depois acesse http://localhost:8000
```

## Direção visual
Baseada no **PDF Pacotes AMWC Cannes 2027** e no branding da marca (`materiais/`):
fundo petróleo escuro, troféu de cristal no hero, tipografia fina em maiúsculas,
acentos em ciano/verde-água e cards translúcidos.

### Paleta
| Cor | HEX |
|-----|-----|
| Petróleo escuro | `#0F2D32` |
| Teal médio | `#28555D` |
| Verde-água claro | `#6DA8B1` |
| Ciano (brilho cristal) | `#7FD8E6` |

## Pendências (TODO)
- [ ] **Integração do formulário** (seção 05) com backend / CRM / e-mail da Ilikia — hoje o envio é simulado no front-end (ver `TODO` em `script.js`).
- [ ] Confirmar logo/parceria do **AMWC Cannes** (hoje tratado como texto).
