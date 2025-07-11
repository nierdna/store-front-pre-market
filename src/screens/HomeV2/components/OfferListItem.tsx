import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IOffer } from '@/types/offer';
import { formatNumberShort } from '@/utils/helpers/number';
import { normalizeNetworkName, truncateAddress } from '@/utils/helpers/string';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getColorFromCollateral } from './OfferCard';

interface OfferListItemProps {
  offer: IOffer;
}

export default function OfferListItem({ offer }: OfferListItemProps) {
  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-lg border-gray-300 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center p-4 gap-4">
      {/* Token Info */}
      <div className="flex items-center gap-3 w-full sm:w-40 xl:w-48 flex-shrink-0">
        <div className="w-8 h-8 xl:w-12 xl:h-12 relative min-w-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
          <Image
            src={
              'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Solana_logo.png/252px-Solana_logo.png'
            }
            // src={tokenImage || '/placeholder.svg'}
            alt={`${offer.tokens?.symbol} symbol`}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid gap-0.5">
          <div className="font-bold text-lg truncate">{offer.tokens?.symbol}</div>
          <Badge variant="secondary" className="w-fit text-xs">
            {normalizeNetworkName(offer.exToken?.network?.name)}
          </Badge>
        </div>
      </div>

      {/* Price & Sold */}
      <div className="flex flex-col items-start w-full sm:w-24 xl:w-32 flex-shrink-0">
        {/* <span className="text-sm text-gray-600">Price</span> */}
        <span className="font-bold text-green-500 text-xl">
          $
          {formatNumberShort(offer.price, {
            useShorterExpression: true,
          })}
        </span>
        <span className="text-xs text-gray-600">
          Sold:{' '}
          <span className="font-semibold text-foreground">
            {formatNumberShort(offer.filled, { useShorterExpression: true })}
          </span>
        </span>
      </div>

      {/* Payment, Collateral, Settle Time */}
      <div className="grid gap-1 text-sm min-w-24 flex-1 xl:min-w-[150px] lg:w-auto lg:flex-1">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Payment:</span>
          <div className="flex items-center gap-1 font-medium">
            <Image
              src={
                'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Solana_logo.png/252px-Solana_logo.png'
              }
              alt={`${offer.exToken?.symbol} symbol`}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Collateral:</span>
          <span
            className={cn('font-medium', getColorFromCollateral(offer.collateralPercent))}
          >{`${offer.collateralPercent}%`}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Settle:</span>
          <span className="font-medium">{offer.settleDuration}</span>
        </div>
      </div>

      {/* Seller Info */}
      <div className="flex flex-col items-start w-full sm:w-32 xl:w-48 md:flex-1 flex-shrink-0">
        {/* <span className="text-sm text-gray-600">Seller</span> */}
        <div className="flex items-start gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${
                offer.sellerWallet.address || Math.random().toString()
              }`}
            />
            {/* <AvatarFallback className="text-xs">
              {truncateAddress(offer.sellerWallet.address)}
            </AvatarFallback> */}
          </Avatar>
          <div className="grid gap-0.5">
            <div className="font-semibold text-sm truncate">
              {truncateAddress(offer.sellerWallet.address)}
            </div>
            <div className="flex items-center gap-0.5 text-sm text-gray-500">
              <span className="font-semibold">{Number(offer.sellerWallet?.rating || 0)}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* View Offer Button */}
      <Link href={`/offers/${offer.id}`} className="ml-auto flex-shrink-0 w-full sm:w-auto">
        <Button className="h-9 px-4 text-sm w-full gap-1">
          View
          <span className="hidden xl:inline">Offer</span>
        </Button>
      </Link>
    </Card>
  );
}
