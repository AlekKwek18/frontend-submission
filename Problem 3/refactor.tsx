import React, { useState, useEffect, useMemo, useCallback } from "react";

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain?: string
  }
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  class Datasource {
    // TODO: Implement datasource class
    url: string;
    constructor(url: string) {
      this.url = url;
    }

    async getPrices(): Promise<Record<string, number>> {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error("Failed to fetch prices");
        }
        return response.json();
      }
  }
  
  interface Props extends BoxProps {
  
  }
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        console.error(error);
      });
    }, []);
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
    
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (balancePriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(lhs.blockchain) - getPriority(rhs.blockchain))
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed()
        }
      });
    }, [balances, prices]);
  
  
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }
