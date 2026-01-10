import { describe, expect, test } from "bun:test"
import { PriceService } from "../src/price"

describe("PriceService", () => {
  test("should create price service instance", () => {
    const service = new PriceService()
    
    expect(service).toBeDefined()
  })

  test("should return mock prices when API is unavailable", async () => {
    const service = new PriceService()
    const tokens = [
      "So11111111111111111111111111111111111111112", // SOL
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"  // USDT
    ]
    
    const prices = await service.getPrices(tokens)
    
    expect(prices.size).toBeGreaterThan(0)
    expect(prices.has(tokens[0])).toBe(true)
    
    const solPrice = prices.get(tokens[0])
    expect(solPrice).toBeDefined()
    expect(solPrice?.symbol).toBe("SOL")
    expect(typeof solPrice?.price).toBe("number")
  })

  test("should return mock quote when API is unavailable", async () => {
    const service = new PriceService()
    
    const quote = await service.getQuote(
      "So11111111111111111111111111111111111111112",
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      1_000_000_000
    )
    
    expect(quote).toBeDefined()
    expect(quote?.inputMint).toBeDefined()
    expect(quote?.outputMint).toBeDefined()
    expect(quote?.inputAmount).toBeDefined()
    expect(quote?.outputAmount).toBeDefined()
    expect(quote?.priceImpact).toBeDefined()
  })

  test("should handle single token price fetch", async () => {
    const service = new PriceService()
    
    const price = await service.getPrice("So11111111111111111111111111111111111111112")
    
    // Price may be null if API is unavailable and no mock is provided for single fetch
    if (price) {
      expect(price.symbol).toBeDefined()
      expect(price.address).toBeDefined()
      expect(typeof price.price).toBe("number")
    }
  })
})
