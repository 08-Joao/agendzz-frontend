'use client'
import { Calendar, Clock, Users, TrendingUp, TrendingDown, ArrowRight, MapPin } from 'lucide-react';
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switcher";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl space-y-6">
        
        {/* Header Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">👋</span>
                <h1 className="text-2xl text-black font-bold">Bem-vindo de volta!</h1>
              </div>
              <p className="text-black mb-6 max-w-md">
                Você tem X agendamentos hoje.
              </p>
              <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                Ver agenda
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute right-6 top-6">
              <div className="w-32 h-32 bg-green-500 rounded-2xl flex items-center justify-center transform rotate-12">
                <Calendar size={48} className="text-white" />
              </div>
            </div>
            <div className="absolute right-12 bottom-6">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Clock size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
