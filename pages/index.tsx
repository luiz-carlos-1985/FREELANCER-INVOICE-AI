import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Sparkles, Calculator, Clock, CreditCard, Plus, Trash2, Eye } from 'lucide-react'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface InvoiceData {
  invoiceNumber: string
  clientName: string
  clientEmail: string
  clientAddress: string
  freelancerName: string
  freelancerEmail: string
  freelancerAddress: string
  logo: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  dueDate: string
  notes: string
}

export default function FreelancerInvoiceAI() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    freelancerName: '',
    freelancerEmail: '',
    freelancerAddress: '',
    logo: '',
    items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    dueDate: '',
    notes: ''
  })

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      })
    }))
  }

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax
    
    setInvoiceData(prev => ({
      ...prev,
      subtotal,
      tax,
      total
    }))
  }

  const generateInvoice = () => {
    setIsGenerating(true)
    calculateTotals()
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 2000)
  }

  const steps = [
    { number: 1, title: 'Client Info', icon: FileText },
    { number: 2, title: 'Services', icon: Calculator },
    { number: 3, title: 'Review', icon: Eye },
  ]

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Invoice Generator
            </h1>
          </div>
          <p className="text-xl text-gray-300">Professional invoices in seconds</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <span className={`ml-3 font-semibold ${
                  currentStep >= step.number ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded-full ${
                    currentStep > step.number ? 'bg-purple-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-purple rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileText className="w-8 h-8 mr-3 text-purple-400" />
                Client & Freelancer Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black/10 rounded-2xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    Client Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
                      <input
                        type="text"
                        placeholder="Enter client full name"
                        className={`form-input w-full ${errors.clientName ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.clientName}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))
                          if (errors.clientName) setErrors(prev => ({ ...prev, clientName: '' }))
                        }}
                      />
                      {errors.clientName && <p className="text-red-400 text-sm mt-1">{errors.clientName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Email *</label>
                      <input
                        type="email"
                        placeholder="client@company.com"
                        className={`form-input w-full ${errors.clientEmail ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.clientEmail}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, clientEmail: e.target.value }))
                          if (errors.clientEmail) setErrors(prev => ({ ...prev, clientEmail: '' }))
                        }}
                      />
                      {errors.clientEmail && <p className="text-red-400 text-sm mt-1">{errors.clientEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Address *</label>
                      <textarea
                        placeholder="Street Address&#10;City, State, ZIP&#10;Country"
                        className={`form-input w-full h-28 resize-none ${errors.clientAddress ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.clientAddress}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))
                          if (errors.clientAddress) setErrors(prev => ({ ...prev, clientAddress: '' }))
                        }}
                      />
                      {errors.clientAddress && <p className="text-red-400 text-sm mt-1">{errors.clientAddress}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/10 rounded-2xl p-6 border border-pink-500/20">
                  <h3 className="text-xl font-bold mb-6 text-pink-300 flex items-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">F</span>
                    </div>
                    Your Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className={`form-input w-full ${errors.freelancerName ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.freelancerName}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, freelancerName: e.target.value }))
                          if (errors.freelancerName) setErrors(prev => ({ ...prev, freelancerName: '' }))
                        }}
                      />
                      {errors.freelancerName && <p className="text-red-400 text-sm mt-1">{errors.freelancerName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Email *</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className={`form-input w-full ${errors.freelancerEmail ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.freelancerEmail}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, freelancerEmail: e.target.value }))
                          if (errors.freelancerEmail) setErrors(prev => ({ ...prev, freelancerEmail: '' }))
                        }}
                      />
                      {errors.freelancerEmail && <p className="text-red-400 text-sm mt-1">{errors.freelancerEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Address *</label>
                      <textarea
                        placeholder="Street Address&#10;City, State, ZIP&#10;Country"
                        className={`form-input w-full h-28 resize-none ${errors.freelancerAddress ? 'border-red-500 focus:border-red-500' : ''}`}
                        value={invoiceData.freelancerAddress}
                        onChange={(e) => {
                          setInvoiceData(prev => ({ ...prev, freelancerAddress: e.target.value }))
                          if (errors.freelancerAddress) setErrors(prev => ({ ...prev, freelancerAddress: '' }))
                        }}
                      />
                      {errors.freelancerAddress && <p className="text-red-400 text-sm mt-1">{errors.freelancerAddress}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-input w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              setInvoiceData(prev => ({ ...prev, logo: event.target?.result as string }))
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                      {invoiceData.logo && (
                        <div className="mt-2 flex items-center gap-3">
                          <img src={invoiceData.logo} alt="Logo preview" className="w-20 h-20 object-contain bg-white rounded-lg p-2" />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setInvoiceData(prev => ({ ...prev, logo: '' }))}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10"
                            title="Remove logo"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8">
                <p className="text-gray-400 text-sm">* Required fields</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newErrors: {[key: string]: string} = {}
                    
                    if (!invoiceData.clientName.trim()) newErrors.clientName = 'Client name is required'
                    if (!invoiceData.clientEmail.trim()) newErrors.clientEmail = 'Client email is required'
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceData.clientEmail)) newErrors.clientEmail = 'Invalid email format'
                    if (!invoiceData.clientAddress.trim()) newErrors.clientAddress = 'Client address is required'
                    
                    if (!invoiceData.freelancerName.trim()) newErrors.freelancerName = 'Your name is required'
                    if (!invoiceData.freelancerEmail.trim()) newErrors.freelancerEmail = 'Your email is required'
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceData.freelancerEmail)) newErrors.freelancerEmail = 'Invalid email format'
                    if (!invoiceData.freelancerAddress.trim()) newErrors.freelancerAddress = 'Your address is required'
                    
                    if (Object.keys(newErrors).length > 0) {
                      setErrors(newErrors)
                      return
                    }
                    
                    setErrors({})
                    setCurrentStep(2)
                  }}
                  className="btn-generate flex items-center"
                >
                  Next Step
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    →
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-purple rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calculator className="w-8 h-8 mr-3 text-purple-400" />
                Services & Items
              </h2>
              
              <div className="space-y-4 mb-6">
                {invoiceData.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 rounded-xl p-4 border border-purple-500/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <input
                          type="text"
                          placeholder="Enter service description"
                          className={`form-input w-full ${errors[`item-${item.id}-description`] ? 'border-red-500 focus:border-red-500' : ''}`}
                          value={item.description}
                          onChange={(e) => {
                            updateItem(item.id, 'description', e.target.value)
                            if (errors[`item-${item.id}-description`]) {
                              setErrors(prev => ({ ...prev, [`item-${item.id}-description`]: '' }))
                            }
                          }}
                        />
                        {errors[`item-${item.id}-description`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`item-${item.id}-description`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Quantity *</label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          placeholder="1"
                          className={`form-input w-full ${errors[`item-${item.id}-quantity`] ? 'border-red-500 focus:border-red-500' : ''}`}
                          value={item.quantity || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0
                            updateItem(item.id, 'quantity', value)
                            if (errors[`item-${item.id}-quantity`]) {
                              setErrors(prev => ({ ...prev, [`item-${item.id}-quantity`]: '' }))
                            }
                          }}
                        />
                        {errors[`item-${item.id}-quantity`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`item-${item.id}-quantity`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rate ($) *</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className={`form-input w-full ${errors[`item-${item.id}-rate`] ? 'border-red-500 focus:border-red-500' : ''}`}
                          value={item.rate || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0
                            updateItem(item.id, 'rate', value)
                            if (errors[`item-${item.id}-rate`]) {
                              setErrors(prev => ({ ...prev, [`item-${item.id}-rate`]: '' }))
                            }
                          }}
                        />
                        {errors[`item-${item.id}-rate`] && (
                          <p className="text-red-400 text-sm mt-1">{errors[`item-${item.id}-rate`]}</p>
                        )}
                      </div>
                      <div className="flex items-end justify-between h-full">
                        <div className="text-center">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                          <span className="font-bold text-xl text-green-400">${item.amount.toFixed(2)}</span>
                        </div>
                        {invoiceData.items.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addItem}
                className="flex items-center text-purple-400 hover:text-purple-300 mb-6 bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Item
              </motion.button>
              
              <div className="bg-black/10 rounded-xl p-6 border border-purple-500/20 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-purple-300">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="form-input w-full"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                    <textarea
                      placeholder="Payment terms, additional information..."
                      className="form-input w-full h-24 resize-none"
                      value={invoiceData.notes}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              {/* Summary */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-sm">Items</p>
                    <p className="text-2xl font-bold text-white">{invoiceData.items.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Subtotal</p>
                    <p className="text-2xl font-bold text-green-400">${invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total (with 10% tax)</p>
                    <p className="text-2xl font-bold text-purple-400">${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center"
                >
                  ← Back
                </motion.button>
                <p className="text-gray-400 text-sm">* Required fields</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newErrors: {[key: string]: string} = {}
                    
                    invoiceData.items.forEach((item) => {
                      if (!item.description.trim()) {
                        newErrors[`item-${item.id}-description`] = 'Description is required'
                      }
                      if (!item.quantity || item.quantity <= 0) {
                        newErrors[`item-${item.id}-quantity`] = 'Quantity must be greater than 0'
                      }
                      if (!item.rate || item.rate <= 0) {
                        newErrors[`item-${item.id}-rate`] = 'Rate must be greater than 0'
                      }
                    })
                    
                    if (Object.keys(newErrors).length > 0) {
                      setErrors(newErrors)
                      return
                    }
                    
                    setErrors({})
                    setCurrentStep(3)
                  }}
                  className="btn-generate flex items-center"
                >
                  Review Invoice
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    →
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Summary */}
              <div className="glass-purple rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">Invoice Summary</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold">{invoiceData.items.length}</h3>
                    <p className="text-gray-400">Items</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calculator className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold">${invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</h3>
                    <p className="text-gray-400">Subtotal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold">${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(2)}</h3>
                    <p className="text-gray-400">Total (with tax)</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(2)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateInvoice}
                    disabled={isGenerating}
                    className="btn-generate flex items-center"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate Invoice
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Invoice Preview */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden"
                  >
                    <div id="invoice-content" className="p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200">
                        <div className="flex items-center">
                          {invoiceData.logo && (
                            <img src={invoiceData.logo} alt="Company Logo" className="w-16 h-16 object-contain mr-4" />
                          )}
                          <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">INVOICE</h1>
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg inline-block">
                              <span className="font-semibold text-sm">#{invoiceData.invoiceNumber}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">{invoiceData.freelancerName}</h2>
                            <p className="text-gray-600 text-sm mb-1">{invoiceData.freelancerEmail}</p>
                            <p className="text-gray-600 text-xs whitespace-pre-line">{invoiceData.freelancerAddress}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Invoice Details */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Bill To:</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-lg font-bold text-gray-900 mb-1">{invoiceData.clientName}</p>
                            <p className="text-gray-600 text-sm mb-1">{invoiceData.clientEmail}</p>
                            <p className="text-gray-600 text-xs whitespace-pre-line">{invoiceData.clientAddress}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Invoice Details:</h3>
                          <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600 text-sm">Issue Date:</span>
                              <span className="font-semibold text-gray-900 text-sm">{new Date().toLocaleDateString()}</span>
                            </div>
                            {invoiceData.dueDate && (
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">Due Date:</span>
                                <span className="font-semibold text-gray-900 text-sm">{new Date(invoiceData.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600 text-sm">Currency:</span>
                              <span className="font-semibold text-gray-900 text-sm">USD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Items Table */}
                      <div className="mb-6">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              <th className="text-left py-2 px-4 font-bold uppercase tracking-wide text-sm">Description</th>
                              <th className="text-center py-2 px-4 font-bold uppercase tracking-wide text-sm">Qty</th>
                              <th className="text-right py-2 px-4 font-bold uppercase tracking-wide text-sm">Rate</th>
                              <th className="text-right py-2 px-4 font-bold uppercase tracking-wide text-sm">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoiceData.items.map((item, index) => (
                              <tr key={item.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}>
                                <td className="py-2 px-4 text-gray-900 font-medium text-sm">{item.description}</td>
                                <td className="py-2 px-4 text-center text-gray-900 text-sm">{item.quantity}</td>
                                <td className="py-2 px-4 text-right text-gray-900 text-sm">${item.rate.toFixed(2)}</td>
                                <td className="py-2 px-4 text-right text-gray-900 font-bold text-sm">${item.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Totals */}
                      <div className="flex justify-end mb-6">
                        <div className="w-64">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between py-1 text-gray-700">
                              <span className="text-sm">Subtotal:</span>
                              <span className="font-semibold text-sm">${invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-1 text-gray-700">
                              <span className="text-sm">Tax (10%):</span>
                              <span className="font-semibold text-sm">${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="border-t-2 border-gray-300 mt-2 pt-2">
                              <div className="flex justify-between py-1">
                                <span className="text-lg font-bold text-gray-900">Total:</span>
                                <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                  ${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Notes */}
                      {invoiceData.notes && (
                        <div className="mb-4">
                          <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Notes:</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm leading-relaxed">{invoiceData.notes}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Footer */}
                      <div className="text-center pt-8 border-t border-gray-200 no-print">
                        <p className="text-gray-500 text-sm">Thank you for your business!</p>
                      </div>
                    </div>
                    
                    {/* Download Button */}
                    <div className="bg-gray-50 p-6 text-center border-t no-print">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const invoiceContent = document.getElementById('invoice-content');
                          const newWindow = window.open('', '_blank');
                          
                          newWindow.document.write(`
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <title>Invoice ${invoiceData.invoiceNumber}</title>
                                <style>
                                  @page { 
                                    size: A4; 
                                    margin: 15mm;
                                  }
                                  * {
                                    box-sizing: border-box;
                                  }
                                  body { 
                                    font-family: Arial, sans-serif; 
                                    margin: 0; 
                                    padding: 0; 
                                    font-size: 11px;
                                    line-height: 1.3;
                                    color: #000;
                                  }
                                  .header { 
                                    display: flex; 
                                    justify-content: space-between; 
                                    margin-bottom: 15px; 
                                    padding-bottom: 10px; 
                                    border-bottom: 2px solid #ccc;
                                  }
                                  .invoice-title { 
                                    font-size: 24px; 
                                    font-weight: bold; 
                                    margin-bottom: 5px;
                                  }
                                  .invoice-number { 
                                    background: #8b5cf6; 
                                    color: white; 
                                    padding: 3px 8px; 
                                    border-radius: 4px; 
                                    font-size: 10px;
                                  }
                                  .details-grid { 
                                    display: grid; 
                                    grid-template-columns: 1fr 1fr; 
                                    gap: 20px; 
                                    margin-bottom: 15px;
                                  }
                                  .section-title { 
                                    font-weight: bold; 
                                    font-size: 10px; 
                                    text-transform: uppercase; 
                                    margin-bottom: 8px;
                                  }
                                  .info-box { 
                                    background: #f5f5f5; 
                                    padding: 10px; 
                                    border-radius: 4px;
                                  }
                                  table { 
                                    width: 100%; 
                                    border-collapse: collapse; 
                                    margin-bottom: 15px;
                                  }
                                  th { 
                                    background: #8b5cf6; 
                                    color: white; 
                                    padding: 8px; 
                                    font-size: 9px; 
                                    text-transform: uppercase;
                                  }
                                  td { 
                                    padding: 6px 8px; 
                                    border-bottom: 1px solid #ddd; 
                                    font-size: 10px;
                                  }
                                  .totals { 
                                    float: right; 
                                    width: 200px; 
                                    margin-bottom: 15px;
                                  }
                                  .totals-box { 
                                    background: #f5f5f5; 
                                    padding: 10px; 
                                    border-radius: 4px;
                                  }
                                  .total-row { 
                                    display: flex; 
                                    justify-content: space-between; 
                                    margin: 3px 0;
                                  }
                                  .final-total { 
                                    border-top: 2px solid #ccc; 
                                    padding-top: 5px; 
                                    font-weight: bold; 
                                    font-size: 12px;
                                  }
                                  .notes { 
                                    clear: both; 
                                    margin-top: 20px;
                                  }
                                  .notes-box { 
                                    background: #f5f5f5; 
                                    padding: 10px; 
                                    border-radius: 4px; 
                                    font-size: 10px;
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="header">
                                  <div style="display: flex; align-items: center;">
                                    ${invoiceData.logo ? `<img src="${invoiceData.logo}" alt="Logo" style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px;">` : ''}
                                    <div>
                                      <div class="invoice-title">INVOICE</div>
                                      <span class="invoice-number">#${invoiceData.invoiceNumber}</span>
                                    </div>
                                  </div>
                                  <div class="info-box" style="text-align: right;">
                                    <div style="font-weight: bold; margin-bottom: 3px;">${invoiceData.freelancerName}</div>
                                    <div style="margin-bottom: 2px;">${invoiceData.freelancerEmail}</div>
                                    <div style="font-size: 9px;">${invoiceData.freelancerAddress.replace(/\n/g, '<br>')}</div>
                                  </div>
                                </div>
                                
                                <div class="details-grid">
                                  <div>
                                    <div class="section-title">Bill To:</div>
                                    <div class="info-box">
                                      <div style="font-weight: bold; margin-bottom: 3px;">${invoiceData.clientName}</div>
                                      <div style="margin-bottom: 2px;">${invoiceData.clientEmail}</div>
                                      <div style="font-size: 9px;">${invoiceData.clientAddress.replace(/\n/g, '<br>')}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <div class="section-title">Invoice Details:</div>
                                    <div class="info-box">
                                      <div class="total-row">
                                        <span>Issue Date:</span>
                                        <span>${new Date().toLocaleDateString()}</span>
                                      </div>
                                      ${invoiceData.dueDate ? `
                                      <div class="total-row">
                                        <span>Due Date:</span>
                                        <span>${new Date(invoiceData.dueDate).toLocaleDateString()}</span>
                                      </div>` : ''}
                                      <div class="total-row">
                                        <span>Currency:</span>
                                        <span>USD</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <table>
                                  <thead>
                                    <tr>
                                      <th style="text-align: left;">Description</th>
                                      <th style="text-align: center;">Qty</th>
                                      <th style="text-align: right;">Rate</th>
                                      <th style="text-align: right;">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${invoiceData.items.map((item, index) => `
                                    <tr style="background: ${index % 2 === 0 ? '#f9f9f9' : 'white'}">
                                      <td>${item.description}</td>
                                      <td style="text-align: center;">${item.quantity}</td>
                                      <td style="text-align: right;">$${item.rate.toFixed(2)}</td>
                                      <td style="text-align: right; font-weight: bold;">$${item.amount.toFixed(2)}</td>
                                    </tr>`).join('')}
                                  </tbody>
                                </table>
                                
                                <div class="totals">
                                  <div class="totals-box">
                                    <div class="total-row">
                                      <span>Subtotal:</span>
                                      <span>$${invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
                                    </div>
                                    <div class="total-row">
                                      <span>Tax (10%):</span>
                                      <span>$${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div class="total-row final-total">
                                      <span>Total:</span>
                                      <span>$${(invoiceData.items.reduce((sum, item) => sum + item.amount, 0) * 1.1).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                ${invoiceData.notes ? `
                                <div class="notes">
                                  <div class="section-title">Notes:</div>
                                  <div class="notes-box">
                                    ${invoiceData.notes}
                                  </div>
                                </div>` : ''}
                              </body>
                            </html>
                          `);
                          
                          newWindow.document.close();
                          newWindow.focus();
                          newWindow.print();
                          newWindow.close();
                        }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Download className="w-5 h-5 mr-2 inline" />
                        Download PDF
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}