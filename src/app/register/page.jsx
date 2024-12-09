// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import Header from '@/components/layout/Header'
// import { motion } from 'framer-motion'

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       <div className="flex-1 bg-[url('/placeholder.svg')] bg-cover bg-center">
//         <div className="w-full h-full bg-[#162A41]/90 py-12">
//           <div className="container mx-auto px-4">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8"
//             >
//               <h1 className="text-2xl font-bold text-center mb-6">Opret bruger hos Din Mægler</h1>
              
//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Fulde navn</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email adresse</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Gentag password</label>
//                   <input
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#162A41] focus:border-[#162A41]"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#162A41] text-white py-3 rounded-md hover:bg-[#162A41]/90 transition-colors"
//                 >
//                   Opret bruger
//                 </button>

//                 <p className="text-center text-sm text-gray-600 mt-4">
//                   Har du allerede en konto?{' '}
//                   <Link href="/login" className="text-[#162A41] hover:underline">
//                     Log ind her
//                   </Link>
//                 </p>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

