import React from 'react';
import { Check, Info, Cpu, Monitor, Wifi, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  return (
    <div className="font-sans bg-[#F4F7F9] min-h-screen">
      
      {/* Header */}
      <div className="bg-[#003366] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Products & Solutions</h1>
          <p className="text-blue-200 text-lg max-w-2xl">WINTECの技術と信頼性を支える製品スペックと機能詳細。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        
        {/* Section 1: Detailed Specs */}
        <section>
          <div className="flex items-center gap-4 mb-10">
             <div className="h-px bg-slate-300 flex-grow"></div>
             <h2 className="text-2xl font-bold text-[#003366] uppercase tracking-widest">Specifications</h2>
             <div className="h-px bg-slate-300 flex-grow"></div>
          </div>
          
          <div className="space-y-16">
            {/* Product Item: AnyPOS */}
            <div className="bg-white rounded-xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row border border-slate-100 group hover:border-[#007BFF]/30 transition-all duration-300">
              <div className="lg:w-2/5 bg-gray-50 p-10 flex items-center justify-center relative">
                <div className="absolute top-4 left-4 bg-[#003366] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Flagship</div>
                <img src="https://placehold.co/600x600/f8fafc/003366?text=AnyPOS+200" alt="AnyPOS 200" className="max-w-full h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="lg:w-3/5 p-10 lg:p-12">
                <h3 className="text-3xl font-bold text-[#003366] mb-4">AnyPOS Series</h3>
                <p className="text-slate-600 mb-8 leading-loose">
                  高性能CPUと豊富なインターフェースを搭載したオールインワンPOS。<br/>
                  ファンレス設計により静音性と高耐久性を実現。メンテナンスが容易なモジュラー構造を採用しています。
                </p>
                
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  <div className="flex items-start gap-4 p-3 rounded hover:bg-slate-50 transition-colors">
                    <Cpu className="w-6 h-6 text-[#007BFF] mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">CPU</span>
                      <span className="text-slate-800 font-medium">Intel Core i3 / i5 / J1900 / J6412</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded hover:bg-slate-50 transition-colors">
                    <Monitor className="w-6 h-6 text-[#007BFF] mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Display</span>
                      <span className="text-slate-800 font-medium">15" / 15.6" / 21.5" PCAP Touch</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded hover:bg-slate-50 transition-colors">
                    <Wifi className="w-6 h-6 text-[#007BFF] mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Connectivity</span>
                      <span className="text-slate-800 font-medium">WiFi, BT, Ethernet, 4G (Option)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded hover:bg-slate-50 transition-colors">
                    <Info className="w-6 h-6 text-[#007BFF] mt-1" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">OS Support</span>
                      <span className="text-slate-800 font-medium">Windows IoT, Linux, Android</span>
                    </div>
                  </div>
                </div>
                
                <button className="text-[#007BFF] font-bold text-sm flex items-center hover:underline">
                  <Download size={16} className="mr-2"/> 詳細スペックシートをダウンロード
                </button>
              </div>
            </div>

            {/* Product Item: SelfPOS */}
            <div className="bg-white rounded-xl shadow-[0_5px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row border border-slate-100 group hover:border-[#007BFF]/30 transition-all duration-300">
              <div className="lg:w-2/5 bg-gray-50 p-10 flex items-center justify-center relative">
                 <div className="absolute top-4 left-4 bg-[#007BFF] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">AI Powered</div>
                 <img src="https://placehold.co/600x600/f8fafc/003366?text=SelfPOS+60" alt="SelfPOS 60" className="max-w-full h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="lg:w-3/5 p-10 lg:p-12">
                <h3 className="text-3xl font-bold text-[#003366] mb-4">SelfPOS Series</h3>
                <p className="text-slate-600 mb-8 leading-loose">
                  AIカメラとセキュリティスケールを統合したセルフレジソリューション。
                  直感的なUIで顧客体験を向上させながら、店舗の損失を防ぎます。
                </p>

                <div className="bg-[#F0F7FF] p-6 rounded-lg mb-8 border border-[#007BFF]/10">
                  <h4 className="font-bold text-[#003366] mb-3 flex items-center gap-2">
                    <Info size={18} className="text-[#007BFF]"/> AI Loss Prevention System
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    カメラ映像と商品登録動作をAIが分析。スキャン漏れや誤った商品登録（例：高額商品を安価な商品として登録）をリアルタイムで検知し、スタッフへアラートを通知します。
                  </p>
                </div>

                <ul className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <li className="flex items-center"><Check size={16} className="text-[#007BFF] mr-2"/> 顔認証決済対応</li>
                  <li className="flex items-center"><Check size={16} className="text-[#007BFF] mr-2"/> マルチ決済端末マウント</li>
                  <li className="flex items-center"><Check size={16} className="text-[#007BFF] mr-2"/> 警告ライト搭載</li>
                  <li className="flex items-center"><Check size={16} className="text-[#007BFF] mr-2"/> レシート/クーポン自動発行</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Quality & Durability */}
        <section className="bg-white p-10 lg:p-16 rounded-2xl shadow-lg border border-slate-100">
           <div className="text-center mb-12">
             <h2 className="text-2xl font-bold text-[#003366] mb-4">Quality Assurance</h2>
             <p className="text-slate-500">過酷な環境でも稼働する、徹底した耐久テスト</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-12">
             <div className="text-center group">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-[#007BFF] transition-colors duration-300">
                 <span className="text-3xl">💧</span>
               </div>
               <h3 className="font-bold mb-3 text-[#003366]">防水・防塵テスト</h3>
               <p className="text-sm text-slate-600 leading-relaxed">IP規格に準拠。飲食店のキッチンなど過酷な環境でも安定稼働を保証。</p>
             </div>
             <div className="text-center group">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-[#007BFF] transition-colors duration-300">
                 <span className="text-3xl">🌡️</span>
               </div>
               <h3 className="font-bold mb-3 text-[#003366]">温度・湿度テスト</h3>
               <p className="text-sm text-slate-600 leading-relaxed">高温多湿から極寒環境まで、幅広い動作温度範囲を保証するためのチャンバーテスト。</p>
             </div>
             <div className="text-center group">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-[#007BFF] transition-colors duration-300">
                 <span className="text-3xl">🔨</span>
               </div>
               <h3 className="font-bold mb-3 text-[#003366]">振動・落下テスト</h3>
               <p className="text-sm text-slate-600 leading-relaxed">輸送中や設置時の衝撃を想定した落下テスト、振動テストにより堅牢性を証明。</p>
             </div>
           </div>
        </section>

        <div className="text-center pt-10">
          <Link to="/support" className="inline-block px-10 py-4 bg-[#003366] text-white rounded shadow-lg font-bold hover:bg-[#002244] transition-all transform hover:-translate-y-1">
            詳しい資料・カタログ請求
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Products;