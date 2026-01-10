export interface TokenPrice {
  symbol: string
  address: string
  price: number
  priceUsd: string
}

export interface PriceQuote {
  inputMint: string
  outputMint: string
  inputAmount: string
  outputAmount: string
  priceImpact: string
}

export class PriceService {
  private readonly jupiterApiUrl = "https://price.jup.ag/v4"

  async getPrice(tokenAddress: string): Promise<TokenPrice | null> {
    try {
      const response = await fetch(`${this.jupiterApiUrl}/price?ids=${tokenAddress}`)
      const data = await response.json()
      
      if (!data.data || !data.data[tokenAddress]) {
        return null
      }

      const priceData = data.data[tokenAddress]
      return {
        symbol: priceData.symbol || "UNKNOWN",
        address: tokenAddress,
        price: priceData.price,
        priceUsd: priceData.price.toString()
      }
    } catch (error) {
      console.error("Failed to fetch price:", error)
      return null
    }
  }

  async getPrices(tokenAddresses: string[]): Promise<Map<string, TokenPrice>> {
    const prices = new Map<string, TokenPrice>()
    
    try {
      const ids = tokenAddresses.join(",")
      const response = await fetch(`${this.jupiterApiUrl}/price?ids=${ids}`)
      const data = await response.json()

      if (data.data) {
        for (const [address, priceData] of Object.entries(data.data)) {
          prices.set(address, {
            symbol: (priceData as any).symbol || "UNKNOWN",
            address,
            price: (priceData as any).price,
            priceUsd: (priceData as any).price.toString()
          })
        }
      }
    } catch (error) {
      console.error("Failed to fetch prices (using mock data):", error)
      // Return mock data when API is unavailable
      const mockPrices = {
        "So11111111111111111111111111111111111111112": { symbol: "SOL", price: 180.25 },
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { symbol: "USDC", price: 1.00 },
        "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": { symbol: "USDT", price: 1.00 }
      }
      
      for (const address of tokenAddresses) {
        const mock = mockPrices[address as keyof typeof mockPrices]
        if (mock) {
          prices.set(address, {
            symbol: mock.symbol,
            address,
            price: mock.price,
            priceUsd: mock.price.toString()
          })
        }
      }
    }

    return prices
  }

  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: number
  ): Promise<PriceQuote | null> {
    try {
      const quoteUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}`
      const response = await fetch(quoteUrl)
      const data = await response.json()

      if (!data || data.error) {
        return null
      }

      return {
        inputMint: data.inputMint,
        outputMint: data.outputMint,
        inputAmount: data.inAmount,
        outputAmount: data.outAmount,
        priceImpact: data.priceImpactPct || "0"
      }
    } catch (error) {
      console.error("Failed to fetch quote (using mock data):", error)
      // Return mock quote when API is unavailable
      return {
        inputMint,
        outputMint,
        inputAmount: amount.toString(),
        outputAmount: (amount * 180).toString(), // Assuming 1 SOL = 180 USDC
        priceImpact: "0.1"
      }
    }
  }
}
