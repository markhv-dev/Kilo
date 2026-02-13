# Kilo

> Domina el ingles con las 1,000 palabras que mas importan.

[![Demo](https://img.shields.io/badge/demo-kilo--lime.vercel.app-000000.svg)](https://kilo-lime.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-000000.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-19-000000.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.9-000000.svg)](https://www.typescriptlang.org)

[Demo en vivo](https://kilo-lime.vercel.app) · [Reportar bug](https://github.com/markhv-dev/Kilo/issues) · [Proponer feature](https://github.com/markhv-dev/Kilo/issues)

---

## Que es Kilo

Kilo es una plataforma open source para aprender ingles dirigida a hispanohablantes. El enfoque es simple: las primeras 1,000 palabras en ingles cubren aproximadamente el 80% del uso cotidiano. En lugar de gramatica abstracta, Kilo te presenta cada palabra con su significado, una explicacion clara y un ejemplo real.

## Por que funciona

El proyecto se basa en dos principios linguisticos:

- **Ley de Zipf** — En cualquier idioma, un grupo reducido de palabras cubre la mayor parte del uso. Dominar las 1,000 mas frecuentes te da acceso al 80% del ingles real.
- **Input Comprensible (Krashen)** — Adquieres un idioma cuando entiendes mensajes en contexto, no cuando memorizas reglas gramaticales.

## Stack

| Herramienta | Uso |
|---|---|
| React 19 | UI |
| TypeScript | Tipado |
| Tailwind CSS v4 | Estilos |
| Vite | Build y dev server |

## Desarrollo local

```bash
git clone https://github.com/markhv-dev/Kilo.git
cd Kilo
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── App.tsx                 # Router
├── main.tsx                # Entry point
├── types.ts                # Tipos compartidos
├── components/
│   ├── Layout.tsx          # Layout con nav y footer
│   └── WordCard.tsx        # Tarjeta expandible de vocabulario
├── data/
│   └── words.json          # 500 palabras (5 niveles)
└── pages/
    ├── Landing.tsx          # Pagina principal
    └── Words.tsx            # Catalogo con filtros por nivel
```

## Roadmap

- [x] Primeras 500 palabras organizadas en 5 niveles
- [x] Landing page con preview del contenido
- [x] Catalogo con filtros por nivel y busqueda
- [x] Tarjetas expandibles con explicacion y ejemplo
- [ ] Completar las 1,000 palabras (niveles 6-10)
- [ ] Audio de pronunciacion para cada palabra
- [ ] Modo practica con repeticion espaciada (SRS)
- [ ] Subtitulos duales (EN/ES) para video
- [ ] Ejercicios de dictado y transcripcion
- [ ] Contador de horas de inmersion
- [ ] Tutoria con IA (Gemini)

## Contribuir

Las contribuciones son bienvenidas. Algunas formas de aportar:

1. **Reportar errores** en traducciones o explicaciones de palabras
2. **Proponer mejoras** abriendo un issue
3. **Enviar un PR** con correcciones o nuevas features

```bash
# Fork del repositorio
# Crea tu branch
git checkout -b feature/mi-mejora

# Haz tus cambios y commit
git commit -m "Descripcion del cambio"

# Push y abre un PR
git push origin feature/mi-mejora
```

## Licencia

[MIT](LICENSE)
