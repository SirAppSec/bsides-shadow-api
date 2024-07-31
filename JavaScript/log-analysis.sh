#!/bin/bash

LOG_FILE="app_err.log"
OUTPUT_FILE="routes.log"

grep -E "express:router:route (get|post|put|delete|patch|head|options|connect|trace) " "$LOG_FILE" | \
awk '{match($0, /route (get|post|put|delete|patch|head|options|connect|trace) '\''([^'\'']+)'\''/, arr); if (arr[1] && arr[2]) print toupper(arr[1]), arr[2];}' > "$OUTPUT_FILE"
