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

[group("dev")]
watch:
    @bun run src/cli.ts build --watch

[group("preview")]
serve:
    @bun run src/cli.ts preview

[group("preview")]
preview *args:
    @bun run src/cli.ts preview {{args}}

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