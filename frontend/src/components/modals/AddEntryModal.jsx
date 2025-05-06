import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Plus } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import toast from "react-hot-toast";
import { useExpenseStore } from '../../store/useExpenseStore';

const AddEntryModal = forwardRef((props, ref) => {
  const { addEntry, editEntry } = useExpenseStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [formData, setFormData] = useState({
    emoji: "",
    category: "",
    amount: "",
    note: "",
    type: `${props.type}`,
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
  });

  useEffect(() => {
    // Update selectedEmoji when props.emoji changes
    if (props.emoji) {
      setSelectedEmoji(props.emoji);
    }
  }, [props.emoji]);

  const openAddIncomeModal = () => {
    // Reset form when opening modal with provided data or defaults
    setSelectedEmoji(props.emoji || null);
    setFormData({
      emoji: props.emoji || "",
      category: props.category || "",
      amount: props.amount || "",
      note: props.note || "",
      type: props.type || "income",
      date: props.date || new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  // Expose the openAddIncomeModal function via ref
  useImperativeHandle(ref, () => ({
    openModal: openAddIncomeModal
  }));

  const closeAddIncomeModal = () => {
    setIsModalOpen(false);
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setFormData({...formData, emoji: emojiObject.emoji});
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const saveEntry = async() => {
    // Validate form fields
    if (!formData.category.trim() || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (props.edit) {
      await editEntry(formData, props.id);
    } else {
      await addEntry(formData);
    }
    
    closeAddIncomeModal();
  };

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{props.name || "Add Entry"}</h2>
              <button 
                onClick={closeAddIncomeModal}
                className="text-base-500 hover:text-base-700 cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* emoji Selection with Preview */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm">Icon</label>
                <div className="relative">
                  <div 
                    className="flex items-center border border-gray-300 rounded-md p-2 cursor-pointer"
                    onClick={toggleEmojiPicker}
                  >
                    {selectedEmoji ? (
                      <div className="flex items-center w-full">
                        <span className="text-xl mr-2">{selectedEmoji}</span>
                        <span className="text-gray-500 text-sm">Click to change</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-gray-500">Select an emoji</span>
                        <Plus className="h-5 w-5 text-gray-500" />
                      </div> 
                    )}
                  </div>
                  
                  {showEmojiPicker && (
                    <div className="absolute mt-1 z-50">
                      <EmojiPicker 
                        onEmojiClick={handleEmojiClick}
                        previewConfig={{ showPreview: true }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm">Category <span className="text-red-500">*</span></label>
                <input 
                  name="category"
                  type="text" 
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Salary, Freelance, etc."
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-1 text-sm">Amount <span className="text-red-500">*</span></label>
                <input 
                  name="amount"
                  type="number" 
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm">Note</label>
                <input 
                  name="note"
                  type="text" 
                  value={formData.note}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Description..."
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm">Date</label>
                <input 
                  name="date"
                  type="date" 
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  onClick={closeAddIncomeModal}
                  className="px-4 py-2 border border-base-300 rounded-md text-base-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEntry}
                  className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default AddEntryModal;