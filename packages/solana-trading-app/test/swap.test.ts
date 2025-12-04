import { describe, expect, test } from "bun:test"
import { SwapService } from "../src/swap"
import { Wallet } from "../src/wallet"

describe("SwapService", () => {
  test("should create swap service instance", () => {
    const service = new SwapService()
    
    expect(service).toBeDefined()
  })

  test("should get swap quote", async () => {
    const service = new SwapService()
    
    const quote = await service.getSwapQuote({
      inputMint: "So11111111111111111111111111111111111111112",
      outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 1_000_000_000
    })
    
    expect(quote).toBeDefined()
    expect(quote.inputMint).toBeDefined()
    expect(quote.outputMint).toBeDefined()
    expect(quote.inputAmount).toBeDefined()
    expect(quote.outputAmount).toBeDefined()
  })

  test("should execute swap successfully", async () => {
    const service = new SwapService()
    const wallet = new Wallet()
    
    const result = await service.executeSwap(wallet, {
      inputMint: "So11111111111111111111111111111111111111112",
      outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: 100_000_000,
      slippage: 1
    })
    
    expect(result).toBeDefined()
    expect(result.success).toBe(true)
    expect(result.signature).toBeDefined()
  })

  test("should transfer token successfully", async () => {
    const service = new SwapService()
    const wallet = new Wallet()
    const recipientAddress = "RecipientPublicKeyHere123456789"
    
    const result = await service.transferToken(
      wallet,
      "So11111111111111111111111111111111111111112",
      recipientAddress,
      1000
    )
    
    expect(result).toBeDefined()
    expect(result.success).toBe(true)
    expect(result.signature).toBeDefined()
  })
})
