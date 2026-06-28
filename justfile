set shell := ["bash", "-o", "pipefail", "-c"]
set dotenv-load := true

default:
    @bun run src/cli.ts --help

[group("build")]
build *args:
    @bun run src/cli.ts build {{args}}

[group("build")]
clean:
    rm -rf dist/

[group("preview")]
serve:
    @bun run src/cli.ts preview

[group("preview")]
preview *args:
    @bun run src/cli.ts preview {{args}}

[group("pdf")]
pdf file='2026-06-26-staved-finger-tensor-algebra':
    @just build
    @.venv/bin/weasyprint "dist/{{file}}.html" "pdf/{{file}}.pdf" 2>/dev/null
    @echo "📄 pdf/{{file}}.pdf"

[group("meta")]
orient *args:
    @bun run src/cli.ts orient {{args}}

[group("meta")]
tree *args:
    @bun run src/cli.ts tree {{args}}

[group("meta")]
check:
    @echo "Run 'just build' to verify the build works"

[group("meta")]
deps:
    @cat dependencies.md

[group("meta")]
help:
    @bun run src/cli.ts --help