import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StakingRewardsPanel = ({ walletConnected, onNotification }) => {
  const [calculatorAmount, setCalculatorAmount] = useState('10000');
  const [stakingPools] = useState([
    {
      id: 'POOL-001',
      name: 'LogiChain Token Staking',
      symbol: 'LGC',
      apy: '12.5%',
      stakedAmount: '10,000 LGC',
      rewardsEarned: '1,250 LGC',
      lockPeriod: '90 days',
      unlockDate: '2025-04-28',
    },
    {
      id: 'POOL-002',
      name: 'ETH Liquidity Pool',
      symbol: 'ETH-USDT',
      apy: '8.3%',
      stakedAmount: '2.5 ETH',
      rewardsEarned: '0.21 ETH',
      lockPeriod: 'Flexible',
      unlockDate: 'Anytime',
    },
  ]);

  const handleClaimRewards = (poolId) => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification(`Rewards claimed from ${poolId}`, 'success');
  };

  const handleStake = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification('Staking interface opened', 'success');
  };

  const calculateReturns = (months) => {
      const p = parseFloat(calculatorAmount) || 0;
      const r = 0.125; // 12.5% APY
      const t = months / 12;
      const amount = p * Math.pow((1 + r/12), 12 * t);
      const profit = amount - p;
      return { total: amount.toFixed(2), profit: profit.toFixed(2), percent: ((profit/p)*100).toFixed(1) };
  };

  return (
    <div className="space-y-6">
      {/* Total Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Staked Value</p>
              <p className="text-3xl font-bold text-foreground mt-2">₹6,15,000</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-xl">
                 <Icon name="Coins" className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Rewards Earned</p>
              <p className="text-3xl font-bold text-green-400 mt-2">₹48,750</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
                <Icon name="Gift" className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Average APY</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">10.4%</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
                <Icon name="TrendingUp" className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon name="Layers" className="w-5 h-5 text-primary" />
              Active Staking Pools
            </h2>
            <Button onClick={handleStake} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Plus" className="w-4 h-4 mr-2" />
              Stake Tokens
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {stakingPools?.map((pool) => (
            <div key={pool?.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/20">
                      <span className="text-primary font-bold text-lg">{pool?.symbol?.[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          {pool?.name}
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs">Active</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">{pool?.symbol}</p>
                    </div>
                    <div className="hidden md:block ml-auto">
                      <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-semibold">
                        {pool?.apy} APY
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-background/50 p-4 rounded-lg border border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Staked Amount</p>
                      <p className="font-semibold text-foreground">{pool?.stakedAmount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Rewards Earned</p>
                      <p className="font-semibold text-green-400">{pool?.rewardsEarned}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Lock Period</p>
                      <p className="text-foreground">{pool?.lockPeriod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Unlock Date</p>
                      <p className="text-foreground">{pool?.unlockDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleClaimRewards(pool?.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white border-none"
                    disabled={!walletConnected}
                  >
                    <Icon name="Download" className="w-4 h-4 mr-2" />
                    Claim Rewards
                  </Button>
                  <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-white/5">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Add More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compound Interest Calculator */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Icon name="Calculator" className="w-5 h-5 text-primary" />
                Reward Forecast Calculator
            </h3>
            <div className="w-full md:w-64 mt-4 md:mt-0">
                 <Input 
                    label="Investment Amount (₹)"
                    type="number" 
                    value={calculatorAmount} 
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    className="bg-background border-border text-foreground"
                 />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 6, 12].map((months, idx) => {
                const result = calculateReturns(months);
                return (
                  <div key={idx} className="p-4 bg-background border border-border rounded-xl">
                    <p className="text-xs text-muted-foreground mb-2">{months === 1 ? '1 Month' : months === 6 ? '6 Months' : '1 Year'}</p>
                    <p className="text-xl font-bold text-foreground">₹{result.total}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-green-400">+{result.profit}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">+{result.percent}%</span>
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default StakingRewardsPanel;