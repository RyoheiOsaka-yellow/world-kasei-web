import React from 'react';
import { ShieldAlert, ScanLine, Microscope, Hammer, Droplets, Thermometer, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Technology: React.FC = () => {
  return (
    <div className="font-sans bg-[#F4F7F9] min-h-screen">
      <div className="bg-[#003366] pt-32 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Technology & Quality</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            「先進のAI技術」と「実直なモノづくり」。<br/>
            WINTECが世界で選ばれる2つのコア・コンピタンス。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Section 1: AI Loss Prevention */}
        <section>
            <div className="flex flex-col md:flex-row items-start gap-12">
                <div className="md:w-1/2 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#007BFF] rounded-full text-sm font-bold">
                        <ShieldAlert size={16}/> AI Security
                    </div>
                    <h2 className="text-3xl font-bold text-[#003366]">AI Loss Prevention System</h2>
                    <h3 className="text-xl text-slate-600 font-medium">不正を「見逃さない」技術が、利益を守る。</h3>
                    <p className="text-slate-600 leading-loose">
                        従来のセルフレジにおける最大の課題は、故意・過失による「スキャン漏れ」や「不正登録」でした。
                        WINTECのSelfPOSは、上部カメラの映像解析と、セキュリティスケールの重量検知をAIがリアルタイムで照合。
                        異常な動作パターンを即座に検知します。
                    </p>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                        <h4 className="font-bold text-[#003366] border-b pb-2 mb-2">検知可能な不正パターンの例</h4>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">01.</span>
                                <span><strong className="block">スキャン回避 (Scan Avoidance)</strong>商品をスキャナーに通さず、直接袋詰めエリアに置く動作。</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">02.</span>
                                <span><strong className="block">バーコード偽装 (Ticket Switching)</strong>安価な商品のバーコードを手で隠し持ち、高価な商品に貼り付けてスキャンする動作。</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold">03.</span>
                                <span><strong className="block">かご抜け (Basket Leaving)</strong>清算済みエリアを通らずに、未精算の商品を持ったまま立ち去ろうとする動作。</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="md:w-1/2">
                    {/* Abstract Visualization of AI Analysis */}
                    <div className="bg-[#002244] rounded-2xl p-8 text-white relative overflow-hidden min-h-[500px] flex flex-col justify-center shadow-2xl">
                         {/* Grid Overlay Effect */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,123,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,123,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                         
                         <div className="relative z-10 text-center space-y-8">
                             <ScanLine size={64} className="mx-auto text-[#007BFF] animate-pulse"/>
                             <div className="space-y-2">
                                 <div className="text-xs text-[#007BFF] uppercase tracking-widest">Target Detected</div>
                                 <div className="text-2xl font-mono font-bold">Item: Apple (Red)</div>
                                 <div className="text-sm text-slate-400 font-mono">Confidence: 98.4%</div>
                             </div>
                             
                             <div className="border border-[#007BFF]/30 bg-[#007BFF]/10 p-4 rounded text-left font-mono text-xs space-y-1">
                                 <div>[LOG] Action: Lift Up</div>
                                 <div>[LOG] Action: Scan Attempt... <span className="text-green-400">SUCCESS</span></div>
                                 <div>[LOG] Action: Place in Bagging Area</div>
                                 <div>[LOG] Weight Check: +250g (Matched)</div>
                             </div>
                         </div>
                    </div>
                    <p className="text-xs text-center mt-4 text-slate-500">※ AI解析イメージ図</p>
                </div>
            </div>
        </section>

        {/* Section 2: Quality Assurance */}
        <section>
             <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-[#007BFF] rounded-full text-sm font-bold mb-4">
                        <Microscope size={16}/> Quality Assurance
                 </div>
                 <h2 className="text-3xl font-bold text-[#003366] mb-4">Quality Beyond Standard</h2>
                 <p className="text-slate-600 max-w-2xl mx-auto">
                     WINTECの製品は、一般的な家電製品の基準を遥かに超える<br/>
                     過酷な耐久テストをクリアしています。
                 </p>
             </div>

             <div className="grid md:grid-cols-3 gap-8">
                 {/* Test 1 */}
                 <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                     <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                         <Hammer size={32}/>
                     </div>
                     <h3 className="text-lg font-bold text-[#003366] mb-2">落下・衝撃テスト</h3>
                     <p className="text-sm text-slate-600 leading-relaxed mb-4">
                         梱包状態での1m落下テストに加え、動作中の振動テストを実施。輸送中や設置時の衝撃に耐える堅牢性を証明。
                     </p>
                     <div className="text-xs font-bold text-[#007BFF] bg-blue-50 py-1 px-2 rounded inline-block">Ref: ISTA 2A Standard</div>
                 </div>

                 {/* Test 2 */}
                 <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                     <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                         <Droplets size={32}/>
                     </div>
                     <h3 className="text-lg font-bold text-[#003366] mb-2">塩水噴霧テスト</h3>
                     <p className="text-sm text-slate-600 leading-relaxed mb-4">
                         沿岸部や厨房などの過酷な環境を想定し、塩水を噴霧し続ける腐食耐性テストをクリア。錆びにくい部品選定を徹底。
                     </p>
                     <div className="text-xs font-bold text-[#007BFF] bg-blue-50 py-1 px-2 rounded inline-block">Ref: IEC 60068-2-11</div>
                 </div>

                 {/* Test 3 */}
                 <div className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                     <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                         <Thermometer size={32}/>
                     </div>
                     <h3 className="text-lg font-bold text-[#003366] mb-2">温湿度サイクルテスト</h3>
                     <p className="text-sm text-slate-600 leading-relaxed mb-4">
                         -20℃から60℃までの急激な温度変化と、高湿度環境での連続動作テストを実施。あらゆる気候での安定稼働を保証。
                     </p>
                     <div className="text-xs font-bold text-[#007BFF] bg-blue-50 py-1 px-2 rounded inline-block">Ref: IEC 60068-2-30</div>
                 </div>
             </div>
        </section>

        <div className="text-center pt-10">
          <Link to="/support" className="inline-flex items-center gap-2 text-[#007BFF] font-bold text-lg hover:underline">
            サポート体制について詳しく見る <ChevronRight size={20}/>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Technology;