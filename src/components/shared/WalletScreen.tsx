import React, { useState, useEffect } from 'react';
import { walletService } from '../../services';
import type { Wallet, Transaction } from '../../services';
import Swal from 'sweetalert2';

interface WalletScreenProps {
  onPayment?: () => void;
}

const WalletScreen: React.FC<WalletScreenProps> = ({ onPayment }) => {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [walletData, transactionData] = await Promise.all([
          walletService.getWallet(),
          walletService.getTransactions()
        ]);
        setWallet(walletData);
        setTransactions(Array.isArray(transactionData) ? transactionData : []);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
        setWallet(null);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, []);

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    try {
      const updatedWallet = await walletService.addMoney(parseFloat(amount));
      setWallet(updatedWallet);
      setShowAddMoney(false);
      setAmount('');
      // Refresh transactions
      const newTransactions = await walletService.getTransactions();
      setTransactions(newTransactions);
    } catch (error) {
      console.error('Failed to add money:', error);
      Swal.fire('Error', 'Failed to add money. Please try again.', 'error');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!wallet) {
    return <div className="flex justify-center items-center h-64">Failed to load wallet data</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
          <div className="text-3xl font-bold mb-4">₹{wallet.balance}</div>
          <button 
            onClick={() => setShowAddMoney(true)}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium"
          >
            Add Money
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₹{wallet.tiffin_deposit}</div>
            <div className="text-sm text-gray-600">Tiffin Deposit</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">₹{wallet.refundable_amount}</div>
            <div className="text-sm text-gray-600">Refundable</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No transactions yet
              </div>
            ) : (
              transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showAddMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Add Money</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                {[100, 200, 500].map((presetAmount) => (
                  <button 
                    key={presetAmount} 
                    onClick={() => setAmount(presetAmount.toString())}
                    className="py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    ₹{presetAmount}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddMoney(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                className="flex-1 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletScreen;