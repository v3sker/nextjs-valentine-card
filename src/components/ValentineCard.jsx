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
      setError('Неверный код. Попробуйте снова! 💔')
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
              Разблокируй свою валентинку
            </h1>
            <p className="text-gray-600">
              Введи секретный код, чтобы открыть что-то особенное...
            </p>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Секретный код..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="text-center text-lg"
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                Разблокировать 💖
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
              Привет, {personName}! 💕
            </h1>
            <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
              <p className="text-lg italic text-gray-700">
                &ldquo;Во всём мире нет для меня сердца, подобного твоему. 
                Во всём мире нет для тебя любви, подобной моей.&rdquo;
              </p>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 pt-4">
              Будешь моей валентинкой? 💖
            </h2>
            <div className="flex flex-col items-center gap-4 py-8">
              <Button 
                onClick={handleYes}
                className="bg-green-500 hover:bg-green-600 px-8 py-6 text-lg z-10"
              >
                Да! 💚
              </Button>
              <div className="relative h-20 w-48 flex items-center justify-center">
                <Button 
                  onMouseEnter={handleNoHover}
                  className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg transition-all duration-300 ease-out absolute"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                  }}
                >
                  Нет 💔
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
              Ура!! 🎉
            </h1>
            <p className="text-gray-600">
              Скажи мне, когда и где тебя забрать...
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-left space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  В какое время мне тебя забрать?
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
                  Откуда тебя забрать?
                </label>
                <Input
                  type="text"
                  placeholder="Твой адрес"
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
                {isSubmitting ? 'Отправка...' : 'Подтвердить свидание 💖'}
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
              Не могу дождаться! 🥰
            </h1>
            <div className="bg-linear-to-r from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
              <p className="text-lg italic text-gray-700">
                &ldquo;Лучшее, за что можно держаться в жизни - это друг друга.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2">- Одри Хепбёрн</p>
            </div>
            <p className="text-gray-700 text-lg">
              Я считаю минуты до нашего свидания! 
              Это будет потрясающе! 💕✨
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
