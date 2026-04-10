import { STORE_PHONE, STORE_PHONE_RAW } from '../../data/storeConfig';

export const Footer: React.FC = () => (
  <footer className="bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3.5-1c.83 0 1.5-.67 1.5-1.5S9.33 6 8.5 6 7 6.67 7 7.5 7.67 9 8.5 9zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 6 15.5 6 14 6.67 14 7.5 14.67 9 15.5 9zM6 11.5c0 .83.67 1.5 1.5 1.5S9 12.33 9 11.5 8.33 10 7.5 10 6 10.67 6 11.5zm12 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM12 16c-2.21 0-4-1.79-4-4h-.5C7.22 12 7 12.22 7 12.5c0 2.76 2.24 5 5 5s5-2.24 5-5c0-.28-.22-.5-.5-.5H16c0 2.21-1.79 4-4 4z"/>
              </svg>
            </div>
            <span className="text-lg font-bold font-heading">Lucky Pet Shop</span>
          </div>
          <p className="text-white/65 text-sm leading-relaxed max-w-xs">
            Magazinul tău de încredere pentru produse premium pentru animale de companie din București.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/85">Navigare</h4>
          <ul className="space-y-2">
            <li><a href="#products" className="text-white/65 hover:text-white transition-colors text-sm min-h-[44px] inline-flex items-center">Produse</a></li>
            <li><a href="#reviews" className="text-white/65 hover:text-white transition-colors text-sm min-h-[44px] inline-flex items-center">Recenzii</a></li>
            <li><a href="#visit" className="text-white/65 hover:text-white transition-colors text-sm min-h-[44px] inline-flex items-center">Program & Locație</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/85">Contact</h4>
          <ul className="space-y-2 text-sm text-white/65">
            <li>Strada George Călinescu 52</li>
            <li>014192 București, România</li>
            <li className="pt-1">
              <a
                href={`tel:${STORE_PHONE_RAW}`}
                className="text-white hover:text-white/80 transition-colors font-semibold inline-flex items-center gap-2 min-h-[44px]"
              >
                📞 {STORE_PHONE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/45">
          &copy; {new Date().getFullYear()} Lucky Pet Shop. Toate drepturile rezervate.
        </p>
        <div className="flex gap-5">
          <a href="#" className="text-white/45 hover:text-white transition-colors text-xs min-h-[44px] inline-flex items-center">Confidențialitate</a>
          <a href="#" className="text-white/45 hover:text-white transition-colors text-xs min-h-[44px] inline-flex items-center">Termeni</a>
        </div>
      </div>
    </div>

    {/* Bottom spacer for mobile fixed bar */}
    <div className="h-20 lg:hidden" />
  </footer>
);
