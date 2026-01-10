## Master AI System Overview

Scope: high-level operating model; assemble/configure existing AI modules/repos already present in the codespace; no executable code or automated transfers.

### 1) Admin-Controlled Access
- System unlocks only with valid API keys held by admins.
- All AI workflows, configurations, and executions require admin authentication.

### 2) Codespaces Integration
- Runs in any codespace-like environment (including mobile/Android shells) as a sandbox.
- Allows AI-driven build/modify/manage of code inside that sandbox without external dependencies.

### 3) Integrated AI Browser and Search
- Built-in search/browser surface for in-environment discovery, validation, and side-by-side comparisons.
- No reliance on external browsers; results stay inside the controlled workspace.

### 4) Automated Code Creation and Terminal Interaction
- AI can scaffold projects, create files, and issue terminal commands.
- Every command or structural change is staged for admin approval before execution.

### 5) Admin Permissions and Control
- Admin approval gates all significant changes (command execution, file writes, deployments).
- Admins can allow, deny, or lock execution paths to maintain security and compliance.
