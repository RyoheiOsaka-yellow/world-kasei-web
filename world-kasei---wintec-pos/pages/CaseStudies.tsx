import React from 'react';
import { ShoppingCart, Coffee, Shirt, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudies: React.FC = () => {
  return (
    <div className="font-sans bg-[#F4F7F9] min-h-screen">
       <div className="bg-[#003366] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244] to-[#003366]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Case Studies</h1>
          <p className="text-slate-300 text-lg">世界70カ国以上で選ばれている実績が、安心の証です。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Global Partners Logo Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-12 mb-20">
          <h2 className="text-xl font-bold text-[#003366] mb-10 text-center uppercase tracking-widest">Trusted Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
             {/* Text placeholders for logos based on prompt */}
             {['Carrefour', 'Walmart', 'Tesco', 'ZARA', 'H&M', 'Sephora', 'Burger King', 'KFC', 'Subway', 'Pizza Hut', 'Auchan', 'Metro'].map((brand) => (
               <div key={brand} className="w-full aspect-[3/1] flex items-center justify-center font-bold text-slate-500 text-xl hover:text-[#003366] transition-colors cursor-default">
                 {brand}
               </div>
             ))}
          </div>
        </div>

        {/* Use Cases by Industry */}
        <div className="flex items-center gap-4 mb-10">
             <div className="h-px bg-slate-300 flex-grow"></div>
             <h2 className="text-2xl font-bold text-[#003366] uppercase tracking-widest">Solutions by Industry</h2>
             <div className="h-px bg-slate-300 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-20">
          
          {/* Retail */}
          <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300 border-t-4 border-[#007BFF] flex flex-col">
            <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-8">
              <ShoppingCart className="text-[#007BFF]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#003366]">Supermarket & CVS</h3>
            <p className="text-slate-600 mb-8 text-sm leading-loose flex-grow">
              SelfPOSとScalePOSの組み合わせにより、有人レジの混雑を緩和。
              AI自動認識スケールにより、青果物の計量販売にかかる時間を大幅に短縮し、
              パート・アルバイトの教育コストも削減しました。
            </p>
            <div className="pt-6 border-t border-slate-100">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Products</span>
               <div className="text-[#007BFF] text-sm font-bold">SelfPOS 60, ScalePOS</div>
            </div>
          </div>

          {/* Food & Beverage */}
          <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300 border-t-4 border-[#F5A623] flex flex-col">
            <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center mb-8">
              <Coffee className="text-[#F5A623]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#003366]">Restaurant & Cafe</h3>
            <p className="text-slate-600 mb-8 text-sm leading-loose flex-grow">
              キオスク端末（SelfPOS Mini）の導入で、オーダー待ち行列を解消。
              防水・防塵性能の高いAnyPOSをキッチンディスプレイ(KDS)として活用し、
              オーダーミスをゼロに。
            </p>
            <div className="pt-6 border-t border-slate-100">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Products</span>
               <div className="text-[#007BFF] text-sm font-bold">AnyPOS 100, SelfPOS Mini</div>
            </div>
          </div>

           {/* Fashion / Specialty */}
           <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-xl transition-all duration-300 border-t-4 border-[#003366] flex flex-col">
            <div className="bg-slate-100 w-14 h-14 rounded-lg flex items-center justify-center mb-8">
              <Shirt className="text-[#003366]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-[#003366]">Apparel & Specialty</h3>
            <p className="text-slate-600 mb-8 text-sm leading-loose flex-grow">
              デザイン性の高いAnyPOSがブランドの世界観にマッチ。
              周辺機器を一元管理し、カウンター周りをスッキリさせることで、
              洗練された店舗空間を演出しています。
            </p>
            <div className="pt-6 border-t border-slate-100">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Products</span>
               <div className="text-[#007BFF] text-sm font-bold">AnyPOS 200 (White Model)</div>
            </div>
          </div>

        </div>

        {/* CTA Box */}
        <div className="bg-[#003366] rounded-2xl p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="mb-8 md:mb-0 md:pr-10 relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-white">御社に最適な構成をご提案します</h3>
            <p className="text-blue-200 text-lg font-light">業種・規模・課題に合わせて、ハードウェアの選定から設置プランまでオーダーメイドで。</p>
          </div>
          <Link to="/support" className="flex-shrink-0 bg-[#F5A623] text-white px-10 py-4 rounded-full font-bold hover:bg-[#E09612] transition-all transform hover:-translate-y-1 flex items-center shadow-lg relative z-10">
            お問い合わせはこちら <ArrowRight className="ml-2 w-5 h-5"/>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CaseStudies;