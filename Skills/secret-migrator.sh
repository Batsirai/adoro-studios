#!/bin/bash
echo "=== ZO SECRETS — KEYS TO MIGRATE ==="
echo ""
total=$(grep -oE '^[A-Z_]+=' /home/workspace/Keys/env.md | sort -u | wc -l)
echo "Total keys in env.md: $total"
echo ""
echo "Listing all (KEY | truncated VALUE | status):"
echo "---"
grep -oE '^[A-Z_]+=.*$' /home/workspace/Keys/env.md | sort -u | while IFS= read -r line; do
  key=$(echo "$line" | cut -d= -f1)
  val=$(echo "$line" | cut -d= -f2- | sed 's/\\"$//' | sed 's/\\ $//')
  if [ -n "$val" ] && [ "$val" != "\\" ] && [ "$val" != "" ]; then
    echo "KEY: $key"
    echo "VALUE: $val"
    echo "---"
  fi
done | head -60
