// import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

// export default function ChartPlaceholder({ type = 'bar', title = 'Chart' }) {
//     const configs = {
//         bar: {
//             icon: BarChart3,
//             bars: [40, 65, 45, 80, 55, 70, 60],
//         },
//         pie: {
//             icon: PieChart,
//             segments: ['from-violet-500 to-purple-500', 'from-emerald-400 to-cyan-500', 'from-rose-400 to-pink-500', 'from-amber-400 to-orange-500'],
//         },
//         line: {
//             icon: TrendingUp,
//         }
//     };

//     const config = configs[type];
//     const Icon = config.icon;

//     return (
//         <div className="rounded-2xl bg-slate-900/50 border border-slate-800/50 p-5 transition-all hover:border-slate-700/50">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <h3 className="text-white font-semibold">{title}</h3>
//                 </div>
//                 <div className="p-2 rounded-xl bg-slate-800/50">
//                     <Icon className="w-4 h-4 text-slate-400" />
//                 </div>
//             </div>

//             {/* Chart Area */}
//             {type === 'bar' && (
//                 <div className="h-48 flex items-end justify-between gap-2 px-2">
//                     {config.bars.map((height, index) => (
//                         <div key={index} className="flex-1 flex flex-col items-center gap-2">
//                             <div
//                                 className="w-full rounded-t-lg bg-linear-to-t from-violet-600/80 to-violet-400/40 transition-all hover:from-violet-500 hover:to-violet-300/60"
//                                 style={{ height: `${height}%` }}
//                             />
//                             <span className="text-[10px] text-slate-500">
//                                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* {type === 'pie' && (
//                 <div className="h-48 flex items-center justify-center">
//                     <div className="relative w-36 h-36">
                        
//                         <div className="absolute inset-0 rounded-full bg-linear-to-br from-violet-500 to-purple-600" />
//                         <div className="absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full bg-linear-to-br from-emerald-400 to-cyan-500" />
//                         <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-full bg-linear-to-br from-rose-400 to-pink-500" />
//                         <div className="absolute bottom-0 left-0 w-1/2 h-1/4 rounded-bl-full bg-linear-to-br from-amber-400 to-orange-500" />
                        
//                         <div className="absolute inset-6 rounded-full bg-slate-900 flex items-center justify-center">
//                             <span className="text-white font-semibold text-sm">100%</span>
//                         </div>
//                     </div>
//                 </div>
//             )} */}

//             {/* {type === 'line' && (
//                 <div className="h-48 relative">
//                     <div className="absolute inset-0 flex flex-col justify-between">
//                         {[...Array(5)].map((_, i) => (
//                             <div key={i} className="border-b border-slate-800/50" />
//                         ))}
//                     </div>
//                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
//                         <defs>
//                             <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                                 <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
//                                 <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
//                             </linearGradient>
//                         </defs>
//                         <path
//                             d="M 0 35 Q 15 30 25 25 T 50 20 T 75 15 T 100 10"
//                             fill="none"
//                             stroke="url(#lineGradient)"
//                             strokeWidth="0.5"
//                         />
//                         <path
//                             d="M 0 35 Q 15 30 25 25 T 50 20 T 75 15 T 100 10 V 50 H 0 Z"
//                             fill="url(#lineGradient)"
//                         />
//                         <path
//                             d="M 0 35 Q 15 30 25 25 T 50 20 T 75 15 T 100 10"
//                             fill="none"
//                             stroke="rgb(139, 92, 246)"
//                             strokeWidth="0.8"
//                         />
//                     </svg>
//                 </div>
//             )} */}

//             {/* Legend */}
//             {/* {type === 'pie' && (
//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                     {['Food', 'Transport', 'Shopping', 'Other'].map((item, index) => (
//                         <div key={item} className="flex items-center gap-2">
//                             <div className={`w-2 h-2 rounded-full bg-linear-to-r ${config.segments[index]}`} />
//                             <span className="text-xs text-slate-400">{item}</span>
//                         </div>
//                     ))}
//                 </div>
//             )} */}
//         </div>
//     );
// }