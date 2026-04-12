#!/usr/bin/env bash
# Formats the file that was just written or edited.
# Receives a JSON payload on stdin with tool_input.file_path.

FILE=$(node -e '
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", chunk => { input += chunk; });
process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input);
    const filePath = payload?.tool_input?.file_path ?? payload?.file_path ?? "";
    if (typeof filePath === "string") process.stdout.write(filePath);
  } catch (_) {
    process.exit(0);
  }
});
')

if [ -n "$FILE" ]; then
  npm run fmt -- "$FILE" || true
fi
