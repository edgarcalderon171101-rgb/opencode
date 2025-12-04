import { Connection, Keypair } from "./wallet"

export interface TransactionInstruction {
  programId: string
  keys: Array<{ pubkey: string; isSigner: boolean; isWritable: boolean }>
  data: Uint8Array
}

export interface Transaction {
  instructions: TransactionInstruction[]
}

export interface TransactionResult {
  signature: string
  success: boolean
  error?: string
}

export class TransactionBuilder {
  private instructions: TransactionInstruction[] = []

  addInstruction(instruction: TransactionInstruction): this {
    this.instructions.push(instruction)
    return this
  }

  addInstructions(instructions: TransactionInstruction[]): this {
    this.instructions.push(...instructions)
    return this
  }

  build(): Transaction {
    return {
      instructions: [...this.instructions]
    }
  }

  clear(): this {
    this.instructions = []
    return this
  }

  async execute(
    connection: Connection,
    signer: Keypair
  ): Promise<TransactionResult> {
    try {
      const transaction = this.build()
      // Mock transaction execution
      console.log(`Executing transaction with ${transaction.instructions.length} instructions...`)
      const signature = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

      return {
        signature,
        success: true
      }
    } catch (error) {
      return {
        signature: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }
    }
  }
}

export async function sendTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Keypair[]
): Promise<TransactionResult> {
  try {
    // Mock transaction sending
    console.log(`Sending transaction with ${signers.length} signers...`)
    const signature = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

    return {
      signature,
      success: true
    }
  } catch (error) {
    return {
      signature: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}
