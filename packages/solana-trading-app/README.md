# Solana Trading App

A TypeScript-based Solana trading application that demonstrates token swaps, wallet management, and price monitoring on the Solana blockchain.

## Features

- **Wallet Management**: Create and manage Solana wallets
- **Token Swaps**: Execute token swaps on the Solana network
- **Price Monitoring**: Fetch real-time token prices from Jupiter API
- **Transaction Building**: Build and sign Solana transactions

## Installation

No external dependencies required! This is a standalone TypeScript implementation.

## Usage

```bash
export PATH="$HOME/.bun/bin:$PATH"
bun run src/index.ts
```

Or use the dev script:

```bash
export PATH="$HOME/.bun/bin:$PATH"
bun dev
```

## Development

Run the application in development mode:

```bash
export PATH="$HOME/.bun/bin:$PATH"
bun run dev
```

## Architecture

- `src/index.ts` - Main entry point and demo application
- `src/wallet.ts` - Wallet connection and management (mock implementation)
- `src/swap.ts` - Token swap functionality
- `src/price.ts` - Price fetching utilities (connects to Jupiter API)
- `src/transaction.ts` - Transaction building and signing (mock implementation)

## Implementation Notes

This is a demonstration application that shows the architecture of a Solana trading app. The wallet and transaction components use mock implementations to avoid external dependencies. The price service connects to real Jupiter APIs.

In a production application, you would:
- Use `@solana/web3.js` for real blockchain interactions
- Use `@solana/spl-token` for token program interactions
- Integrate with Jupiter Aggregator for actual swap execution
- Implement proper key management and security

## License

MIT
