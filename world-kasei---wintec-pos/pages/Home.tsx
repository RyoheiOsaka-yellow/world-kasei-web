import React from 'react';
import { CheckCircle, Zap, Globe, ShieldCheck, Factory, BarChart3, ArrowRight, Download, ChevronRight, Layers, Star, DollarSign, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ROICalculator from '../components/ROICalculator';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden font-sans bg-[#F4F7F9]">
      
      {/* 1. Hero Section: Intelligent Navy & Abstract Tech */}
      <section className="relative h-[800px] flex items-center bg-[#003366] text-white overflow-hidden">
        {/* Abstract Background - Digital Lines / Particles */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#002244] to-black opacity-90"></div>
            {/* Abstract geometric shape overlay */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-[#007BFF] opacity-10 blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#007BFF]"></span>
                WINTEC Authorized Distributor
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Solid Trust,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#4facfe]">Smart Future.</span>
              </h1>
              
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed border-l-2 border-[#007BFF] pl-6">
                世界基準のスマートPOSを、日本の安心サポートで。<br/>
                AI搭載・高耐久システムが、ビジネスの未来を拓きます。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                <Link to="/support" className="group px-8 py-4 bg-[#F5A623] hover:bg-[#E09612] text-white rounded shadow-[0_10px_20px_-5px_rgba(245,166,35,0.4)] font-bold text-center transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  お問い合わせ・資料請求
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
                <Link to="/products" className="px-8 py-4 bg-transparent border border-white/30 text-white rounded hover:bg-white/10 transition-all text-center font-medium backdrop-blur-sm">
                  製品ラインナップ
                </Link>
              </div>
            </div>
            
            {/* Hero Image - Studio Quality Product Shot */}
            <div className="hidden md:block relative group">
               {/* Decorative elements behind image */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#007BFF]/20 to-transparent rounded-full blur-3xl"></div>
               
               <img 
                 src="https://placehold.co/800x800/transparent/white?text=AnyPOS+Hero+Studio+Shot" 
                 alt="AnyPOS High-End Model" 
                 className="relative z-10 w-full drop-shadow-2xl transform transition duration-700 ease-out group-hover:scale-105"
               />
               
               {/* Floating Spec Cards */}
               <div className="absolute top-20 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded text-white text-xs z-20 shadow-xl animate-bounce-slow">
                 <div className="font-bold text-[#007BFF]">AI Powered</div>
                 <div>Loss Prevention System</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. USP Section: Clean White with Structured Cards */}
      <section className="py-32 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] mb-6">WINTECが選ばれる3つの理由</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-loose">
              世界で認められた品質と技術、そして日本企業ならではの<br className="hidden md:block"/>きめ細やかなサポート体制を融合しました。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* USP 1 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-t-4 border-[#007BFF] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-[#007BFF] transition-colors duration-300">
                <Factory className="w-8 h-8 text-[#007BFF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#003366]">圧倒的な生産能力と品質</h3>
              <p className="text-slate-600 leading-loose text-sm">
                年間32万台以上の生産能力を誇る自社工場（ISO認証取得）。
                厳格な品質テストをクリアした高耐久ハードウェアを提供します。
              </p>
            </div>

            {/* USP 2 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-t-4 border-[#F5A623] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-orange-50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-[#F5A623] transition-colors duration-300">
                <Zap className="w-8 h-8 text-[#F5A623] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#003366]">最先端のAI技術</h3>
              <p className="text-slate-600 leading-loose text-sm">
                AIによる損失防止機能（Loss Prevention）や自動認識スケールを搭載。
                店舗運営の効率化と収益向上を強力にサポートします。
              </p>
            </div>

            {/* USP 3 */}
            <div className="bg-white p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border-t-4 border-[#003366] hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-8 group-hover:bg-[#003366] transition-colors duration-300">
                <Globe className="w-8 h-8 text-[#003366] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#003366]">高いカスタマイズ性と実績</h3>
              <p className="text-slate-600 leading-loose text-sm">
                世界70カ国以上での導入実績。OEMパートナーへの供給実績が証明する
                高い信頼性と柔軟なカスタマイズ対応が可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comparison Table & ROI Simulator */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-3xl lg:text-4xl font-bold text-[#003366] mb-6">Why WINTEC?</h2>
             <p className="text-slate-600 text-lg leading-loose">
               コストパフォーマンスと品質の最適解。<br/>
               「大手品質」を「適正価格」で、「国内サポート」と共に。
             </p>
          </div>

          {/* Stacked Layout for better balance */}
          <div className="space-y-16">
            
            {/* 1. Comparison Table */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100">
              <div className="grid grid-cols-4 min-w-[700px] overflow-x-auto">
                {/* Header Row */}
                <div className="p-5 bg-[#F8FAFC] border-b border-r border-slate-100 font-bold text-slate-500 flex items-center tracking-wide text-sm">
                  比較項目
                </div>
                <div className="p-5 bg-[#F8FAFC] border-b border-r border-slate-100 text-center">
                  <span className="block font-bold text-slate-600 text-lg">A社</span>
                  <span className="text-xs text-slate-400">（国内大手）</span>
                </div>
                <div className="p-5 bg-[#F8FAFC] border-b border-r border-slate-100 text-center">
                  <span className="block font-bold text-slate-600 text-lg">B社</span>
                  <span className="text-xs text-slate-400">（格安海外製）</span>
                </div>
                <div className="p-5 bg-[#003366] border-b text-center relative shadow-lg z-10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#007BFF]"></div>
                  <span className="block font-bold text-white text-xl tracking-wider">WINTEC</span>
                  <span className="block text-xs text-blue-200 mt-1">World Kasei Support</span>
                </div>

                {/* Row 1: Quality */}
                <div className="p-5 border-b border-r border-slate-100 font-medium text-[#003366] flex items-center bg-white text-sm">
                  <ShieldCheck className="w-5 h-5 mr-2 text-[#007BFF] shrink-0" /> 品質・耐久性
                </div>
                <div className="p-5 border-b border-r border-slate-100 text-center bg-white">
                  <span className="text-slate-600 font-bold block">◎ 高品質</span>
                  <span className="text-xs text-slate-400">オーバースペック</span>
                </div>
                <div className="p-5 border-b border-r border-slate-100 text-center bg-white">
                  <span className="text-slate-600 font-bold block">△ 不安定</span>
                  <span className="text-xs text-slate-400">早期故障リスク</span>
                </div>
                <div className="p-5 border-b bg-[#F0F7FF] text-center border-x-2 border-[#007BFF]/10 z-10 relative">
                  <span className="text-[#003366] font-extrabold text-lg block">◎ 高品質</span>
                  <span className="text-xs text-[#007BFF] font-bold">年産32万台の実績</span>
                </div>

                {/* Row 2: Cost */}
                <div className="p-5 border-b border-r border-slate-100 font-medium text-[#003366] flex items-center bg-white text-sm">
                  <DollarSign className="w-5 h-5 mr-2 text-[#007BFF] shrink-0" /> コスト
                </div>
                <div className="p-5 border-b border-r border-slate-100 text-center bg-white">
                  <span className="text-red-500 font-bold block">× 高額</span>
                  <span className="text-xs text-slate-400">初期・保守共に高い</span>
                </div>
                <div className="p-5 border-b border-r border-slate-100 text-center bg-white">
                  <span className="text-green-600 font-bold block">◎ 安い</span>
                  <span className="text-xs text-slate-400">買い替え頻度高</span>
                </div>
                <div className="p-5 border-b bg-[#F0F7FF] text-center border-x-2 border-[#007BFF]/10 z-10 relative">
                  <span className="text-[#003366] font-extrabold text-lg block">○ 適正</span>
                  <span className="text-xs text-[#007BFF] font-bold">TCO最適化</span>
                </div>

                {/* Row 3: Support */}
                <div className="p-5 border-r border-slate-100 font-medium text-[#003366] flex items-center bg-white text-sm">
                  <Globe className="w-5 h-5 mr-2 text-[#007BFF] shrink-0" /> サポート
                </div>
                <div className="p-5 border-r border-slate-100 text-center bg-white">
                  <span className="text-slate-600 font-bold block">◎ 充実</span>
                  <span className="text-xs text-slate-400">全国網羅</span>
                </div>
                <div className="p-5 border-r border-slate-100 text-center bg-white">
                  <span className="text-red-500 font-bold block">× 弱い</span>
                  <span className="text-xs text-slate-400">代理店任せ</span>
                </div>
                <div className="p-5 bg-[#F0F7FF] text-center border-x-2 border-b-2 border-[#007BFF]/10 z-10 rounded-b-lg relative">
                  <span className="text-[#003366] font-extrabold text-lg block">◎ 安心</span>
                  <span className="text-xs text-[#007BFF] font-bold">国内拠点対応</span>
                </div>
              </div>
            </div>

            {/* 2. ROI Calculator */}
            <div className="max-w-4xl mx-auto">
               <ROICalculator />
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Products Showcase */}
      <section className="py-32 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#007BFF] font-bold tracking-widest text-sm uppercase mb-2 block">Lineup</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#003366]">製品ラインナップ</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-[#007BFF] font-bold hover:text-[#0056b3] transition-colors group">
              すべての製品を見る <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Product 1 */}
            <Link to="/products" className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                 <img src="https://placehold.co/800x600/f8fafc/003366?text=AnyPOS+Series" alt="AnyPOS Series" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                 <h3 className="text-xl font-bold text-[#003366] mb-3 group-hover:text-[#007BFF] transition-colors">AnyPOSシリーズ</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mb-4">スマートで堅牢なオールインワンPOS。<br/>店舗の景観を損なわないデザイン。</p>
                 <span className="text-xs font-bold text-[#007BFF] flex items-center">詳細を見る <ChevronRight size={14} className="ml-1"/></span>
              </div>
            </Link>

            {/* Product 2 */}
            <Link to="/products" className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                 <div className="absolute top-4 right-4 bg-[#007BFF] text-white text-xs font-bold px-3 py-1 rounded-full z-10">AI Camera</div>
                 <img src="https://placehold.co/800x600/f8fafc/003366?text=SelfPOS+Series" alt="SelfPOS Series" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                 <h3 className="text-xl font-bold text-[#003366] mb-3 group-hover:text-[#007BFF] transition-colors">SelfPOSシリーズ</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mb-4">AIカメラ搭載のセルフレジ・キオスク。<br/>損失防止機能で収益を守ります。</p>
                 <span className="text-xs font-bold text-[#007BFF] flex items-center">詳細を見る <ChevronRight size={14} className="ml-1"/></span>
              </div>
            </Link>

            {/* Product 3 */}
            <Link to="/products" className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                 <div className="absolute top-4 right-4 bg-[#007BFF] text-white text-xs font-bold px-3 py-1 rounded-full z-10">AI Scale</div>
                 <img src="https://placehold.co/800x600/f8fafc/003366?text=ScalePOS+Series" alt="ScalePOS Series" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8">
                 <h3 className="text-xl font-bold text-[#003366] mb-3 group-hover:text-[#007BFF] transition-colors">ScalePOS (ACS)</h3>
                 <p className="text-slate-500 text-sm leading-relaxed mb-4">画像認識機能付き計量POS。<br/>量り売りのオペレーションを革新。</p>
                 <span className="text-xs font-bold text-[#007BFF] flex items-center">詳細を見る <ChevronRight size={14} className="ml-1"/></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Whitepaper CTA Section (Lead Magnet) */}
      <section className="py-20 bg-gradient-to-r from-[#003366] to-[#004b93] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 lg:p-14 border border-white/10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5A623] text-[#003366] rounded-full text-xs font-bold uppercase tracking-wider">
                Free Whitepaper
              </div>
              <h2 className="text-3xl font-bold leading-tight">
                AIが解決する2025年の店舗ロス対策ガイド<br/>
                <span className="text-xl font-normal text-blue-100">～万引き・内引きを未然に防ぐ最新技術とは～</span>
              </h2>
              <p className="text-blue-100 leading-relaxed">
                POSの入れ替えをご検討の方へ。最新のAIセルフレジがどのようにして店舗の利益率を改善するか、具体的な仕組みと導入効果を解説した資料を無料で差し上げます。
              </p>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#F5A623]"/> スキャン漏れ検知の技術的仕組み</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#F5A623]"/> 国内スーパーマーケットでの導入事例</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#F5A623]"/> セキュリティスケールの有効性</li>
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full bg-white text-slate-800 rounded-xl p-8 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-[#F5A623] text-white font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                FREE
              </div>
              <div className="text-center mb-6">
                 <FileText size={48} className="mx-auto text-[#003366] mb-4"/>
                 <h3 className="font-bold text-xl mb-1">お役立ち資料をダウンロード</h3>
                 <p className="text-xs text-slate-500">フォーム入力後、すぐにPDFをご覧いただけます。</p>
              </div>
              <form className="space-y-4">
                <input type="email" placeholder="メールアドレス" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:ring-2 focus:ring-[#007BFF] outline-none" />
                <button type="button" className="w-full bg-[#003366] hover:bg-[#002244] text-white font-bold py-4 rounded shadow-lg transition-all flex items-center justify-center gap-2">
                  <Download size={18} /> 今すぐダウンロード
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Social Proof */}
      <section className="py-24 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-10 tracking-wide text-[#003366]">Global Trusted Partners</h2>
          
          <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Carrefour', 'Walmart', 'ZARA', 'H&M', 'Tesco', 'Metro'].map((brand) => (
              <span key={brand} className="text-3xl font-bold tracking-tighter text-slate-400 hover:text-[#003366] transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
          <p className="mt-16 text-sm text-slate-400 font-light">
            WINTEC製品は世界70カ国以上で導入されています。
          </p>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-32 bg-[#003366] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007BFF] rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F5A623] rounded-full blur-[120px] opacity-10 -ml-20 -mb-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white tracking-tight">
            Ready to Upgrade?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
            ビジネスの課題を、AI搭載の最新POSで解決しませんか。<br/>
            詳細スペックカタログのダウンロード、お見積りはこちら。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#003366] rounded shadow-2xl font-bold hover:bg-gray-50 transition-all text-lg group">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform text-[#007BFF]" />
              製品カタログをDL
            </button>
            <Link to="/support" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#F5A623] text-white rounded shadow-[0_4px_20px_rgba(245,166,35,0.4)] font-bold hover:bg-[#E09612] transition-all text-lg hover:-translate-y-0.5">
              お見積り・ご相談
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;