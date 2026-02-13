'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { submitDateDetails } from '@/app/actions'

export default function ValentineCard({ secretCode, personName }) {
  const [stage, setStage] = useState(1)
  const [codeInput, setCodeInput] = useState('')
  const [error, setError] = useState('')
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [hour, setHour] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (codeInput === secretCode) {
      setStage(2)
      setError('')
    } else {
      setError('Incorrect code. Try again! 💔')
    }
  }

  const handleNoHover = () => {
    const randomX = Math.random() * 300 - 150
    const randomY = Math.random() * 300 - 150
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  const handleYes = () => {
    setStage(3)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('hour', hour)
    formData.append('address', address)
    
    await submitDateDetails(formData)
    setIsSubmitting(false)
    setStage(4)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-100 via-purple-100 to-red-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        
        {/* Stage 1: Secret Code */}
        {stage === 1 && (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">🔒❤️</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Unlock Your Valentine
            </h1>
            <p className="text-gray-600">
              Enter the secret code to reveal something special...
            </p>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter secret code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="text-center text-lg"
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                Unlock 💖
              </Button>
            </form>
          </div>
        )}

        {/* Stage 2: Question */}
        {stage === 2 && (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">💝</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hello, {personName}! 💕
            </h1>
            <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
              <p className="text-lg italic text-gray-700">
                &ldquo;In all the world, there is no heart for me like yours. 
                In all the world, there is no love for you like mine.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2">- Maya Angelou</p>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 pt-4">
              Will you be my Valentine? 💖
            </h2>
            <div className="flex flex-col items-center gap-4 py-8">
              <Button 
                onClick={handleYes}
                className="bg-green-500 hover:bg-green-600 px-8 py-6 text-lg z-10"
              >
                Yes! 💚
              </Button>
              <div className="relative h-20 w-48 flex items-center justify-center">
                <Button 
                  onMouseEnter={handleNoHover}
                  className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg transition-all duration-300 ease-out absolute"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                  }}
                >
                  No 💔
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Date Details Form */}
        {stage === 3 && (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">🌹✨</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Yay! I&apos;m so excited! 🎉
            </h1>
            <p className="text-gray-600">
              Let me know when and where to pick you up...
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-left space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  What time should I pick you up?
                </label>
                <Input
                  type="time"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>
              <div className="text-left space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Where should I pick you up?
                </label>
                <Input
                  type="text"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-pink-500 hover:bg-pink-600 py-6 text-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Confirm Date 💖'}
              </Button>
            </form>
          </div>
        )}

        {/* Stage 4: Final Message */}
        {stage === 4 && (
          <div className="text-center space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-center mb-6">
              <div className="text-8xl">🎊💑🎊</div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Can&apos;t Wait! 🥰
            </h1>
            <div className="bg-linear-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
              <p className="text-lg italic text-gray-700">
                &ldquo;The best thing to hold onto in life is each other.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2">- Audrey Hepburn</p>
            </div>
            <p className="text-gray-700 text-lg">
              I&apos;m counting down the moments until our date! 
              This is going to be amazing! 💕✨
            </p>
            <div className="pt-4 text-6xl">
              💖🌹🎈
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}
