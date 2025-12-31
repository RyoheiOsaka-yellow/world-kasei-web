import React from 'react';
import { ShoppingCart, Coffee, Shirt, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Solutions: React.FC = () => {
  return (
    <div className="font-sans bg-[#F4F7F9] min-h-screen">
       <div className="bg-[#003366] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244] to-[#003366]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Industry Solutions</h1>
          <p className="text-slate-300 text-lg">お客様の業種・業態に合わせた最適なソリューションをご提案します。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">

        {/* Supermarket */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-gray-100 relative min-h-[300px]">
                <img src="https://placehold.co/800x600/e2e8f0/003366?text=Supermarket+Solution" alt="Supermarket Solution" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-14">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg text-[#007BFF]">
                        <ShoppingCart size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#003366]">Supermarket & Mass Retail</h2>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-4">「レジ待ち解消」と「ロス削減」の両立</h3>
                <p className="text-slate-600 leading-loose mb-8">
                    人手不足によるレジ稼働率の低下と、セルフレジ導入による万引きリスク。この相反する課題を、WINTECのAIソリューションが解決します。
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#007BFF] mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">AI Loss Prevention</span>
                            <span className="text-sm text-slate-500">SelfPOSのカメラが不審な動きを検知し、スタッフへ即座に通知。</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#007BFF] mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">ScalePOSによる青果認識</span>
                            <span className="text-sm text-slate-500">量り売りの商品コード入力ミスをゼロに。レジ通過速度を30%向上。</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Recommended Products</span>
                    <div className="text-[#003366] font-bold">SelfPOS 60, ScalePOS, AnyPOS 200</div>
                </div>
            </div>
        </section>

        {/* Restaurant */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row-reverse">
            <div className="lg:w-1/2 bg-gray-100 relative min-h-[300px]">
                <img src="https://placehold.co/800x600/fff7ed/ea580c?text=Restaurant+Solution" alt="Restaurant Solution" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-14">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-50 rounded-lg text-[#F5A623]">
                        <Coffee size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#003366]">Restaurant & Cafe</h2>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-4">過酷なキッチン環境でも止まらない耐久性</h3>
                <p className="text-slate-600 leading-loose mb-8">
                    油煙、水しぶき、高温。飲食店のキッチンは精密機器にとって過酷です。IP65準拠の防水・防塵性能を持つAnyPOSなら、故障リスクを最小限に抑えられます。
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#F5A623] mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">IP65 Waterproof & Dustproof</span>
                            <span className="text-sm text-slate-500">画面に水がかかっても誤作動せず、濡れた手でも操作可能。</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#F5A623] mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">Fanless Design</span>
                            <span className="text-sm text-slate-500">ファンがないため、油や埃を吸い込まず、内部故障を防ぎます。</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Recommended Products</span>
                    <div className="text-[#003366] font-bold">AnyPOS 100 (Kitchen), SelfPOS Mini (Kiosk)</div>
                </div>
            </div>
        </section>

        {/* Specialty */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-gray-100 relative min-h-[300px]">
                <img src="https://placehold.co/800x600/f3e8ff/7c3aed?text=Specialty+Store+Solution" alt="Specialty Store Solution" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 p-10 lg:p-14">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                        <Shirt size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#003366]">Apparel & Specialty</h2>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-4">ブランドの世界観を損なわないデザイン</h3>
                <p className="text-slate-600 leading-loose mb-8">
                    洗練された店舗空間に、無骨なPOSは似合いません。AnyPOSのスタイリッシュなホワイトモデルと、配線を隠すケーブルマネジメントが、美しいカウンターを実現します。
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-purple-600 mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">Stylish Design</span>
                            <span className="text-sm text-slate-500">グッドデザイン賞を意識した、ノイズのないミニマルな筐体。</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-purple-600 mt-1 flex-shrink-0" size={20}/>
                        <div>
                            <span className="font-bold text-slate-700 block">Cable Management</span>
                            <span className="text-sm text-slate-500">周辺機器のケーブルをスタンド内に収納し、カウンターをすっきりと。</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Recommended Products</span>
                    <div className="text-[#003366] font-bold">AnyPOS 200 (White Model)</div>
                </div>
            </div>
        </section>

        {/* CTA Box */}
        <div className="bg-[#003366] rounded-2xl p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          <div className="mb-8 md:mb-0 md:pr-10 relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-white">具体的な導入シミュレーションを作成します</h3>
            <p className="text-blue-200 text-lg font-light">お客様の店舗図面や運用フローに合わせて、最適な配置と構成をご提案します。</p>
          </div>
          <Link to="/support" className="flex-shrink-0 bg-[#F5A623] text-white px-10 py-4 rounded-full font-bold hover:bg-[#E09612] transition-all transform hover:-translate-y-1 flex items-center shadow-lg relative z-10">
            お問い合わせ・相談 <ArrowRight className="ml-2 w-5 h-5"/>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Solutions;