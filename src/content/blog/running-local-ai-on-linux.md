---
title: "Running Local AI on Linux"
description: "Notes on running quantized open-weights models locally on modern Linux desktops."
pubDate: 2026-07-15
---

Running quantized open-weights models on Linux has gotten remarkably fast.

### Tooling Stack

- **ollama** for fast runtime management and model serving.
- **llama.cpp** for fine-grained CLI parameter tuning and GGUF quantization.
- **Open-WebUI** for local browser-based chat interface.

### Performance Notes

By offloading layers directly to GPU and leveraging AVX-512 extensions on Linux, local inference response speeds now easily rival remote API calls while staying 100% offline.
