import { Wallet } from "./wallet"
import { SwapService } from "./swap"
import { PriceService } from "./price"

// Common Solana token addresses
const TOKENS = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
}

async function main() {
  console.log("🚀 Solana Trading App")
  console.log("=" .repeat(50))

  // Create a new wallet on devnet
  const wallet = new Wallet({ network: "devnet" })
  console.log("\n📝 Wallet created:")
  console.log(`  Address: ${wallet.address}`)

  // Get wallet balance
  const balance = await wallet.getBalance()
  console.log(`  Balance: ${balance} SOL`)

  // Request airdrop if balance is low
  if (balance < 0.5) {
    console.log("\n💰 Requesting airdrop...")
    try {
      const signature = await wallet.airdrop(1)
      console.log(`  Airdrop successful: ${signature}`)
      const newBalance = await wallet.getBalance()
      console.log(`  New balance: ${newBalance} SOL`)
    } catch (error) {
      console.error("  Airdrop failed:", error)
    }
  }

  // Initialize services
  const priceService = new PriceService()
  const swapService = new SwapService()

  // Fetch token prices
  console.log("\n📊 Fetching token prices...")
  const prices = await priceService.getPrices([
    TOKENS.SOL,
    TOKENS.USDC,
    TOKENS.USDT
  ])

  for (const [address, price] of prices) {
    console.log(`  ${price.symbol}: $${price.priceUsd}`)
  }

  // Get a swap quote (SOL to USDC)
  console.log("\n💱 Getting swap quote (1 SOL -> USDC)...")
  try {
    const quote = await priceService.getQuote(
      TOKENS.SOL,
      TOKENS.USDC,
      1_000_000_000 // 1 SOL in lamports
    )

    if (quote) {
      console.log("  Quote received:")
      console.log(`    Input: ${Number(quote.inputAmount) / 1e9} SOL`)
      console.log(`    Output: ${Number(quote.outputAmount) / 1e6} USDC`)
      console.log(`    Price Impact: ${quote.priceImpact}%`)
    }
  } catch (error) {
    console.error("  Failed to get quote:", error)
  }

  // Demo swap execution (won't actually execute on devnet without funds)
  console.log("\n🔄 Demo swap execution...")
  try {
    const result = await swapService.executeSwap(wallet, {
      inputMint: TOKENS.SOL,
      outputMint: TOKENS.USDC,
      amount: 100_000_000, // 0.1 SOL
      slippage: 1 // 1% slippage tolerance
    })

    if (result.success) {
      console.log(`  ✅ Swap successful: ${result.signature}`)
    } else {
      console.log(`  ❌ Swap failed: ${result.error}`)
    }
  } catch (error) {
    console.error("  Swap error:", error)
  }

  console.log("\n" + "=".repeat(50))
  console.log("Demo completed!")
}

main().catch(console.error)
