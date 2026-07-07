# How to Use This Package with Codex Desktop

## Recommended safe workflow

1. Download and extract this package.
2. Copy the extracted folder temporarily into the existing website repository as:

```text
Mokka83/mokka83.github.io/_codex_input/MichaelMoeller_Website_Codex_Package_v1/
```

3. Add the local handoff folder to Git’s per-repository exclusion file so it cannot be committed:

```powershell
Add-Content .git/info/exclude "_codex_input/"
```

4. Open the `Mokka83/mokka83.github.io` folder as the project in Codex Desktop.
5. Open `CODEX_MASTER_PROMPT.md` from the handoff folder and paste its full content into Codex.
6. At the very start of your message, add:

```text
The authoritative implementation package is available locally at:
./_codex_input/MichaelMoeller_Website_Codex_Package_v1/
Read it in full before changing repository files.
```

7. Ask Codex to execute the requested work, inspect the changes, and run its verification commands.
8. Do not merge to `main` or connect Netlify until you have reviewed Codex’s handover report and preview.

## Why this layout

The package is visible to Codex as local project input but remains untracked. The repository itself will receive only the durable documentation Codex creates under `docs/`, not this one-off prompt package.

## Important

- Do not put recovery codes, API keys, passwords, `.env` files, or the original private CV PDF into `_codex_input/`.
- Keep the ZIP file outside the repository as your immutable backup copy.
- Before committing, verify that `git status --short` does not list `_codex_input/`.
