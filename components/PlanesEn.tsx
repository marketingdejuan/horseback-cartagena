import React from 'react';

export default function PricingSectionEn() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Perfect Experience
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Swipe to see our plans, from weekend getaways to full VIP adventures.
          </p>
        </div>

        {/* Carrusel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          
          {/* 1. Group Ride */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Ride</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">Perfect for the weekend. Join a group and enjoy nature.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">$100.000</span>
              <span className="text-gray-500 font-medium"> COP/person</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Weekends only at 2:00 PM
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                No extra guide fee
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition">
              Book Group Ride
            </button>
          </div>

          {/* 2. Private Ride */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col relative">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Private Ride</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">Go at your own pace. Exclusive for you and your friends.</p>
            <div className="mb-2">
              <span className="text-4xl font-extrabold text-gray-900">$100.000</span>
              <span className="text-gray-500 font-medium"> COP/person</span>
            </div>
            <div className="bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1 rounded-md mb-6 w-max">
              + $80.000 COP Guide (Per group)
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Flexible schedule
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Exclusive guide for your group
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Personalized attention
              </li>
            </ul>
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              Book Private Ride
            </button>
          </div>

          {/* 3. Celebration Plan */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500 flex flex-col relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Celebration Plan</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">Ideal for birthdays and anniversaries. Ready to surprise.</p>
            <div className="mb-6">
              <span className="text-gray-500 font-medium">Private Base +</span>
              <br/>
              <span className="text-3xl font-bold text-gray-900">$30.000</span>
              <span className="text-gray-500 font-medium"> COP/lunch</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-600 flex-grow">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                Everything in the Private Ride
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                Special lunch included
              </li>
              <li className="flex items-start font-medium text-gray-900">
                <span className="text-orange-500 mr-2">✓</span>
                Decor: $50.000 COP (FREE for {'>'} 6 people)
              </li>
            </ul>
            <button className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition">
              Book Celebration
            </button>
          </div>

          {/* 4. VIP Adventure */}
          <div className="snap-center shrink-0 w-[85vw] sm:w-[320px] bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700 flex flex-col relative text-white">
            <h3 className="text-xl font-semibold mb-2">VIP Adventure</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">The ultimate stress-free experience. We take care of everything.</p>
            <div className="mb-6">
              <span className="text-gray-400 font-medium">Celebration Base +</span>
              <br/>
              <span className="text-3xl font-bold text-white">$130.000</span>
              <span className="text-gray-400 font-medium"> COP/transport</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-300 flex-grow">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                Private Ride + Lunch
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                Round-trip VIP Transportation
              </li>
              <li className="flex items-start text-xs text-gray-400">
                <span className="mr-2">ℹ</span>
                Metro Area Coverage (Up to Laureles)
              </li>
            </ul>
            <button className="w-full bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition">
              Book VIP Adventure
            </button>
          </div>

        </div>

        {/* Add-ons */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Upgrade Your Experience (Add-ons)</h3>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 snap-x snap-mandatory gap-6 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            
            {/* ATV Tour */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🏍️</span>
              <h4 className="font-bold text-gray-900 text-center">ATV Tour</h4>
              <p className="text-sm text-gray-500 text-center mb-3">1.5 hours of pure adrenaline</p>
              <div className="text-center mt-auto">
                <span className="font-bold text-xl text-gray-900">$250.000</span> <span className="text-sm text-gray-500"> COP/person</span>
                <br/>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded mt-2 inline-block">+ $50.000 COP passenger</span>
              </div>
            </div>

            {/* Hat */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🤠</span>
              <h4 className="font-bold text-gray-900 text-center">Traditional Hat</h4>
              <p className="text-sm text-gray-500 text-center mb-3">Protect yourself from the sun</p>
              <span className="font-bold text-xl text-gray-900 mt-auto">$30.000 COP</span>
            </div>

            {/* Poncho */}
            <div className="snap-center shrink-0 w-[75vw] md:w-auto flex flex-col items-center p-6 border border-gray-100 rounded-xl bg-gray-50">
              <span className="text-4xl mb-3">🧣</span>
              <h4 className="font-bold text-gray-900 text-center">Colombian Poncho</h4>
              <p className="text-sm text-gray-500 text-center mb-3">Take home the best souvenir photo</p>
              <span className="font-bold text-xl text-gray-900 mt-auto">$30.000 COP</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}