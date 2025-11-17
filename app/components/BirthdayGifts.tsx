'use client';

import { Gift, DollarSign } from "lucide-react";
import PaymentButton from "./PaymentButton";

// Interfaz para los regalos
interface GiftItem {
  id: number;
  emoji: string;
  name: string;
  price: number;
}

export default function BirthdayGifts() {
  // Datos de los regalos
  const gifts: GiftItem[] = [
    { id: 1, emoji: '🌹', name: 'Rosa', price: 2 },
    { id: 2, emoji: '💐', name: 'Flores', price: 5 },
    { id: 3, emoji: '☕', name: 'Café', price: 10 },
    { id: 4, emoji: '🎂', name: 'Pastel', price: 25 },
    { id: 5, emoji: '👑', name: 'Corona', price: 50 },
    { id: 6, emoji: '🦁', name: 'León', price: 100 },
    { id: 7, emoji: '🚀', name: 'Cohete', price: 250 },
    { id: 8, emoji: '🛥️', name: 'Yate', price: 500 },
    { id: 9, emoji: '💎', name: 'Diamante', price: 1000 },
    { id: 10, emoji: '🌌', name: 'Universo', price: 5000 },
  ];

  // Función para manejar el clic en "Regalar"
  const handleGiftClick = (gift: GiftItem) => {
    console.log(`Regalando: ${gift.name} por $${gift.price}`);
    // Aquí puedes agregar la lógica para procesar el regalo
  };

  return (
    <div className="min-h-screen bg-animated">
 
      <div className="min-h-screen">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="glass-header rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl mb-4 float-animation border border-white/30">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              ¡Yorch Cumple Años Hoy!
            </h1>
            <p className="text-xl sm:text-2xl text-white/95 font-medium drop-shadow">
              Elige el regalo perfecto para celebrar este día especial
            </p>
            <div className="flex items-center justify-center gap-2 text-white/90 glass px-4 py-2 rounded-full">
              <Gift className="w-5 h-5" />
              <span className="text-base">{gifts.length} regalos increíbles que puedes regalarle</span>
            </div>
          </div>
        </div>

        {/* Grid de Regalos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/25"
              >
                <div className="p-6 text-center space-y-4">
                  <div className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-lg">
                    {gift.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight drop-shadow">
                    {gift.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4 text-white/90" />
                    <span className="text-2xl font-bold text-white drop-shadow">
                      {gift.price}
                    </span>
                  </div>

                  <PaymentButton
                  amount={gift.price}
                  products={[gift]}
                  buttonText="Regalar"
                  />

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}