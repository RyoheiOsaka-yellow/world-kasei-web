import React from 'react';
import { ClipboardList, Truck, Settings, Headphones, Phone, ChevronRight } from 'lucide-react';

const Support: React.FC = () => {
  return (
    <div className="font-sans bg-white min-h-screen">
      <div className="bg-[#F4F7F9] pt-32 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-[#003366]">サポート・会社概要</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-loose">
            ワールド化成株式会社が、日本国内の窓口として<br/>
            導入から保守まで万全のサポート体制を提供します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Support Flow */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-[#003366] mb-12 text-center">導入までの流れ</h2>
          <div className="relative">
            {/* Line connector */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "ヒアリング", desc: "課題・設置環境の確認" },
                { step: "02", title: "デモ機貸出", desc: "動作・互換性検証" },
                { step: "03", title: "設置・導入", desc: "キッティング・納品" },
                { step: "04", title: "運用・保守", desc: "アフターサポート" }
              ].map((item) => (
                <div key={item.step} className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center group hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-20 h-20 bg-[#003366] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-md group-hover:bg-[#007BFF] transition-colors">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#003366]">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Maintenance / Assurance */}
        <div className="bg-[#003366] rounded-2xl p-10 md:p-12 mb-24 flex flex-col md:flex-row items-center gap-10 shadow-2xl text-white">
           <div className="flex-1">
             <h3 className="text-2xl font-bold mb-6">国内拠点があるから、安心。</h3>
             <p className="text-blue-100 leading-loose mb-6 font-light">
               海外製ハードウェア導入の最大の不安は「サポート」です。
               ワールド化成は日本国内に拠点を持ち、時差や言語の壁なく、
               迅速なメンテナンス対応と技術サポートを提供します。
               予備パーツの国内在庫運用も行っています。
             </p>
           </div>
           <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 grid grid-cols-2 gap-6 w-full md:w-auto">
              <div className="text-center">
                 <Settings className="w-8 h-8 text-[#007BFF] mx-auto mb-3"/>
                 <span className="text-xs font-bold text-white tracking-wider">国内キッティング</span>
              </div>
              <div className="text-center">
                 <Headphones className="w-8 h-8 text-[#007BFF] mx-auto mb-3"/>
                 <span className="text-xs font-bold text-white tracking-wider">日本語サポート</span>
              </div>
              <div className="text-center">
                 <Truck className="w-8 h-8 text-[#007BFF] mx-auto mb-3"/>
                 <span className="text-xs font-bold text-white tracking-wider">迅速な配送</span>
              </div>
              <div className="text-center">
                 <ClipboardList className="w-8 h-8 text-[#007BFF] mx-auto mb-3"/>
                 <span className="text-xs font-bold text-white tracking-wider">修理対応</span>
              </div>
           </div>
        </div>

        {/* Company Info & Form Split */}
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-8 pb-4 border-b border-slate-200">会社概要</h2>
            <dl className="space-y-6 text-sm">
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-bold text-slate-500">会社名</dt>
                <dd className="col-span-2 text-slate-800 font-medium">ワールド化成株式会社<br/><span className="text-xs text-slate-400 font-normal">World Kasei Co., Ltd.</span></dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-bold text-slate-500">所在地</dt>
                <dd className="col-span-2 text-slate-800 leading-relaxed">〒100-0000<br/>東京都千代田区...</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-bold text-slate-500">事業内容</dt>
                <dd className="col-span-2 text-slate-800 leading-loose">
                  POSシステム機器の輸入・販売<br/>
                  店舗DXソリューションの提案<br/>
                  WINTEC社 日本正規代理店
                </dd>
              </div>
            </dl>

            <div className="mt-10 bg-blue-50 p-8 rounded-lg border border-blue-100">
              <h3 className="font-bold text-[#003366] mb-4">お電話でのお問い合わせ</h3>
              <div className="flex items-center gap-3 text-3xl font-bold text-[#003366] mb-2">
                <Phone size={28}/> 03-XXXX-XXXX
              </div>
              <p className="text-xs text-slate-500">受付時間：平日 9:00 - 18:00</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-8 pb-4 border-b border-slate-200">お問い合わせフォーム</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">会社名 <span className="text-red-500">*</span></label>
                <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-md shadow-sm border p-3 focus:ring-[#007BFF] focus:border-[#007BFF] transition-colors" placeholder="株式会社〇〇" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">お名前 <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-md shadow-sm border p-3 focus:ring-[#007BFF] focus:border-[#007BFF] transition-colors" placeholder="山田 太郎" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">電話番号</label>
                  <input type="tel" className="w-full bg-slate-50 border-slate-200 rounded-md shadow-sm border p-3 focus:ring-[#007BFF] focus:border-[#007BFF] transition-colors" placeholder="03-0000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                <input type="email" className="w-full bg-slate-50 border-slate-200 rounded-md shadow-sm border p-3 focus:ring-[#007BFF] focus:border-[#007BFF] transition-colors" placeholder="sample@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">お問い合わせ内容</label>
                <textarea rows={5} className="w-full bg-slate-50 border-slate-200 rounded-md shadow-sm border p-3 focus:ring-[#007BFF] focus:border-[#007BFF] transition-colors" placeholder="製品のカタログが見たい、導入費用の概算が知りたい、など"></textarea>
              </div>
              <button type="button" className="w-full bg-[#007BFF] text-white font-bold py-4 rounded-md hover:bg-[#0056b3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                送信する <ChevronRight size={18} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Support;