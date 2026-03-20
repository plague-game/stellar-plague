'use client'

import { useState, useCallback, useEffect } from 'react'

// TODO: Issue #8 - Complete Freighter wallet integration hook

interface WalletState {
  isConnected: boolean
  address: string | null
  network: string | null
  isLoading: boolean
  error: string | null
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: null,
    isLoading: false,
    error: null,
  })

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // TODO: Issue #8 - Implement Freighter connection
      // const { address } = await getPublicKey()
      // const network = await getNetworkDetails()
      throw new Error('Wallet connection not implemented — see issue #8')
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      }))
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({ isConnected: false, address: null, network: null, isLoading: false, error: null })
  }, [])

  const signTransaction = useCallback(async (xdr: string): Promise<string> => {
    // TODO: Issue #8 - Implement transaction signing
    throw new Error('Not implemented — see issue #8')
  }, [])

  return { ...state, connect, disconnect, signTransaction }
}
