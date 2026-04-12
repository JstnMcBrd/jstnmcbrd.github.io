#!/usr/bin/env bash
# Formats the file that was just written or edited.
# Receives a JSON payload on stdin with tool_input.file_path.

FILE=$(sed -n 's/.*"file_path":"\([^"]*\)".*/\1/p')

[ -n "$FILE" ] && npm run fmt -- "$FILE"
