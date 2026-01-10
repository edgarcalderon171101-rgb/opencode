## All-in-One Master AI System Overview

This document captures the guardrails and system behaviors needed for the master AI setup.

### 1. Admin-controlled access
- All workflows stay locked behind admin-issued API keys. Without a valid key, no session or workflow entry point should accept requests.
- Keys map to admin identities and must support rotation and revocation so access can be pulled immediately when required.

### 2. CodeSpace integration
- The AI operates inside whatever CodeSpace or host it is given (including Android) while staying sandboxed to the configured workspace root.
- File and command tools must resolve paths against the sandbox root to prevent escaping the project while still allowing full build/modify/manage operations inside it.

### 3. Integrated AI browser and search
- Use the built-in browsing stack (for example the `webfetch` tool or Model Context Protocol (MCP) servers that expose search/browse tools) instead of launching an external browser.
- Normalized responses (text/markdown/html) flow back into the agent loop so the AI can validate code and plan features entirely inside the environment.

### 4. Automated code creation and terminal interaction
- The agent uses its code tools (`write`, `edit`, `patch`) and terminal access (`bash`) to scaffold projects, create files, and run commands.
- Before executing commands, the agent must surface an admin approval prompt that describes the command, the execution timeout being requested, and the intent.

### 5. Admin permissions and control
- Every sensitive action is gated by the permission API (`Permission.ask` raises the request and `Permission.respond` records the admin decision): admins can allow once, always, or reject.
- Approvals are scoped to the session and a command/tool pattern (the action type or a matched command string), ensuring the AI re-requests permission when intent or command parameters change.
