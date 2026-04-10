import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgramareApelProps {
  onClose?: () => void;
}

export function ProgramareApel({ onClose }: ProgramareApelProps) {
  const [lang, setLang] = useState<'ro' | 'en'>('ro');
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'ro' | 'en';
    if (storedLang) setLang(storedLang);
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener('language-change', handleLangChange);
    return () => window.removeEventListener('language-change', handleLangChange);
  }, []);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Data curentă (Calendarul vizual)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  
  // Selecțiile utilizatorului
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  // Logică Calendar
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1; // 0 = Luni, 6 = Duminica
  };

  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  const startDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrent: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrent: true });
  }
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isCurrent: false });
  }

  const handleConfirm = () => {
    if (status !== 'idle') return;
    setStatus('loading');
    
    // Simulăm o procesare de 1.5s, apoi succes
    setTimeout(() => {
      setStatus('success');
      if (onClose) {
        setTimeout(onClose, 2000); // Se închide automat după 2 secunde
      }
    }, 1500);
  };

  const handlePrevMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  // Formatări de text
  const monthNamesRo = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
  const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames = lang === 'ro' ? monthNamesRo : monthNamesEn;
  const weekdayNamesRo = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
  const weekdayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekdayNames = lang === 'ro' ? weekdayNamesRo : weekdayNamesEn;
  const monthTitle = `${monthNames[month]} ${year}`;
  const formattedDate = selectedDate 
    ? `${weekdayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`
    : (lang === 'ro' ? 'Selectează o dată' : 'Select a date');

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[800px] bg-[#0a0a0a] rounded-[24px] md:rounded-[32px] p-6 md:p-8 relative overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.9)] border border-white/10 mx-auto"
    >
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-400 hover:text-[#81ecff] z-50 bg-white/5 hover:bg-white/10 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">close</span>
        </button>
      )}

      {/* Background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#81ecff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-6 md:gap-8">
        {/* Top Section: Calendar & Time Slots */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          
          {/* Mini Calendar */}
          <div className="flex-1 w-full md:w-[55%] md:pr-2">
            <div className="flex justify-between items-center mb-4 md:mb-6 px-1">
              <span className="text-base md:text-xl font-extrabold tracking-tight text-white font-headline capitalize">{monthTitle}</span>
              <div className="flex gap-4">
                <span onClick={handlePrevMonth} className="material-symbols-outlined text-base md:text-lg text-zinc-500 cursor-pointer hover:text-[#81ecff] transition-colors">chevron_left</span>
                <span onClick={handleNextMonth} className="material-symbols-outlined text-base md:text-lg text-zinc-500 cursor-pointer hover:text-[#81ecff] transition-colors">chevron_right</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2 md:mb-4 font-body">
              <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
            </div>
            
            <div className="grid grid-cols-7 gap-y-1 md:gap-y-2 text-center text-xs md:text-sm font-semibold font-body">
              {calendarDays.map((d, i) => {
                const isSelected = d.isCurrent && selectedDate && selectedDate.getDate() === d.day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                return (
                  <div 
                    key={i} 
                    onClick={() => d.isCurrent && setSelectedDate(new Date(year, month, d.day))} 
                    className={`py-2 cursor-pointer transition-colors relative flex justify-center items-center ${d.isCurrent ? 'hover:text-white' : 'text-white/10 cursor-default'}`}
                  >
                    {isSelected && (
                      <div className="absolute inset-x-1 inset-y-0.5 bg-[#81ecff] rounded-lg shadow-[0_0_15px_rgba(129,236,255,0.4)] z-0"></div>
                    )}
                    <span className={`z-10 ${isSelected ? 'text-black font-extrabold' : d.isCurrent ? 'text-zinc-300' : 'text-white/10'}`}>{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Divider */}
          <div className="hidden md:block w-px self-stretch bg-white/5 mx-2"></div>
          
          {/* Vertical Time Slots */}
          <div className="flex-1 w-full md:w-[45%] flex flex-col h-[220px] md:h-[340px] relative pr-1 min-h-0">
            <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3 py-2 px-1 z-10 font-headline shrink-0">
              {lang === 'ro' ? 'Interval Orar' : 'Time Slot'}
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] pb-10">
              <div className="grid grid-cols-2 gap-2 md:gap-3 px-1">
                {availableTimes.map(t => (
                  <div 
                    key={t} 
                    onClick={() => setSelectedTime(t)}
                    className={`w-full py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-bold cursor-pointer transition-all border text-center font-body ${selectedTime === t ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] border-white/50' : 'text-zinc-400 hover:bg-white/5 hover:text-white border-white/5'}`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Separation Line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Bottom Layout - Side by Side on Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 px-1 md:px-2">
          
          {/* Confirmation Message */}
          <div className="text-center md:text-left">
            <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed font-headline">
              {lang === 'ro' ? 'Sesiunea setată pentru:' : 'Session set for:'}<br className="hidden md:block" />
              <span className="font-black text-[#81ecff] text-lg md:text-xl drop-shadow-[0_0_10px_rgba(129,236,255,0.3)] capitalize"> {formattedDate}</span> {lang === 'ro' ? 'la' : 'at'} <span className="font-black text-[#81ecff] text-lg md:text-xl drop-shadow-[0_0_10px_rgba(129,236,255,0.3)]">{selectedTime}</span>
            </p>
          </div>

          {/* Primary Action Button */}
          <button 
            onClick={handleConfirm}
            disabled={status !== 'idle'}
            className={`group relative w-full md:w-[240px] py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.97] overflow-hidden shadow-[0_0_30px_rgba(129,236,255,0.2)] flex items-center justify-center shrink-0 ${
              status === 'success' 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_30px_rgba(52,211,153,0.4)]' 
                : 'bg-gradient-to-r from-[#81ecff] to-cyan-300'
            }`}
          >
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-10 text-black font-black text-[11px] md:text-xs tracking-[0.2em] uppercase font-headline">
                  {lang === 'ro' ? 'FINALIZEAZĂ REZERVAREA' : 'FINALIZE BOOKING'}
                </motion.span>
              )}
              {status === 'loading' && (
                <motion.span key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative z-10 text-black flex items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                </motion.span>
              )}
              {status === 'success' && (
                <motion.span key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-black flex items-center justify-center gap-2 font-black text-[11px] md:text-xs tracking-[0.2em] uppercase font-headline">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                  {lang === 'ro' ? 'CONFIRMAT' : 'CONFIRMED'}
                </motion.span>
              )}
            </AnimatePresence>
            {status === 'idle' && <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}