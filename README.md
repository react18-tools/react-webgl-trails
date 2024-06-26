# React Mouse Trail <img src="https://github.com/react18-tools/react-mouse-trail/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/react-mouse-trail/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/react-mouse-trail/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/4bb3a3316ff4ecd2a9eb/maintainability)](https://codeclimate.com/github/react18-tools/react-mouse-trail/maintainability) [![codecov](https://codecov.io/gh/react18-tools/react-mouse-trail/graph/badge.svg)](https://codecov.io/gh/react18-tools/react-mouse-trail) [![Version](https://img.shields.io/npm/v/react-mouse-trails.svg?colorB=green)](https://www.npmjs.com/package/react-mouse-trails) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/react-mouse-trails.svg)](https://www.npmjs.com/package/react-mouse-trails) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-mouse-trails) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

A lightweight WebGL-based React component for creating an interactive mouse trail effect. Works with Next.js out of the box.

✅ Fully TypeScript

✅ Leverages the power of React 18 Server components

✅ Compatible with all React build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/react-mouse-trail) ([Docs](https://react18-tools.github.io/react-mouse-trail))

✅ Examples for Next.js, Vite

> <img src="https://github.com/react18-tools/react-mouse-trail/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider starring [this repository](https://github.com/react18-tools/react-mouse-trail) and sharing it with your friends.

## Getting Started

### Installation

```bash
$ pnpm add react-mouse-trail
```

**_or_**

```bash
$ npm install react-mouse-trail
```

**_or_**

```bash
$ yarn add react-mouse-trail
```

### Adding CSS

You can import CSS in your global styles or from your component. In the case of Next.js, you can import global styles only in `layout` or `_app` components.

In your stylesheet

```css
@import "react-mouse-trail/dist";
```

or in your component

```ts
import "react-mouse-trail/dist/index.css";
```

Here's a revised version of the usage section:

## Usage

MouseTrail is simple to integrate:

```tsx
import { MouseTrail } from "react-mouse-trail";

export default function Layout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* ... */}
        <MouseTrail rgb={[1, 0, 0]} />
      </body>
    </html>
  );
}
```

By default, the RGB value `[1, 0, 0]` represents the color red.

![Repobeats](https://repobeats.axiom.co/api/embed/016960ad97aa7b1abbdd9a615f5ffeb08d869cb6.svg "Repobeats analytics image")

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://github.com/react18-tools/react-mouse-trail/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
