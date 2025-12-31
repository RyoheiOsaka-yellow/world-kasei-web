import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002244] text-white pt-24 pb-12 font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-white text-[#002244] flex items-center justify-center font-bold rounded">WK</div>
               <span className="text-xl font-bold tracking-tight">World Kasei</span>
            </div>
            <p className="text-slate-400 text-sm leading-loose">
              世界基準のPOSシステム「WINTEC」日本国内正規販売代理店。<br/>
              堅牢なハードウェアと先進のAI技術で、<br/>
              日本の小売・飲食業界のDXを推進します。
            </p>
            <div className="pt-4 flex gap-4">
              {/* Social placeholders or certifications could go here */}
              <div className="text-xs text-slate-500 border border-slate-700 px-3 py-1 rounded">ISO 9001 Certified Factory</div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#007BFF] mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">AnyPOS Series</Link></li>
              <li><Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">SelfPOS Series</Link></li>
              <li><Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">ScalePOS Series</Link></li>
              <li><Link to="/products" className="hover:text-white hover:translate-x-1 transition-all inline-block">Options</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#007BFF] mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link to="/support" className="hover:text-white hover:translate-x-1 transition-all inline-block">会社概要</Link></li>
              <li><Link to="/cases" className="hover:text-white hover:translate-x-1 transition-all inline-block">導入事例</Link></li>
              <li><Link to="/support" className="hover:text-white hover:translate-x-1 transition-all inline-block">サポート体制</Link></li>
              <li><Link to="/support" className="hover:text-white hover:translate-x-1 transition-all inline-block">プライバシーポリシー</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#007BFF] mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-4 group cursor-pointer">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-slate-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors">〒100-0000<br/>東京都千代田区...</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Phone size={18} className="flex-shrink-0 text-slate-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors font-medium">03-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <Mail size={18} className="flex-shrink-0 text-slate-500 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors">info@world-kasei.co.jp</span>
              </div>
            </div>
            
            <Link to="/support" className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-white border-b border-white/30 pb-1 hover:border-white transition-all">
              お問い合わせフォームへ <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} World Kasei Co., Ltd. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Terms of Service</span>
             <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;