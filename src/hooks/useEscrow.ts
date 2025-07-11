import { useLynxReown } from 'lynx-reown-dapp-kit';
import { useMemo } from 'react';
import { CONTRACTS } from '../contracts/contracts';
import { IEscrow } from '../contracts/escrow/types';
import { EscrowEvm } from '../contracts/escrow/evm';

export const useEscrow = (
  chainId: string
): {
  escrowContract: IEscrow | undefined;
} => {
  const { chains } = useLynxReown();

  const chain = useMemo(() => {
    return chains.find((chain) => chain.chainId === chainId);
  }, [chains, chainId]);

  const escrowContract = useMemo(() => {
    if (!chain) return undefined;
    const contractAddress = CONTRACTS[chainId as keyof typeof CONTRACTS].ESCROW;

    if (chain.chainType === 'evm') {
      return new EscrowEvm(contractAddress, chain.rpc);
    }
  }, [chain, chainId]);

  return {
    escrowContract,
  };
};
