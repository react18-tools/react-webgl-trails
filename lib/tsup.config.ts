import fs from "node:fs";
import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";
import cssPlugin from "esbuild-plugin-react18-css";
import { rdiPlugin } from "esbuild-plugin-rdi";
import { webglPlugin } from "esbuild-plugin-webgl";

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      entry: ["./src"],
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      esbuildPlugins: [
        {
          name: "minify",
          setup(build) {
            if (options.watch) return;
            build.onLoad({ filter: /utils\.ts$/, namespace: "file" }, args => {
              const text = fs.readFileSync(args.path, "utf8");
              const contents = text
                .replace(/if \(!gl[^}]*}/gm, "")
                .replace(/;\s*if \(![^;]*;/gm, "!;")
                .trim();
              return { contents, loader: "ts" };
            });
          },
        },
        webglPlugin(),
        react18Plugin({ disableJSXRequireDedup: true }),
        cssPlugin({ generateScopedName: "rt_[local]" }),
        rdiPlugin(),
      ],
      ...options,
    }) as Options,
);
