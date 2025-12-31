import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [units, setUnits] = useState(10);
  const [years, setYears] = useState(5);

  // Cost Assumptions (Unit: JPY)
  const COSTS = {
    companyA: {
      initial: 500000,
      monthly: 15000,
      name: "A社（大手メーカー）",
      desc: "初期費用・保守共に高額"
    },
    companyB: {
      initial: 150000,
      monthly: 5000,
      name: "B社（格安海外製）",
      desc: "3年で買替リスクあり"
    },
    wintec: {
      initial: 320000,
      monthly: 9000,
      name: "WINTEC",
      desc: "高品質 × 国内適正保守"
    }
  };

  const calculateTotal = (type: 'companyA' | 'companyB' | 'wintec') => {
    let hardwareCost = COSTS[type].initial * units;
    let maintenanceCost = COSTS[type].monthly * 12 * years * units;

    // Company B needs replacement if years > 3
    if (type === 'companyB' && years > 3) {
      hardwareCost *= 2; // Simple assumption: buy twice
    }

    return hardwareCost + maintenanceCost;
  };

  const totalA = calculateTotal('companyA');
  const totalB = calculateTotal('companyB');
  const totalW = calculateTotal('wintec');

  const savingsVsA = totalA - totalW;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-[#003366] p-6 text-white flex items-center gap-3">
        <Calculator className="w-6 h-6 text-[#F5A623]" />
        <h3 className="text-xl font-bold">導入コスト・シミュレーター</h3>
      </div>
      
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">導入台数 (台)</label>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={units} 
              onChange={(e) => setUnits(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#007BFF]"
            />
            <div className="text-right font-bold text-2xl text-[#003366] mt-2">{units} 台</div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">想定利用年数 (年)</label>
            <select 
              value={years} 
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full p-3 border border-slate-300 rounded-lg font-bold text-slate-700 focus:ring-2 focus:ring-[#007BFF] outline-none"
            >
              <option value="3">3年</option>
              <option value="5">5年 (推奨)</option>
              <option value="7">7年</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {/* Company A Bar */}
          <div className="relative pt-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-slate-500">{COSTS.companyA.name}</span>
              <span className="font-bold text-slate-500">¥{(totalA / 10000).toLocaleString()}万円</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
              <div className="bg-slate-400 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Company B Bar */}
          <div className="relative pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-slate-500 flex items-center gap-1">
                {COSTS.companyB.name}
                {years > 3 && <AlertTriangle size={12} className="text-red-500" />}
              </span>
              <span className="font-bold text-slate-500">¥{(totalB / 10000).toLocaleString()}万円</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-slate-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(totalB / totalA) * 100}%` }}
              ></div>
            </div>
            {years > 3 && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertTriangle size={10} className="mr-1"/> 耐久性不足により買替コスト発生</p>}
          </div>

          {/* WINTEC Bar */}
          <div className="relative pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-bold text-[#003366] flex items-center gap-1">
                {COSTS.wintec.name} <CheckCircle size={14} className="text-[#007BFF]"/>
              </span>
              <span className="font-bold text-[#003366] text-lg">¥{(totalW / 10000).toLocaleString()}万円</span>
            </div>
            <div className="w-full bg-blue-50 rounded-full h-6 overflow-hidden shadow-inner border border-blue-100">
              <div 
                className="bg-gradient-to-r from-[#003366] to-[#007BFF] h-full rounded-full transition-all duration-500 relative" 
                style={{ width: `${(totalW / totalA) * 100}%` }}
              >
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#F0F7FF] p-6 rounded-xl border border-[#007BFF]/20 flex items-start gap-4 animate-fade-in-up">
           <div className="p-3 bg-white rounded-full shadow-sm text-[#007BFF]">
             <TrendingDown size={24} />
           </div>
           <div>
             <h4 className="font-bold text-[#003366] text-lg mb-1">
               {years}年間で約 <span className="text-3xl text-[#007BFF] font-extrabold">{(savingsVsA / 10000).toLocaleString()}</span> 万円のコスト削減
             </h4>
             <p className="text-sm text-slate-600 leading-relaxed">
               大手メーカー製（A社）と比較した場合の試算です。<br/>
               WINTECなら、高品質なハードウェアと適正価格の保守で、長期的なTCO（総保有コスト）を最適化できます。
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;