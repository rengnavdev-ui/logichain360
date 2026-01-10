import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';


const DisputeResolution = ({ walletConnected }) => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const disputes = [
    {
      id: 'DSP-2024-001',
      contractId: 'CT-2024-006',
      title: 'Delayed Delivery - Customs Clearance',
      description: 'Shipment delayed by 48 hours due to customs documentation issues',
      initiatedBy: 'Shipper',
      initiatedDate: '2024-01-20',
      status: 'voting',
      votesFor: 7,
      votesAgainst: 3,
      totalVotes: 10,
      requiredVotes: 15,
      stakeAmount: '1.5 ETH',
      evidence: 3
    },
    {
      id: 'DSP-2024-002',
      contractId: 'CT-2024-003',
      title: 'Damaged Goods Claim',
      description: 'Receiver claims goods were damaged during transit',
      initiatedBy: 'Receiver',
      initiatedDate: '2024-01-18',
      status: 'evidence',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      requiredVotes: 15,
      stakeAmount: '2.1 ETH',
      evidence: 5
    },
    {
      id: 'DSP-2024-003',
      contractId: 'CT-2023-089',
      title: 'Payment Dispute',
      description: 'Carrier claims additional charges for route deviation',
      initiatedBy: 'Carrier',
      initiatedDate: '2024-01-15',
      status: 'resolved',
      votesFor: 12,
      votesAgainst: 3,
      totalVotes: 15,
      requiredVotes: 15,
      stakeAmount: '0.8 ETH',
      evidence: 4,
      resolution: 'Favor Carrier'
    }
  ];

  const statusConfig = {
    voting: { label: 'Active Voting', color: 'warning' },
    evidence: { label: 'Evidence Submission', color: 'info' },
    resolved: { label: 'Resolved', color: 'success' }
  };

  const handleVote = (disputeId, vote) => {
    setVoteSubmitted(true);
    setTimeout(() => setVoteSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Decentralized Dispute Resolution</h3>
          <p className="text-sm text-gray-600 mt-1">Community-driven arbitration with transparent voting</p>
        </div>
        <Button
          variant="default"
          iconName="AlertTriangle"
          disabled={!walletConnected}
        >
          Raise Dispute
        </Button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Scale" size={18} className="text-blue-600" />
            <span className="text-xs text-gray-600">Active Disputes</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={18} className="text-green-600" />
            <span className="text-xs text-gray-600">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">47</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Users" size={18} className="text-purple-600" />
            <span className="text-xs text-gray-600">Active Arbitrators</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={18} className="text-emerald-600" />
            <span className="text-xs text-gray-600">Resolution Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">94%</p>
        </div>
      </div>
      {/* Disputes List */}
      <div className="space-y-4">
        {disputes?.map((dispute) => (
          <div key={dispute?.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{dispute?.title}</h4>
                  <StatusIndicator 
                    status={statusConfig?.[dispute?.status]?.color}
                    label={statusConfig?.[dispute?.status]?.label}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-3">{dispute?.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Icon name="FileText" size={16} />
                    <span>Contract: {dispute?.contractId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>By: {dispute?.initiatedBy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{dispute?.initiatedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Paperclip" size={16} />
                    <span>{dispute?.evidence} Evidence Files</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting Progress */}
            {dispute?.status !== 'resolved' && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Voting Progress</span>
                  <span className="text-sm text-gray-600">{dispute?.totalVotes}/{dispute?.requiredVotes} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(dispute?.totalVotes / dispute?.requiredVotes) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="ThumbsUp" size={16} className="text-green-600" />
                    <span className="text-gray-700">For: {dispute?.votesFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="ThumbsDown" size={16} className="text-red-600" />
                    <span className="text-gray-700">Against: {dispute?.votesAgainst}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Resolution Result */}
            {dispute?.status === 'resolved' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Dispute Resolved</p>
                    <p className="text-xs text-green-700">Decision: {dispute?.resolution}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              {dispute?.status === 'voting' && (
                <>
                  <Button
                    size="sm"
                    variant="default"
                    iconName="ThumbsUp"
                    onClick={() => handleVote(dispute?.id, 'for')}
                    disabled={!walletConnected || voteSubmitted}
                  >
                    Vote For
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    iconName="ThumbsDown"
                    onClick={() => handleVote(dispute?.id, 'against')}
                    disabled={!walletConnected || voteSubmitted}
                  >
                    Vote Against
                  </Button>
                </>
              )}
              {dispute?.status === 'evidence' && (
                <Button
                  size="sm"
                  variant="default"
                  iconName="Upload"
                  disabled={!walletConnected}
                >
                  Submit Evidence
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                iconName="Eye"
                onClick={() => setSelectedDispute(dispute)}
              >
                View Details
              </Button>
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                <Icon name="DollarSign" size={16} />
                <span className="font-semibold">{dispute?.stakeAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">How Dispute Resolution Works</p>
            <ul className="mt-2 space-y-1 text-xs text-blue-700">
              <li>• Any party can raise a dispute by staking tokens</li>
              <li>• Community arbitrators review evidence and vote</li>
              <li>• Majority vote determines the outcome</li>
              <li>• Automated settlement executes based on decision</li>
              <li>• Winning party receives staked tokens back plus compensation</li>
            </ul>
          </div>
        </div>
      </div>
      {voteSubmitted && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Icon name="CheckCircle" size={20} />
          <span>Vote submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;