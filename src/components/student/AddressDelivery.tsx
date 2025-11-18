import React, { useState, useEffect } from 'react';
import { addressService } from '../../services';
import type { Address } from '../../services';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface AddressDeliveryProps {
  onConfirm?: () => void;
  onBack?: () => void;
}

const AddressDelivery: React.FC<AddressDeliveryProps> = ({ onConfirm, onBack }) => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [deliveryType, setDeliveryType] = useState('hub');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddressName, setNewAddressName] = useState('');
  const [newAddressText, setNewAddressText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await addressService.getAddresses();
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    if (!newAddressName.trim() || !newAddressText.trim()) return;
    
    try {
      const newAddress = await addressService.createAddress({
        name: newAddressName,
        full_address: newAddressText,
        hub_supported: true
      });
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
      setShowAddModal(false);
      setNewAddressName('');
      setNewAddressText('');
    } catch (error) {
      console.error('Failed to add address:', error);
      Swal.fire('Error', 'Failed to add address. Please try again.', 'error');
    }
  };

  const selectedAddressData = addresses.find(addr => addr.id === selectedAddressId);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/meal-customize')} className="text-indigo-500 mr-4">← Back</button>
          <h1 className="text-xl font-bold">Address & Delivery</h1>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Select Address</h3>
          <select
            value={selectedAddressId || ''}
            onChange={(e) => setSelectedAddressId(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          >
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.id}>
                {addr.name} {addr.hub_supported ? '(Hub Available)' : ''}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-indigo-500 text-sm"
          >
            + Add New Address
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Delivery Options</h3>
          <div className="space-y-3">
            {selectedAddressData?.hub_supported && (
              <label className="flex items-center p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="hub"
                  checked={deliveryType === 'hub'}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Hub Delivery - ₹5</div>
                  <div className="text-sm text-gray-600">Collect from nearest hub</div>
                </div>
              </label>
            )}
            <label className="flex items-center p-3 border rounded-lg cursor-pointer">
              <input
                type="radio"
                name="delivery"
                value="hand"
                checked={deliveryType === 'hand'}
                onChange={(e) => setDeliveryType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Hand-on Delivery - ₹10</div>
                <div className="text-sm text-gray-600">Direct delivery to your location</div>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="text-sm space-y-1">
            <div>Address: {selectedAddressData?.name || 'No address selected'}</div>
            <div>ETA: 25-30 minutes</div>
            <div>Delivery Fee: ₹{deliveryType === 'hub' ? '5' : '10'}</div>
            <div className="font-semibold">Delivery Total: ₹{deliveryType === 'hub' ? '5' : '10'}</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/order-confirm')}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
        >
          Confirm Order
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
            <input
              type="text"
              placeholder="Address Name"
              value={newAddressName}
              onChange={(e) => setNewAddressName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3"
            />
            <textarea
              placeholder="Full Address"
              value={newAddressText}
              onChange={(e) => setNewAddressText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-20"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                className="flex-1 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressDelivery;